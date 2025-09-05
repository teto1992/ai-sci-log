import json, math, random
from pathlib import Path

AGG_KEYS = {"England", "Scotland", "Wales"}

def load_carbon(path: str):
    with open(path, "r") as f:
        data = json.load(f)
    # Expecting {"timestamp": {"region": intensity, ...}, ...}
    rows = sorted(data.items(), key=lambda kv: kv[0])
    return rows  # list[(ts, dict(region->intensity))]

def load_devices(path: str):
    with open(path, "r") as f:
        doc = json.load(f)
    # Support either {"devices":[...]} or a flat list
    if isinstance(doc, dict) and "devices" in doc:
        devices = doc["devices"]
    elif isinstance(doc, list):
        devices = doc
    else:
        raise ValueError("device file should be an object with key 'devices' or a list of devices")
    # Extract IDs only
    ids = [str(d["device_id"]) for d in devices if "device_id" in d]
    if not ids:
        raise ValueError("No device_id found in device file.")
    return ids

def daily_factor(ts: str):
    # ts like "YYYY-MM-DDThh:mmZ" -> hour
    hour = int(ts[11:13])
    # Simple diurnal curve peaking around 15:00
    phase = (hour - 15) / 24.0 * 2*math.pi
    return 0.5 * (1 + math.cos(phase))  # [0,1]

def pue_baseline(seed: int = 1234):
    rng = random.Random(seed)
    return 1.12 + rng.random() * 0.4  # typical DC range

def make_usage_for_devices(ts: str, device_ids: list, ci_signal: float, rng: random.Random):
    base = daily_factor(ts)
    # Light carbon-aware dampening: higher CI -> slightly lower usage on average
    damp = 1.0 - min(max(ci_signal, 0), 400) / 1400.0  # mild
    usages = {}
    for i, dev in enumerate(device_ids):
        headroom = 0.75 + (hash(dev) % 500) / 1000.0  # stable per-device factor in ~[0.75,1.25]
        noise = rng.gauss(0, 0.06)
        u = base * headroom * damp + noise
        u = max(0.03, min(u, 1.0))
        usages[dev] = round(u, 3)
    return usages

def make_pue_for_devices(ts: str, device_ids: list, rng: random.Random):
    base = pue_baseline()
    pues = {}
    # Small per-device pue variation
    for i, dev in enumerate(device_ids):
        pue = max(1.15, min(base + rng.gauss(0, 0.03), 1.9))
        pues[dev] = round(pue, 3)
    return pues

def generate(
    carbon_path="../data/carbonintensitydata.json",
    device_path="../data/devices_generated.json",
    out_json_path="../data/timeseries.json",
    seed=2025
):
    rows = load_carbon(carbon_path)
    device_ids = load_devices(device_path)
    rng = random.Random(seed)
    # Pick a region to proxy the CI signal for workload modulation (prefer GB if present)
    # For stability, use GB -> England -> London -> first available
    def ci_for_row(per_loc: dict):
        for key in ("GB", "England", "London"):
            if key in per_loc:
                return per_loc[key]
        # otherwise take mean of non-aggregate regions
        values = [v for k, v in per_loc.items() if k not in AGG_KEYS]
        return sum(values)/len(values) if values else 0.0

    base_pue = pue_baseline()
    out = []
    for idx, (ts, per_loc) in enumerate(rows):
        ci = ci_for_row(per_loc)
        usages = make_usage_for_devices(ts, device_ids, ci, rng)
        # small pue wiggle
        pues = make_pue_for_devices(ts, device_ids, rng)
        # functional units loosely tied to aggregate usage (scaled and noisy)
        fu = int(max(0, rng.gauss(150 + 220 * (sum(usages.values())/len(usages)), 25)))
        out.append({
            "data_id": f"{idx:010d}",
            "time": ts,
            "hardware_usages": {
                ts: usages
            },
            "pue_values": {
                ts: pues
            },
            "functional_units": fu
        })
    with open(out_json_path, "w") as f:
        json.dump(out, f, indent=2)
    return out

if __name__ == "__main__":
    generate()
