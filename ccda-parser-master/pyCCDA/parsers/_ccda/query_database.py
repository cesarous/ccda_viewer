import os
import sqlite3
import string
def query_table_by_code_system(name, code, code_system, code_system_name):
    if not code:
        return "Code parameter is required"
    if isinstance(code, tuple):
        code = code[0]
    if not code_system and not code_system_name:
        return "Either code_system or code_system_name parameter is required"
    #some of the ways the values are passed into the wrapper clas is weird and I dont want to mess with it
    if name and isinstance(name, tuple):
        name = name[0]
    if code_system and isinstance(code_system, tuple):
        code_system = code_system[0]
    if code_system_name and isinstance(code_system, tuple):
        code_system_name = code_system_name[0]
    print(code)
    print(code_system)
    print(code_system_name)
    print(name)
    if name is None or name == "":
        script_directory = os.path.dirname(os.path.abspath(__file__))
        medical_codes_file = os.path.join(script_directory, '..',  '..', 'code_files','medical_codes.db')
        # Mapping between code systems and table names
        code_system_table_mapping = {
            "LOINC": "loinc_codes",
            "2.16.840.1.113883.6.1": "loinc_codes",
            "NCI Thesaurus": "nci_thesaurus",
            "2.16.840.1.113883.3.26.1.1": "nci_thesaurus",
            "ICD-10-CM Diagnosis": "icd10_codes",
            "2.16.840.1.113883.6.90": "icd10_codes",
        }

        # Determine the query table based on the code system
        query_table = code_system_table_mapping.get(code_system_name, None) or code_system_table_mapping.get(code_system, None)
        print(query_table)
        print("\n\n\n\n")
        if not query_table:
            return "Table not found"
        if query_table == "icd10_codes":
            code = code.replace(".", "")
        print(code)
        # Connect to the SQLite database
        conn = sqlite3.connect(medical_codes_file)
        cursor = conn.cursor()

        try:
            # Example: Query the chosen table for a specific code
            cursor.execute(f"SELECT Description FROM {query_table} WHERE Code = ?;", (code,))
            result = cursor.fetchone()
            if result == None:
                return "Query not Found"
            print(type(result))
            print(result)
            if result and isinstance(result, tuple):
                return result[0]
            return result
        finally:
            # Close the connection in a finally block to ensure it happens, even if an exception occurs
            conn.close()