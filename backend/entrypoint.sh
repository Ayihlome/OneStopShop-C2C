#!/bin/sh
set -eu
echo "========== ENTRYPOINT STARTED =========="

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-onestopshop}"
DB_PASSWORD="${DB_PASSWORD:-}"

export PGPASSWORD="$DB_PASSWORD"

echo "Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."

attempt=1
while ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do
  if [ "$attempt" -ge 30 ]; then
    echo "PostgreSQL did not become ready after 30 attempts."
    exit 1
  fi

  echo "PostgreSQL is not ready yet, retrying (${attempt}/30)..."
  attempt=$((attempt + 1))
  sleep 2
done

echo "PostgreSQL is ready."
echo "Running database migration..."
psql \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  -v ON_ERROR_STOP=1 \
  -f db/migrations/001_init.sql

echo "Seeding admin account..."
if ! node scripts/seedAdmin.js; then
  echo "Admin seed failed."
  exit 1
fi

echo "Starting backend..."
exec "$@"
