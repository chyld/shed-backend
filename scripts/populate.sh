#!/bin/bash

# Database file path - adjust this to match your database location
DB_PATH="./prisma/dev.db"
SQL_PATH="./scripts/seed.sql"

# Check if database file exists
if [ ! -f "$DB_PATH" ]; then
    echo "Error: Database file not found at $DB_PATH"
    exit 1
fi

# Check if seed file exists
if [ ! -f "$SQL_PATH" ]; then
    echo "Error: Seed file not found at $SQL_PATH"
    exit 1
fi

# Import the seed data
echo "Importing seed data into database..."
sqlite3 "$DB_PATH" < "$SQL_PATH"

if [ $? -eq 0 ]; then
    echo "Seed data imported successfully!"
else
    echo "Error: Failed to import seed data"
    exit 1
fi
