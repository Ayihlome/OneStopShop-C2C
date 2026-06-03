# Development Setup Guide

> How to set up a OneStopShop development environment from scratch, whether you're using Docker or running services directly.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Option A: Docker (recommended)](#option-a-docker-recommended)
- [Option B: Native setup](#option-b-native-setup)
- [Database migrations](#database-migrations)
- [PHP worker (document processing)](#php-worker-document-processing)
- [Testing the full flow](#testing-the-full-flow)
- [Branch workflow](#branch-workflow)
- [Code quality](#code-quality)
- [Common issues](#common-issues)

---

## Prerequisites

### For Docker setup
- Docker Desktop (with WSL2 backend on Windows)
- Git

### For native setup
- Node.js 20+
- npm 10+
- PostgreSQL 16+
- PHP 8.2+ (CLI) — optional, only if running the worker
- Tesseract OCR 5+ — optional, only if running the worker
- Composer — optional, only if running the worker

---

## Option A: Docker (recommended)

Docker Compose runs the full stack including PostgreSQL. You don't need anything installed locally except Docker and Git.

### Step 1: Clone and configure

```bash
git clone https://github.com/Ayihlome/OneStopShop-C2C.git
cd OneStopShop-C2C

# Root .env — database credentials for Docker Compose
cp .env.example .env

# Backend .env — app configuration
cp backend/.env.example backend/.env
```

### Step 2: Edit environment files

**`backend/.env`** — this is the main config file:

```env
PORT=3000
NODE_ENV=development

# Docker Compose uses "db" as the hostname
DB_HOST=db
DB_PORT=5432
DB_NAME=onestopshop
DB_USER=postgres
DB_PASSWORD=changeme_strong_password

JWT_SECRET=generate_with_openssl_rand_base64_64
JWT_EXPIRES_IN=7d

# CORS — frontend dev server origin
CORS_ORIGINS=http://localhost:5173,http://localhost:3001

# Admin seed
ADMIN_EMAIL=admin@onestopshop.com
ADMIN_PASSWORD=yourchosenpassword
```

Make sure `DB_PASSWORD` in `backend/.env` matches `POSTGRES_PASSWORD` in the root `.env`.

### Step 3: Start the stack

```bash
docker compose up --build
```

This builds and starts four containers:
| Service | Depends on | Purpose |
|---------|-----------|---------|
| `db` | — | PostgreSQL 16 |
| `backend` | `db` (healthy) | Express API |
| `frontend` | `backend` | Vite dev server |
| `php-worker` | `db` (healthy) | Document OCR daemon |

### Step 4: Verify

Visit http://localhost:5173 — the app loads.

```bash
curl http://localhost:3000/api/health
# → {"status":"ok","timestamp":"...","uptime":42}
```

### Using `make`

The `Makefile` wraps common Docker Compose commands:

```bash
make up              # Start (build if needed)
make down            # Stop all containers
make logs            # Tail all logs
make db-shell        # psql into the database
make backend-shell   # sh into the backend container
make reset-db        # Wipe DB volume and restart
make prod            # Start with production overrides
```

### Volumes

- `postgres_data` — PostgreSQL data (survives `docker compose down`, deleted with `make reset-db`)
- `uploads_data` — Uploaded mechanic documents (survives restarts)
- Anonymous volumes for `node_modules` inside each Node container (keeps Linux binaries separate from host)

---

## Option B: Native setup

If you prefer running services directly on your machine.

### Step 1: Database

```bash
# Create the database
createdb -h localhost -p 5432 -U postgres onestopshop

# Run migrations
psql -h localhost -p 5432 -U postgres -d onestopshop \
  -f backend/db/migrations/001_init.sql
psql -h localhost -p 5432 -U postgres -d onestopshop \
  -f backend/db/migrations/006_provider_availability.sql

# Seed admin account
npm --prefix backend run seed:admin
```

### Step 2: Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set DB_HOST=localhost, DB_PASSWORD to your local PostgreSQL password

npm install
npm run dev
```

The backend starts on http://localhost:3000.

### Step 3: Frontend

Open a second terminal:

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=/api works with the Vite dev proxy
# For production/standalone: VITE_API_URL=http://localhost:3000/api

npm install
npm run dev
```

The frontend starts on http://localhost:5173.

### Step 4: PHP Worker (optional)

Only needed if you're working on document verification:

```bash
cd php-auth
cp .env.example .env
# Set DATABASE_URL=pgsql:host=localhost;port=5432;dbname=onestopshop;user=postgres;password=yourpw
# Set BACKEND_URL=http://localhost:3000

composer install
php worker.php
```

The worker polls `processing_jobs` every 3 seconds. Leave it running in a terminal.

---

## Database Migrations

Migrations live in `backend/db/migrations/` and are applied sequentially:

| File | What it does |
|------|-------------|
| `001_init.sql` | Creates all core tables: accounts, users, service_provider_profiles, vehicles, bookings, payments, notifications, reviews, mechanic_documents, processing_jobs, triggers, indexes |
| `006_provider_availability.sql` | Creates `provider_weekly_availability` and `provider_date_exceptions` tables |

### Apply a migration

```bash
# Via npm script (reads DATABASE_URL from backend/.env or environment)
npm --prefix backend run migrate

# Or directly with psql
psql "$DATABASE_URL" -f backend/db/migrations/006_provider_availability.sql
```

### Add a new migration

1. Create `backend/db/migrations/002_feature_name.sql`
2. Run it against your local database
3. The Docker entrypoint automatically applies all `.sql` files in order

**Important:** Migrations use `CREATE TABLE IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` so they are idempotent. You can run them multiple times safely.

---

## PHP Worker (Document Processing)

The worker is a headless PHP daemon that processes uploaded verification documents.

### How it works

1. Backend receives a document upload → inserts row in `mechanic_documents` and `processing_jobs`
2. Worker polls `processing_jobs` every 3 seconds
3. Worker downloads the file (local or via HTTP from backend), runs OCR + keyword matching
4. Worker updates `mechanic_documents` with OCR text, validation result, and auto-verification status
5. If all documents for a provider are verified, the provider is auto-tagged as verified

### Running

```bash
cd php-auth
composer install
cp .env.example .env
# Fill in DATABASE_URL and BACKEND_URL
php worker.php
```

### Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL DSN (`pgsql:host=...;port=...;dbname=...;user=...;password=...`) or URL (`postgresql://...`) |
| `BACKEND_URL` | Backend API base URL for downloading uploaded files. Falls back to `http://localhost:3000`. Required on Railway where containers are separate. |

### Docker image

The `Dockerfile.php-worker` is a `php:8.2-cli` image with:
- `imagick` (PHP extension via PECL)
- `tesseract-ocr` + `tesseract-ocr-eng` (system packages)
- `pdo_pgsql` + `pgsql` (PHP extensions)
- `composer` installed for PHP dependencies

---

## Testing the Full Flow

### 1. User signup and login

```bash
# Register
curl -X POST http://localhost:3000/api/auth/signup/user \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@example.com","password":"Password123!","phone_number":"+27631234567"}'

# Login — grab the token from the response
curl -X POST http://localhost:3000/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'
```

### 2. Become a provider

```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:3000/api/mechanics/become-provider \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "business_whatsapp_number":"+27631234567",
    "business_name":"Test Auto Repairs",
    "service_description":"Brake and suspension specialist",
    "specialities":["brakes","suspension"]
  }'
```

### 3. Upload a verification document

```bash
curl -X POST http://localhost:3000/api/mechanics/documents \
  -H "Authorization: Bearer $TOKEN" \
  -F "doc_type=id" \
  -F "document=@./id-document.jpg"
```

### 4. Create a booking (from a second user account)

```bash
# Sign up another user, login, create a vehicle, then:
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN2" \
  -d '{
    "providerId":1,
    "vehicleId":1,
    "description":"Brake inspection and pad replacement",
    "preferredSchedule":"2026-06-10T10:00:00.000Z"
  }'
```

### 5. Admin: review document

```bash
ADMIN_TOKEN="your_admin_jwt"

# List pending documents
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3000/api/admin/documents

# Get document detail
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3000/api/admin/documents/1

# Approve
curl -X PATCH -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3000/api/admin/documents/1/approve
```

---

## Branch Workflow

The project uses **stacked branches** — each phase branches from the previous one and includes all its commits.

```
master
 └── phase-4/php-document-worker
      └── phase-5/5.1-admin-review
           └── phase-5/5.2-provider-search
                └── phase-5/5.3-whatsapp-integration
```

### Creating a new branch

```bash
git checkout master && git pull
git checkout -b phase-N/short-description
git push -u origin HEAD
```

### Opening a PR

PRs target `master`. Stacked branches merge in order (base → subsequent). GitHub shows the full diff including upstream changes — this is expected.

### Commit conventions

```
type(scope): short description

Longer explanation if needed.
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `ci`, `chore`, `perf`

---

## Code Quality

### Backend linting

The backend uses standard Node.js conventions. No linter is enforced — follow the existing patterns:
- `asyncHandler` wrapper for all async route handlers
- `sanitize()` before returning data to clients
- `logger` for structured logging
- Services throw `createError()` which the error handler catches
- `errorMeta(error)` for consistent error logging

### Frontend

Built with Vite + React 19 + TypeScript. Run the build to check:

```bash
npm --prefix frontend run build
```

Import paths use the `@/` alias (e.g. `import { Button } from '@/app/components/ui/button'`).

---

## Common Issues

### "Port already in use"
Docker: change the host port in `docker-compose.yml`:
```yaml
ports:
  - "5174:5173"  # instead of 5173:5173
```

### "ECONNREFUSED" on backend startup
PostgreSQL isn't ready yet. Docker Compose has a healthcheck + wait loop — wait a few seconds and check `docker compose logs backend`.

### "Not allowed by CORS"
The frontend origin isn't in `CORS_ORIGINS`. In production, set it to the frontend's Railway URL. In local dev, `http://localhost:5173` and `http://localhost:3001` are the defaults.

### "Cannot find module 'X'"
```bash
cd backend && npm install
cd frontend && npm install
```

### Hot-reload not working (WSL2/Docker)
The Compose file sets `CHOKIDAR_USEPOLLING=true` for file watching. If it still doesn't work, keep the repo inside the WSL2 filesystem (not a mounted Windows path).

### Worker "could not find driver"
The PHP `DATABASE_URL` must be a proper PDO DSN (`pgsql:host=...`). The worker accepts `postgresql://` URL format and converts it automatically — but if using an explicit DSN, make sure it starts with `pgsql:`.

### Worker can't download files
Worker needs `BACKEND_URL` to download uploaded files from the backend. On Railway, set this to the backend service URL. Locally, `http://localhost:3000` is the fallback.
