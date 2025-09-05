import csv
import pandas as pd

df = pd.read_csv('data.csv')

result = {
    df.groupby('datetime').apply(lambda x: dict(zip(x['shortname'], x['forecast']))).to_dict()
}

import json

with open('data.json', 'w') as json_file:
    json.dump(result, json_file)