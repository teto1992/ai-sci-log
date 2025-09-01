import csv

open_file = open("./Carbon_Intensity_Data.csv", "r")

outputFile = open("./ci.pl", "w")

i = 0

for line in csv.DictReader(open_file):
    timeslot = line["Timeslot"]
    region = line["Region"].lower().strip().replace(" ", "_")
    carbon_intensity = line["Value"]
    outputFile.write(f'carbonIntensity({timeslot}, {carbon_intensity}, {region}).\n')
    i += 1
