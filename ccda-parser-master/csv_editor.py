import os
import csv

script_directory = os.path.dirname(os.path.abspath(__file__))

# Specify the path for the text file
text_file_path = os.path.join(script_directory, 'icd10cm-CodesDescriptions-2024', 'icd10cm-codes-2024.txt')
# Read the content from the text file
with open(text_file_path, mode="r", encoding="utf-8") as text_file:
    data = text_file.read()

# Split the data into lines and extract columns
lines = [line.split(maxsplit=1) for line in data.splitlines()]

# Specify the path for the CSV file
csv_file_path = os.path.join(script_directory, 'icd10cm-CodesDescriptions-2024', 'icd10cm-codes-2024.csv')

# Write to CSV file with tab as the delimiter
with open(csv_file_path, mode="w", newline="", encoding="utf-8") as csv_file:
    csv_writer = csv.writer(csv_file, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL)
    csv_writer.writerows(lines)

print(f"CSV file saved to {csv_file_path}")