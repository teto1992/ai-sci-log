# generate_device_data.py
import json, math, random
from datetime import datetime
from pathlib import Path
import pandas as pd

AGG_KEYS = {"England", "Scotland", "Wales"}

def load_carbon(path: str):
    with open(path, "r") as f:
        data = json.load(f)
    return sorted(data.items(), key=lambda kv: kv[0])  # [(timestamp, {loc:intensity}), ...]

def infer_locations(first_row_dict):
    return sorted([k for k in first_row_dict.keys() if k not in AGG_KEYS])

def synth_devices(locations, devices_per_location=2, seed=42):
    rng = random.Random(seed)
    devices = []
    device_counter = 0
    for loc in locations:
        for _ in range(devices_per_location):
            device_id = f"{device_counter:010d}"
            device_counter += 1
            profile = rng.choice([
                {"power_idle": 120, "power_variable": 400,  "embodied": 1_200_000, "lifetime_h": rng.randint(20_000, 60_000)},  # small server
                {"power_idle": 300, "power_variable": 1500, "embodied": 1_800_000, "lifetime_h": rng.randint(30_000, 70_000)},  # mid server
                {"power_idle": 500, "power_variable": 3000, "embodied": 2_500_000, "lifetime_h": rng.randint(35_000, 90_000)},  # GPU node
            ])
            devices.append({
                "device_id": device_id,
                "location": loc,
                "lifetime": profile["lifetime_h"],
                "power_idle": profile["power_idle"],
                "power_variable": profile["power_variable"],
                "embodied_carbon": profile["embodied"]
            })
    return {"devices": devices}

def daily_factor(ts_str: str):
    hour = int(ts_str[11:13])  # assumes "YYYY-MM-DDThh:mmZ"
    phase = (hour - 15) / 24.0 * 2*math.pi  # peak ~15:00
    return 0.5 * (1 + math.cos(phase))      # [0,1]

def pue_for_location(loc: str, seed_base: int = 100):
    rng = random.Random(seed_base + hash(loc) % 10_000)
    return 1.12 + rng.random() * 0.33  # ~[1.12, 1.45]

def generate_timeseries(rows, devices, jitter_seed=123):
    rng = random.Random(jitter_seed)
    base_pue = {d["location"]: pue_for_location(d["location"]) for d in devices}
    dev_headroom = {d["device_id"]: rng.uniform(0.7, 1.2) for d in devices}
    out = []

    for ts, per_loc in rows:
        for d in devices:
            loc = d["location"]
            if loc not in per_loc:
                continue
            ci = per_loc[loc]
            base = daily_factor(ts)
            noise = rng.gauss(0, 0.05)
            carbon_dampen = 1.0 - min(max(ci, 0), 400) / 1200.0  # mild dampening when CI is high
            cpu = base * dev_headroom[d["device_id"]] * carbon_dampen + noise
            cpu = max(0.03, min(cpu, 0.98))
            req_rate = 30 + cpu * rng.uniform(600, 1800)
            requests = int(max(0, rng.gauss(req_rate, req_rate*0.25)))
            pue = max(1.05, min(base_pue[loc] + rng.gauss(0, 0.02), 1.6))
            power_draw = d["power_idle"] + d["power_variable"] * cpu
            out.append({
                "timestamp": ts,
                "device_id": d["device_id"],
                "location": loc,
                "cpu_usage": round(cpu, 3),
                "requests": requests,
                "pue": round(pue, 3),
                "power_draw_watts": round(power_draw, 1),
                "carbon_intensity": ci
            })
    return pd.DataFrame(out)

def main(
    carbon_path="data/carbonintensitydata.json",
    devices_out_path="data/devices_generated.json",
    devices_per_location=2
):
    rows = load_carbon(carbon_path)
    if not rows:
        raise RuntimeError("Empty carbon intensity file.")
    first_ts, first_dict = rows[0]
    locations = infer_locations(first_dict)
    devices_doc = synth_devices(locations, devices_per_location=devices_per_location)
    with open(devices_out_path, "w") as f:
        json.dump(devices_doc, f, indent=2)

if __name__ == "__main__":
    main()
