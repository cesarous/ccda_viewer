import os
import pandas as pd
import sqlite3
import string

def create_dhs_table():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    DHS_file = os.path.join(script_directory, '.', '2024_DHS_Code_List_Addendum_11_29_2023', '2024_DHS_Code_List_Addendum_11_29_2023.xlsx')

    df_xlsx = pd.read_excel(DHS_file)
    df_xlsx.columns = ['Code', 'Description']
    df_xlsx = df_xlsx[df_xlsx['Code'].astype(str).str.len() == 5]
    # Drop NaN values in the 'Code' column
    df_xlsx = df_xlsx.dropna(subset=['Description'])
    
    # Filter rows where 'Code' column has exactly 5 digits
    df_xlsx = df_xlsx[df_xlsx['Code'].astype(str).str.len() == 5]
    # Connect to the SQLite database (this will create a new database if it doesn't exist)
    conn = sqlite3.connect('medical_codes.db')
    duplicate_codes = df_xlsx[df_xlsx.duplicated(subset=['Code'], keep=False)]
    print("Duplicate Codes:")
    print(duplicate_codes)
    df_xlsx = df_xlsx.drop_duplicates(subset=['Code'])
    # Create a table for DHS codes with consistent column names and 'Code' as the primary key
    df_xlsx[['Code', 'Description']].to_sql('dhs_codes', conn, index=False, if_exists='replace', schema='main', dtype={'Code': 'TEXT PRIMARY KEY'})

    # Commit changes and close the connection
    conn.commit()
    conn.close()

    print("DHS data inserted into 'medical_codes' table.")



def create_icd10_table():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    ICD10_file_path = os.path.join(script_directory, '.', 'icd10cm-CodesDescriptions-2024', 'icd10cm-codes-2024.csv')

    # Read the ICD10 data from the CSV file
    df_icd10 = pd.read_csv(ICD10_file_path)

    # Connect to the SQLite database (this will create a new database if it doesn't exist)
    conn = sqlite3.connect('medical_codes.db')

    # Create a table for ICD10 codes with consistent column names and 'Code' as the primary key
    df_icd10[['code', 'description']].rename(columns={'code': 'Code', 'description': 'Description'}).to_sql('icd10_codes', conn, index=False, if_exists='replace', schema='main', dtype={'Code': 'TEXT PRIMARY KEY'})

    # Commit changes and close the connection
    conn.commit()
    conn.close()

    print("ICD10 data inserted into 'medical_codes' table.")

def create_loinc_table():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    LOINC_file_path = os.path.join(script_directory, '.', 'Loinc_2.76', 'LoincTable', 'Loinc.csv')

    # Read the LOINC data from the CSV file
    df_loinc = pd.read_csv(LOINC_file_path)

    # Connect to the SQLite database (this will create a new database if it doesn't exist)
    conn = sqlite3.connect('medical_codes.db')
    # Drop the existing table if it exists
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS loinc_codes;")
    conn.commit()
    # Create a table for LOINC codes with consistent column names and 'Code' as the primary key
    df_loinc[['LOINC_NUM', 'LONG_COMMON_NAME']].rename(columns={'LOINC_NUM': 'Code', 'LONG_COMMON_NAME': 'Description'}).to_sql('loinc_codes', conn, index=False, if_exists='replace', schema='main', dtype={'Code': 'TEXT PRIMARY KEY'})

    # Commit changes and close the connection
    conn.commit()
    conn.close()

    print("LOINC data inserted into 'medical_codes' table.")

#todo: this function is shit
def create_nci_thesaurus_table():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    DHS_file = os.path.join(script_directory, '.', 'NCI_Thesaurus', 'Thesaurus.txt')
    nci_df = pd.read_csv(DHS_file, sep='\t', header=None, usecols=[0, 2, 3])

    # Create a new DataFrame with 'Code' and 'Description' columns by concatenating the original columns
    merged_df_code_1 = pd.DataFrame({
        'Code': nci_df[0],
        'Description': nci_df[3]
    })
    # Initialize an empty list to store DataFrames
    df_list = []
    # Split and duplicate rows for 'MappedCode' with multiple codes
    for index, row in nci_df.iterrows():
        string_code = str(row[2])
        print(string_code)
        mapped_codes = string_code.split('|')
        code_df_list = [pd.DataFrame({'Code': code, 'Description': row[3]}, index=[0]) for code in mapped_codes]
        df_list.extend(code_df_list)

    # Concatenate all DataFrames in the list
    merged_df_code_2 = pd.concat(df_list, ignore_index=True)

    # Concatenate the two DataFrames
    merged_df = pd.concat([merged_df_code_1, merged_df_code_2], ignore_index=True)

    # Remove duplicates based on the 'Code' column
    duplicate_codes = merged_df[merged_df.duplicated(subset=['Code'], keep=False)]
    print("Duplicate Codes:")
    print(duplicate_codes)
    merged_df = merged_df.drop_duplicates(subset=['Code'])

    # Print the contents of the DataFrame
    print("Merged DataFrame:")
    print(merged_df)

    # Connect to the SQLite database (this will create a new database if it doesn't exist)
    conn = sqlite3.connect('medical_codes.db')

    # Create a table for NCI Thesaurus codes with consistent column names and 'Code' as the primary key
    merged_df.to_sql('nci_thesaurus', conn, index=False, if_exists='replace', schema='main', dtype={'Code': 'TEXT PRIMARY KEY'})

    # Commit changes and close the connection
    conn.commit()
    conn.close()

    print("NCI Thesaurus data inserted into 'medical_codes' table.")


# Call the function to create the NCI Thesaurus table
# create_nci_thesaurus_table()
# create_dhs_table()
# create_icd10_table()
create_loinc_table()


