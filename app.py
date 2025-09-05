import streamlit as st
import pandas as pd
import code.simulate_sci_data as sci

TZ = "Europe/London"
#DATA_PATH = "./data/simulated_sci_forecasted.csv"  # adjust if needed
CARBON_INTENSITY_PATH = "data/carbonintensitydata.json"  
DEVICES_DETAILS_PATH = "data/devices_generated.json"  
TIME_SERIES_DATA_PATH = "data/timeseries.json"  

st.title("🌳 SCI-aware: an LLM Prompt Scheduler")

start_date_default = pd.Timestamp(2026, 1, 1, tz=TZ).date()

# Dates from UI
start_date = st.date_input(
    "Pick a start date for your prompting task!",
    value=start_date_default,
    min_value=pd.Timestamp(2026, 1, 1, tz=TZ).date(),
    max_value=pd.Timestamp(2026, 8, 25, tz=TZ).date(),
)

end_date = st.date_input(
    "Pick a deadline date for your prompting task!",
    value=start_date,
    min_value=start_date,
    max_value=pd.Timestamp(2026, 8, 25, tz=TZ).date(),
)


# Load CSV and fix timestamp column
#df = pd.read_csv(DATA_PATH)
df = sci.simulate_sci_data(CARBON_INTENSITY_PATH, DEVICES_DETAILS_PATH,  TIME_SERIES_DATA_PATH, "future")
if "datetime" in df.columns:
    ts_col = "datetime"
elif "timestamp" in df.columns:
    ts_col = "timestamp"
elif "Unnamed: 0" in df.columns:  # your file uses this
    df = df.rename(columns={"Unnamed: 0": "timestamp"})
    ts_col = "timestamp"
else:
    st.error("CSV must contain a timestamp column (datetime/timestamp/Unnamed: 0).")
    st.stop()

# Parse timestamps and handle timezone
df[ts_col] = pd.to_datetime(df[ts_col], errors="coerce", utc=True)  # tz-aware UTC
df = df.dropna(subset=[ts_col])

# Convert to local tz for display + make a date column to filter
df["ts_local"] = df[ts_col].dt.tz_convert(TZ)
df["date"] = df["ts_local"].dt.date

# Build inclusive end-of-day filter
mask = (df["date"] >= start_date) & (df["date"] <= end_date)
filtered_df = df.loc[mask].sort_values("ts_local")

st.write("Start date:", start_date)
st.write("End date:", end_date)
st.write(f"Rows in range: {len(filtered_df)}")

st.line_chart(filtered_df.set_index("ts_local")["SCI"], color="#9bc59d")

# ----- Recommendation: best time to prompt within the selected range -----
if filtered_df.empty:
    st.warning("No data in the selected date range.")
else:
    # Baseline = earliest slot in the filtered range (i.e., 'run at the start of the selected period')
    baseline = filtered_df.iloc[0]

    # Greenest slot = minimum SCI within the range
    best_idx = filtered_df["SCI"].idxmin()
    best = filtered_df.loc[best_idx]

    # Compute savings vs baseline
    delta_g = baseline["SCI"] - best["SCI"]  # g/prompt
    pct_save = (delta_g / baseline["SCI"] * 100.0) if baseline["SCI"] > 0 else 0.0
    wait_hours = (best["ts_local"] - baseline["ts_local"]).total_seconds() / 3600.0

# Tell the user
if delta_g <= 0:
    st.info(
        f"You're already in the greenest slot of the selected range "
        f"({best['ts_local']:%Y-%m-%d %H:%M %Z}). "
        f"SCI ≈ {best['SCI']:.4f} g/prompt."
    )
else:
    st.success(
        f"Greenest slot: **{best['ts_local']:%Y-%m-%d %H:%M %Z}** "
        f"(SCI ≈ {best['SCI']:.4f} g/prompt). "
        f"If you wait **{wait_hours:.1f} h**, you'll save **{delta_g*1000:.1f} g** CO₂e per prompt "
        f"(**{pct_save:.1f}%**)."
    )
   


    # (Optional) Show the top-3 green slots to give alternatives
    st.subheader("Top-3 greenest slots in the selected range")
    topn = filtered_df.nsmallest(3, "SCI")[["ts_local", "SCI"]]
    topn = topn.rename(columns={"ts_local": "time", "SCI": "SCI [kg/prompt]"})
    st.dataframe(topn.reset_index(drop=True))

    if not filtered_df.empty:
        avg_sci = filtered_df["SCI"].mean()*1000
        min_sci = filtered_df["SCI"].min()*1000
        max_sci = filtered_df["SCI"].max()*1000

    st.subheader("SCI stats in selected period")
    c1, c2, c3 = st.columns(3)
    c1.metric("Average SCI", f"{avg_sci:.4f}")
    c2.metric("Minimum SCI", f"{min_sci:.4f}")
    c3.metric("Maximum SCI", f"{max_sci:.4f}")



