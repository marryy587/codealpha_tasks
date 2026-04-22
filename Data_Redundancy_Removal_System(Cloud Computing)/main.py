import pandas as pd
from difflib import SequenceMatcher

# Load existing database
try:
    db = pd.read_csv("database.csv")
except FileNotFoundError:
    db = pd.DataFrame(columns=["Name", "Email"])


def similarity(a, b):
    return SequenceMatcher(None, str(a).lower(), str(b).lower()).ratio()


def validate_record(record):
    if not record["Name"].strip():
        return "Invalid: Name is empty"
    if not record["Email"].strip():
        return "Invalid: Email is empty"
    if "@" not in record["Email"] or "." not in record["Email"]:
        return "Invalid: Email format incorrect"
    return "Valid"


def classify_record(new_record, db):
    for _, row in db.iterrows():
        # Exact duplicate by email
        if new_record["Email"].lower() == str(row["Email"]).lower():
            return "Duplicate"

        # Similarity-based false positive check
        score = similarity(new_record["Name"], row["Name"])
        if score >= 0.8:
            return "False Positive"

    return "Unique"


def insert_record(new_record):
    global db

    validation = validate_record(new_record)
    if validation != "Valid":
        print(validation)
        return

    status = classify_record(new_record, db)

    if status == "Unique":
        db = pd.concat([db, pd.DataFrame([new_record])], ignore_index=True)
        db.to_csv("database.csv", index=False)
        print("Unique and verified record added successfully.")
    elif status == "Duplicate":
        print("Duplicate record found. Not added.")
    else:
        print("Possible false positive found. Needs manual review.")


# -----------------------------
# Test record (change this part only for testing)
# -----------------------------
new_record = {"Name": "Ahmed Raza", "Email": "ahmed@gmail.com"}

insert_record(new_record)