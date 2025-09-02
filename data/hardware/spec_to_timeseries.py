#!/usr/bin/env python3
"""
Generate per-type, per-phase time-series CSVs from a compact hardware YAML spec.

Inputs
------
1) YAML spec describing hardware groups with id_pattern (see example below)
2) Carbon intensity CSV to derive the time index (timestamps + cadence)

Outputs
-------
- For each hardware TYPE (e.g., "gpu", "server") and each PHASE ("training", "deployment"),
  we write a CSV named:  {type}_{phase}_timeseries.csv
  with columns:
    timestamp, unit_id, group, type, location, pue, max_power_w, expected_lifetime_years, embodied_carbon_kg,
    cpu_usage_percent, reserved_hours, functional_units

Notes
-----
- CPU usage is per-unit: baseline + diurnal + noise; training windows lift it.
- "reserved_hours" is per-unit, per-interval: interval_hours if unit is reserved else 0.
- Functional units:
  - training: we spread 1.0 FU across the job window for participating units
              (equal shares per timestamp, then split evenly across participating units).
  - deployment: total requests per TYPE per timestamp sampled via Poisson, then allocated
                across units proportionally to instantaneous utilization (multinomial).

Usage
-----
python spec_to_timeseries.py \
  --spec path/to/spec.yaml \
  --carbon-file path/to/carbon.csv \
  --out ./out \
  --seed 42 \
  --training-jobs 1 \
  --training-days 5 \
  --participants-per-type 2 \
  --deploy-base-req 100 \
  --deploy-diurnal-amp 0.6

You can omit most flags and rely on defaults.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from typing import Dict, List, Tuple
import numpy as np
import pandas as pd

try:
    import yaml  # type: ignore
except Exception:
    yaml = None

# -----------------
# Parsing utilities
# -----------------
def load_spec(path: str) -> Dict:
    if yaml is None:
        raise RuntimeError("PyYAML not installed. `pip install pyyaml`")
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def load_carbon(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path)
    # Normalize columns
    cols_lower = {c.lower(): c for c in df.columns}
    # timestamp
    if "timestamp" not in cols_lower:
        for alt in ["time", "datetime", "ts", "period_start"]:
            if alt in cols_lower:
                df.rename(columns={cols_lower[alt]: "timestamp"}, inplace=True)
                break
        else:
            raise ValueError("Carbon CSV must include a 'timestamp' column.")
    elif cols_lower["timestamp"] != "timestamp":
        df.rename(columns={cols_lower["timestamp"]: "timestamp"}, inplace=True)
    # region (kept for join later; unused here but harmless)
    if "region" not in cols_lower:
        for alt in ["area", "shortname", "zone", "location", "region_name"]:
            if alt in cols_lower:
                df.rename(columns={cols_lower[alt]: "region"}, inplace=True)
                break
    elif cols_lower["region"] != "region":
        df.rename(columns={cols_lower["region"]: "region"}, inplace=True)

    df["timestamp"] = pd.to_datetime(df["timestamp"], utc=False, errors="coerce")
    if df["timestamp"].isna().any():
        raise ValueError("Some timestamps could not be parsed in carbon CSV.")
    df = df.sort_values(["timestamp"] + (["region"] if "region" in df.columns else [])).reset_index(drop=True)
    return df

def time_index(carbon: pd.DataFrame) -> Tuple[pd.DatetimeIndex, float]:
    ts = pd.Index(carbon["timestamp"].unique()).sort_values()
    idx = pd.DatetimeIndex(ts)
    # infer interval hours
    if len(idx) > 1:
        dt_hours = float((idx[1] - idx[0]) / pd.Timedelta(hours=1))
    else:
        dt_hours = 1.0
    return idx, dt_hours

# ---------------
# Synth utilities
# ---------------
def diurnal_curve(hours: np.ndarray, phase_shift: float = 16.0) -> np.ndarray:
    # 0..1 curve peaking near phase_shift (hour of day)
    return (np.sin(2 * np.pi * (hours - phase_shift) / 24.0) + 1) / 2.0

def synth_cpu_percent(idx: pd.DatetimeIndex, rng: np.random.Generator,
                      baseline=0.25, diurnal_amp=0.20, noise_sigma=0.05,
                      training_mask: np.ndarray | None = None,
                      train_floor=0.75, train_ceil=0.92) -> np.ndarray:
    hrs = idx.hour + idx.minute / 60.0
    curv = diurnal_curve(hrs, phase_shift=16.0)
    util = baseline + diurnal_amp * curv + rng.normal(0, noise_sigma, size=len(idx))
    util = np.clip(util, 0.03, 0.98)
    if training_mask is not None and training_mask.any():
        lo, hi = train_floor, train_ceil
        util_train = lo + (hi - lo) * (util - util.min()) / (util.max() - util.min() + 1e-9)
        util = np.where(training_mask, util_train, util)
    return (100.0 * util).round(2)

def build_training_windows(idx: pd.DatetimeIndex, n_jobs: int, days: int, rng: np.random.Generator) -> List[Tuple[pd.Timestamp, pd.Timestamp]]:
    wins = []
    if n_jobs <= 0 or days <= 0:
        return wins
    t0, t1 = idx.min(), idx.max()
    latest = max(t0, t1 - pd.Timedelta(days=days))
    # pick start uniformly
    if latest <= t0:
        starts = [t0]
    else:
        # choose up to n_jobs random starting days
        max_days = int((latest - t0) / pd.Timedelta(days=1))
        starts = [t0 + pd.Timedelta(days=int(rng.integers(0, max_days + 1))) for _ in range(n_jobs)]
    for s in starts:
        e = s + pd.Timedelta(days=days)
        wins.append((s, e))
    return wins

def mask_from_windows(idx: pd.DatetimeIndex, wins: List[Tuple[pd.Timestamp, pd.Timestamp]]) -> np.ndarray:
    if not wins:
        return np.zeros(len(idx), dtype=bool)
    m = np.zeros(len(idx), dtype=bool)
    for (s, e) in wins:
        m |= (idx >= s) & (idx <= e)
    return m

# --------------------
# Main generation flow
# --------------------
def expand_ids(prefix: str, start: int, zfill: int, count: int) -> List[str]:
    return [f"{prefix}{str(start + i).zfill(zfill)}" for i in range(count)]

def generate(args):
    rng = np.random.default_rng(args.seed)

    spec = load_spec(args.spec)
    carbon = load_carbon(args.carbon_file)
    idx, dt_hours = time_index(carbon)

    # Build inventory per TYPE
    groups = spec.get("hardware", [])
    # per-type containers
    type_units: Dict[str, List[Dict]] = {}

    for g in groups:
        gtype = str(g.get("type", "unknown")).lower()
        count = int(g["count"])
        pat = g["id_pattern"]
        ids = expand_ids(pat["prefix"], int(pat.get("start", 1)), int(pat.get("zfill", 4)), count)
        per = g.get("per_unit", {})
        reserved_share = float(per.get("reserved_share", 0.5))

        # Sample reservation flags
        n_reserved = int(round(count * reserved_share))
        flags = np.array([1] * n_reserved + [0] * (count - n_reserved))
        rng.shuffle(flags)

        for i, uid in enumerate(ids):
            unit = {
                "unit_id": uid,
                "group": g.get("group", ""),
                "type": gtype,
                "location": per.get("location", ""),
                "pue": float(per.get("pue", 1.1)),
                "max_power_w": float(per.get("max_power_w", 300.0)),
                "expected_lifetime_years": float(per.get("expected_lifetime_years", 2)),
                "embodied_carbon_kg": float(per.get("embodied_carbon_kg", 150)),
                "is_reserved": int(flags[i]),
            }
            type_units.setdefault(gtype, []).append(unit)

    # TRAINING phase
    train_wins = build_training_windows(idx, args.training_jobs, args.training_days, rng)
    # For each TYPE choose some participants (first N for reproducibility)
    participants_per_type: Dict[str, List[str]] = {}
    for t, units in type_units.items():
        n = min(args.participants_per_type, len(units))
        participants_per_type[t] = [u["unit_id"] for u in units[:n]]

    # Generate per-type CSVs
    os.makedirs(args.out, exist_ok=True)

    for phase in ["training", "deployment"]:
        for t, units in type_units.items():
            rows = []
            if phase == "training":
                # Training per-type: units in 'participants' carry FU; others FU=0
                # CPU% boosted during windows; reserved_hours depends on reservation.
                m = mask_from_windows(idx, train_wins)
                n_win = int(m.sum())
                fu_per_ts = (1.0 / n_win) if n_win > 0 else 0.0
                # evenly distribute FU across participating units
                parts = set(participants_per_type[t])
                fu_split = 1.0 / max(len(parts), 1)
                for u in units:
                    uid = u["unit_id"]
                    seed = args.seed + (hash(uid) % 10000)
                    util = synth_cpu_percent(idx, np.random.default_rng(seed),
                                             baseline=0.28, diurnal_amp=0.18, noise_sigma=0.05,
                                             training_mask=m, train_floor=0.78, train_ceil=0.93)
                    reserved = float(u["is_reserved"]) * dt_hours
                    # FU series
                    fu_series = np.zeros(len(idx), dtype=float)
                    if uid in parts and n_win > 0:
                        fu_series[m] = fu_per_ts * fu_split
                    for ts, cpu, fu in zip(idx, util, fu_series):
                        rows.append({
                            "timestamp": ts, **u,
                            "cpu_usage_percent": float(cpu),
                            "reserved_hours": reserved,
                            "functional_units": float(fu),
                        })
            else:
                # DEPLOYMENT phase
                # 1) Sample total requests per TYPE per timestamp (Poisson with diurnal modulation)
                hrs = idx.hour + idx.minute / 60.0
                diur = diurnal_curve(hrs, phase_shift=15.0)  # afternoon bump
                lam = args.deploy_base_req * (0.5 + args.deploy_diurnal_amp * diur)
                total_reqs = np.random.default_rng(args.seed + 999).poisson(lam).astype(int)

                # 2) Build utilization for all units (no training boost)
                util_mat = []
                for u in units:
                    uid = u["unit_id"]
                    seed = args.seed + (hash(uid) % 10000)
                    util = synth_cpu_percent(idx, np.random.default_rng(seed),
                                             baseline=0.22, diurnal_amp=0.20, noise_sigma=0.05,
                                             training_mask=None)
                    util_mat.append(util / 100.0)  # convert back to 0..1 weight
                util_mat = np.vstack(util_mat)  # shape = (n_units, T)

                # 3) Allocate requests per timestamp using multinomial with weights ~ utilization
                n_units = len(units)
                for t_i, ts in enumerate(idx):
                    weights = util_mat[:, t_i] + 1e-6  # avoid zeros
                    weights = weights / weights.sum()
                    if total_reqs[t_i] > 0:
                        alloc = np.random.default_rng(args.seed + 2025 + t_i).multinomial(total_reqs[t_i], weights)
                    else:
                        alloc = np.zeros(n_units, dtype=int)
                    for u_i, u in enumerate(units):
                        reserved = float(u["is_reserved"]) * dt_hours
                        rows.append({
                            "timestamp": ts, **u,
                            "cpu_usage_percent": float(util_mat[u_i, t_i] * 100.0),
                            "reserved_hours": reserved,
                            "functional_units": int(alloc[u_i]),
                        })

            # Write CSV for this type+phase
            out_path = os.path.join(args.out, f"{t}_{phase}_timeseries.csv")
            import pandas as pd
            pd.DataFrame(rows).to_csv(out_path, index=False)
            print(f"Wrote {out_path}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec", required=True, help="YAML hardware spec (with id_pattern & per_unit)")
    ap.add_argument("--carbon-file", required=True, help="Carbon intensity CSV (provides timestamps/cadence)")
    ap.add_argument("--out", required=True, help="Output directory")
    ap.add_argument("--seed", type=int, default=42)

    # Training knobs
    ap.add_argument("--training-jobs", type=int, default=1)
    ap.add_argument("--training-days", type=int, default=5)
    ap.add_argument("--participants-per-type", type=int, default=2)

    # Deployment knobs
    ap.add_argument("--deploy-base-req", type=float, default=100.0)
    ap.add_argument("--deploy-diurnal-amp", type=float, default=0.6)

    args = ap.parse_args()
    generate(args)

if __name__ == "__main__":
    main()
