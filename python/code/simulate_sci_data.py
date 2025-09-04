import pandas as pd
import json
import numpy as np

def process_dict_df(df, feature):
    inner = df[feature].map(lambda d: next(iter(d.values())) if isinstance(d, dict) and d else {})
    df_matrix = inner.apply(pd.Series)
    df_matrix.index = pd.to_datetime(df["time"])  # optional but handy
    return df_matrix.sort_index().sort_index(axis=1)

def load_sci_raw_data(path_carbon_intensity, path_devices_details, path_timeseries_data):
    df_carbon_intensity = pd.read_json(path_carbon_intensity).T
    df_devices = pd.read_json(path_devices_details)
    df_devices = pd.json_normalize(df_devices["devices"])
    df_time_seriesV2 = pd.read_json(path_timeseries_data) 
    
    df_hardware_usage = process_dict_df(df_time_seriesV2, "hardware_usages")
    df_pue = process_dict_df(df_time_seriesV2, "pue_values")

    return df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue

def compute_o(df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue):

    df_final_o = pd.DataFrame()
    
    for device_id in df_devices.device_id:
        #get the inputs
        tmp_pue = df_pue[device_id]
        tmp_carbon = df_carbon_intensity[df_devices[df_devices["device_id"]==device_id]["location"]]
        power_idle = df_devices[df_devices["device_id"]==device_id]["power_idle"].values[0]
        power_var = df_devices[df_devices["device_id"]==device_id]["power_variable"].values[0]
        tmp_usage = df_hardware_usage[device_id] 
    
        #combine them into a DF
        tmp_carbon.columns = ["carbon"]
        df_o = pd.concat([tmp_pue.rename("pue"), tmp_carbon], axis=1)
        df_o = pd.concat([df_o, tmp_usage.rename("usage")], axis=1)
        df_o["idle"] = power_idle
        df_o["power"] = power_var
    
        #make the computations
        df_o["energy_consumption"] = ((df_o["power"] * df_o["usage"] ) + df_o["idle"]) *0.5
        df_o.drop(["idle", "power", "usage"], inplace=True, axis=1)
        df_o["o"] = (df_o["pue"] * df_o["carbon"] * df_o["energy_consumption"]) /1000
    
        #save everything
        df_final_o = pd.concat([df_final_o, df_o.rename({"o":device_id}, axis=1)[device_id]], axis=1)
    return df_final_o

def compute_m(df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue):
    df_final_m = pd.DataFrame()

    for device_id in df_devices.device_id:
        #get the inputs into a dataframe
        df_m = pd.DataFrame(df_hardware_usage[device_id], columns = [device_id]).rename({device_id:"usage"}, axis=1)
        df_m["embodied_carbon"] = df_devices[df_devices["device_id"]==device_id]["embodied_carbon"].values[0]
        df_m["lifetime"] = df_devices[df_devices["device_id"]==device_id]["lifetime"].values[0]
        df_m.index.name = None
        
        #make the computations
        df_m["M"] = df_m["embodied_carbon"] * (0.5 / df_m["lifetime"]) * df_m["usage"]
        df_m.drop(["lifetime", "embodied_carbon", "usage"], inplace=True, axis=1)
        
        #save everything
        df_final_m = pd.concat([df_final_m, df_m.rename({"M":device_id}, axis=1)[device_id]], axis=1)
    return df_final_m

def compute_sci(df_final_o, df_final_m, df_time_seriesV2):
    df_sci = pd.concat([df_final_o.sum(axis=1).rename("O"), df_final_m.sum(axis=1).rename("M")], axis=1)
    # add functional units 
    df_functinal_units = df_time_seriesV2["functional_units"]
    df_functinal_units.index = df_time_seriesV2["time"]
    df_sci.index = pd.to_datetime(df_sci.index).tz_convert("UTC")
    df_functinal_units.index = pd.to_datetime(df_functinal_units.index).tz_convert("UTC")
    
    df_sci  = pd.concat([df_sci , df_functinal_units], axis=1)
    df_sci.reset_index(inplace=True)
    df_sci.rename({"index":"datetime"}, axis=1, inplace=True)
    return df_sci

def simulate_sci_forecast(df_sci):
    df_shifted = df_sci.copy()
    df_shifted.datetime = pd.to_datetime(df_shifted.datetime) + pd.DateOffset(years=1)

    df_shifted["O"] = df_shifted["O"] * (1 + np.random.normal(0, 0.05, len(df_shifted)))
    df_shifted["M"] = df_shifted["M"] * (1 + np.random.normal(0, 0.05, len(df_shifted)))
    df_shifted["functional_units"] = df_shifted["functional_units"] * (1 + np.random.normal(0, 0.05, len(df_shifted)))
    df_shifted["functional_units"] = df_shifted["functional_units"].round().astype(int)
    df_shifted["SCI"] = (df_shifted["O"] + df_shifted["M"]) / (df_shifted["functional_units"] * 1000)

    return df_shifted


def simulate_sci_data(path_carbon_intensity, path_devices_details, path_timeseries_data, type_to_simulate):
    """
    This function loads raw SCI datasets (carbon intensity, device details, and time series),
    computes operational and manufacturing contributions, and combines them into the SCI
    DataFrame. Depending on the `type_to_simulate` argument, it can return past data,
    future simulations, or both.

    Parameters
    ----------
    path_carbon_intensity : str or Path
        Path to the dataset containing carbon intensity values (e.g., by location and time).
    path_devices_details : str or Path
        Path to the dataset with device details (e.g., device_id, embodied carbon, lifetime).
    path_timeseries_data : str or Path
        Path to the time series dataset with hardware usage and related metrics.
    type_to_simulate : {"past", "future", "both"}
        Determines which simulation output to return:
        - "past": returns only the SCI DataFrame based on historical data.
        - "future": returns only the forecasted SCI DataFrame.
        - any other value (e.g. "both"): returns a tuple with both 
          `(sci_past, sci_forecast)`.

    Returns
    -------
    pandas.DataFrame or tuple of pandas.DataFrame
        If `type_to_simulate == "past"`:
            DataFrame with SCI computed from historical data.
        If `type_to_simulate == "future"`:
            DataFrame with forecasted SCI values.
        Otherwise:
            Tuple containing `(sci_past, sci_forecast)`.

    """

    df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue = load_sci_raw_data(path_carbon_intensity, 
                                                                                                     path_devices_details, 
                                                                                                     path_timeseries_data)
    df_final_o = compute_o(df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue)
    df_final_m = compute_m(df_carbon_intensity, df_devices, df_time_seriesV2, df_hardware_usage, df_pue)
    df_sci = compute_sci(df_final_o, df_final_m, df_time_seriesV2)

    if type_to_simulate == "past":
        return df_sci
    elif type_to_simulate == "future":
        return simulate_sci_forecast(df_sci)
    else:
        return df_sci, simulate_sci_forecast(df_sci)
