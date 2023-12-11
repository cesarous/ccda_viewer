import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('medical_codes.db')

# Create a cursor object
cursor = conn.cursor()
# Code to search for
search_code = "M1711"

# Fetch rows from the loinc_codes table for the specified code
cursor.execute(f"SELECT * FROM icd10_codes WHERE Code = ?;", (search_code,))
rows = cursor.fetchall()

# Print the result
print(f"\nRows in icd10_codes table for code '{search_code}':")
# Get column names
cursor.execute("PRAGMA table_info(icd10_codes);")
columns = [column[1] for column in cursor.fetchall()]

# Print column names
print(" | ".join(columns))

# Print rows
for row in rows:
    print(" | ".join(str(value) for value in row))
# Fetch all tables using the SELECT statement
