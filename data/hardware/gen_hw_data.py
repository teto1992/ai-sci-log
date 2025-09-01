output_file = "hardware_data.csv"


for i in range(100):
    with open(output_file, "a") as f:
        f.write(f"HardwareID{i},Model{i},Manufacturer{i},2023-01-01\n")