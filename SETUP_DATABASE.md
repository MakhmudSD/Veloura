# PostgreSQL Setup Guide

## Step 1: Start PostgreSQL

```bash
brew services start postgresql@15
```

## Step 2: Find Your PostgreSQL Credentials

### Option A: Use Default Postgres User
The default PostgreSQL installation usually has:
- **Username**: `postgres`
- **Password**: Usually empty or the password you set during installation

Try connecting:
```bash
psql -U postgres
```

If it asks for a password and you don't remember:
- Try pressing Enter (empty password)
- Or check if you set a password during installation

### Option B: Create a New User (Recommended)

```bash
# Connect to PostgreSQL
psql postgres

# Create a new user
CREATE USER azizbekshop WITH PASSWORD 'your_password_here';

# Grant privileges
ALTER USER azizbekshop CREATEDB;

# Create database
CREATE DATABASE azizbekshop OWNER azizbekshop;

# Exit
\q
```

## Step 3: Create the Database

If using default postgres user:
```bash
createdb azizbekshop
```

Or connect and create:
```bash
psql -U postgres
CREATE DATABASE azizbekshop;
\q
```

## Step 4: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and set your PostgreSQL credentials:
```env
DB_USERNAME=postgres
DB_PASSWORD=your_actual_password_here
DB_NAME=azizbekshop
```

## Step 5: Test Connection

```bash
psql -U postgres -d azizbekshop
```

If successful, you'll see the PostgreSQL prompt. Type `\q` to exit.

## Troubleshooting

### If PostgreSQL won't start:
```bash
brew services restart postgresql@15
```

### If you forgot your password:
```bash
# Reset postgres user password
psql postgres
ALTER USER postgres WITH PASSWORD 'new_password';
\q
```

### Check PostgreSQL status:
```bash
brew services list | grep postgres
```

### Check if PostgreSQL is running:
```bash
pg_isready -h localhost -p 5432
```

