#!/bin/bash

# PostgreSQL setup script for AzizbekShop
PG_BIN="/opt/homebrew/opt/postgresql@15/bin"

echo "Setting up PostgreSQL database for AzizbekShop..."
echo ""

# Try to connect as postgres user
echo "Attempting to connect as postgres user..."
echo "If prompted for password, try:"
echo "  1. Press Enter (empty password)"
echo "  2. Or use the password you set during PostgreSQL installation"
echo ""

# Try to create database
$PG_BIN/psql -U postgres -c "CREATE DATABASE azizbekshop;" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Database 'azizbekshop' created successfully!"
    echo ""
    echo "Now update your .env file with:"
    echo "  DB_USERNAME=postgres"
    echo "  DB_PASSWORD=<your_postgres_password>"
else
    echo ""
    echo "⚠️  Could not create database automatically."
    echo ""
    echo "Please run manually:"
    echo "  $PG_BIN/psql -U postgres"
    echo ""
    echo "Then in PostgreSQL:"
    echo "  CREATE DATABASE azizbekshop;"
    echo "  \\q"
fi

