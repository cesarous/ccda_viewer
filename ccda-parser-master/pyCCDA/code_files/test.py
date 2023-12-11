import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('medical_codes.db')

# Create a cursor object
cursor = conn.cursor()
# Code to search for
search_code = "37743-2"

# Fetch rows from the nci_thesaurus table for the specified code
cursor.execute(f"SELECT * FROM loinc_codes WHERE Code = ?;", (search_code,))
rows = cursor.fetchall()

# Print the result
print(f"\nRows in nci_thesaurus table for code '{search_code}':")
# Get column names
cursor.execute("PRAGMA table_info(nci_thesaurus);")
columns = [column[1] for column in cursor.fetchall()]

# Print column names
print(" | ".join(columns))

# Print rows
for row in rows:
    print(" | ".join(str(value) for value in row))
# Fetch all tables using the SELECT statement


cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Print the list of tables
print("Tables in the database:")
for table in tables:
    table_name = table[0]
    print(f"\nFirst 3 rows for table '{table_name}':")

    # Fetch and print the first 3 rows for each table
    cursor.execute(f"SELECT * FROM {table_name} LIMIT 3;")
    rows = cursor.fetchall()
    
    # Get column names
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = [column[1] for column in cursor.fetchall()]

    # Print column names
    print(" | ".join(columns))

    # Print rows
    for row in rows:
        print(" | ".join(str(value) for value in row))

# Close the connection
conn.close()
