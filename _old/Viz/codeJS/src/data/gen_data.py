#!/usr/bin/env python3
import json, math, random
from datetime import datetime, timedelta

TFMT = "%Y-%m-%d::%H-%M"

def generate_timeseries_json(
    out_path: str = "timeseries_generated.json",
    start: str = "2025-09-01::00-00",
    hours: int = 24,
    regions = ("London", "New York", "Dublin"),
    n_hardware: int = 3,
    seed: int = 42
):


    random.seed(seed)
    start_dt = datetime.strptime(start, TFMT)
    steps = int((hours * 60) / 30)
    items = []

    # Region baselines (gCO2e/kWh) + gentle diurnal variation
    base = {"London": 80, "New York": 420, "Dublin": 220}
    amp  = {"London": 20, "New York":  60, "Dublin":  40}

    for i in range(steps):
        t0 = start_dt + timedelta(minutes=30*i)
        tstr = t0.isoformat(timespec='minutes') + "Z"
        x = (2*math.pi) * ((t0.hour*60 + t0.minute) / (24*60))  # 0..2π across a day

        # Carbon intensities (gCO2e/kWh)
        ci = {}
        for reg in regions:
            b = base.get(reg, 250)
            a = amp.get(reg, 50)
            val = b + a*math.sin(x - math.pi/3) + random.gauss(0, a*0.1)
            ci[reg] = max(30, round(val, 2))

        # Hardware CPU usage (fraction 0..1), higher in the day
        hu = {}
        for h in range(n_hardware):
            day_factor = 0.55 + 0.35*max(0, math.sin(x))
            usage = min(1.0, max(0.0, random.gauss(day_factor, 0.15)))
            hu[str(h).zfill(10)] = round(usage, 3)

        # PUE around ~1.2 with mild noise
        pue = round(1.15 + 0.1*math.sin(x + math.pi/6) + random.gauss(0, 0.02), 3)
        pue = max(1.05, min(1.8, pue))

        # Requests ~ Poisson(λ) with λ tied to diurnal pattern + avg CPU
        avg_cpu = sum(hu.values()) / len(hu)
        lam = 80 + 160*max(0, math.sin(x)) + 120*avg_cpu
        req = max(0, int(random.gauss(lam, math.sqrt(max(1, lam)))))  # stable Poisson-ish draw

        items.append({
            "data_id": str(i).zfill(10),
            "time": tstr,
            "hardware_usages": {tstr: hu},
            "pue": pue,
            "functional_units": req
        })

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"data_items": items}, f, ensure_ascii=False, indent=2)

    print(f"Wrote synthetic series → {out_path}")

if __name__ == "__main__":
    # Default: one day of 30-min bins starting 2025-09-01, 3 regions, 6 devices
    generate_timeseries_json()
