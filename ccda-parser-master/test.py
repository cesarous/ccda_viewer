
import os
import unittest
import json 
from flask import Flask, jsonify
from pyCCDA.__init__ import CCDA
from flask_cors import CORS
import pandas as pd


script_directory = os.path.dirname(os.path.abspath(__file__))

xlsx_file = "./2024_DHS_Code_List_Addendum_11_29_2023/2024_DHS_Code_List_Addendum_11_29_2023.xlsx"
# Specify the full path to the CSV file
csv_file_path = os.path.join(script_directory, 'Loinc_2.76', 'LoincTable', 'Loinc.csv')
#C:\Users\Payton Moore\Desktop\ccda-parser-master\cda_viewer\ccda-parser-master\Loinc_2.76\LoincTable\Loinc.csv
def load_code_dict(xlsx_file, csv_file=None):
    df_xlsx = pd.read_excel(xlsx_file)

    # Drop NaN values in the second column
    df_xlsx = df_xlsx.dropna(subset=['Unnamed: 1'])

    # Set the first row as column names
    df_xlsx.columns = df_xlsx.iloc[0]

    # Skip the first row, as it's now redundant
    df_xlsx = df_xlsx[1:]

    # Initialize code_dict with data from the XLSX file
    code_dict = dict(zip(df_xlsx["Code"], df_xlsx["Description"]))

    if csv_file:
        # Load data from the CSV file
        df_csv = pd.read_csv(csv_file)

        # Update code_dict using data from the CSV file
        for index, row in df_csv.iterrows():
            code = str(row["LOINC_NUM"])  # Assuming "LOINC_NUM" is a string
            description = str(row["COMPONENT"])
            code_dict[code] = description

    return code_dict


# Load the data from both files into the code_dict
code_dict = load_code_dict(xlsx_file, csv_file_path)

# Print the updated code_dict
print(code_dict["8302-2"])