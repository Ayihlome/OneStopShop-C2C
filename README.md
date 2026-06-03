# OneStopShop C2C

> A C2C (Customer-to-Customer) marketplace connecting car owners with independent mechanics in South Africa. Book services, verify credentials, and pay — all in one platform.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  Frontend   │────▶│    Backend       │────▶│  PostgreSQL 16    │
│  React/Vite │     │  Express/Node.js │     │                   │
│  Tailwind   │◀────│  REST API        │◀────│  + migrations     │
│  shadcn/ui  │     │  Port 3000       │     │                   │
│  Port 5173  │     └────────┬─────────┘     └───────────────────┘
└─────────────┘              │
                             │ (HTTP file download)
                             ▼
                     ┌───────────────────┐
                     │  PHP Worker       │
                     │  Headless daemon  │
                     │  — OCR (Tesseract)│
                     │  — Doc validation │
                     │  — Auto-verify    │
                     └───────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite 6, Tailwind CSS 4, shadcn/ui |
| **Backend** | Node.js 20, Express 5, PostgreSQL 16 (pg), JWT auth |
| **Worker** | PHP 8.2 CLI daemon, Tesseract OCR 5, Imagick |
| **Infrastructure** | Docker Compose (local), Railway (production) |
| **Payments** | PayFast (sandbox/live) |
| **Notifications** | WhatsApp Cloud API |

## Features

- **User roles** — Customers, Service Providers (Mechanics), Admins
- **Provider search** — Filter by location, speciality, availability, rating, and verification status
- **Booking system** — Create, manage, and track service bookings with status timeline
- **Document verification** — Upload ID, certification, proof of residence; auto-verified via OCR + keyword matching
- **Admin dashboard** — Manage users, verify providers, review documents with side-by-side image/OCR view
- **Availability calendar** — Weekly schedule + date exceptions for providers
- **Reviews & ratings** — Leave feedback on completed bookings
- **Payments** — PayFast integration with sandbox testing
- **WhatsApp notifications** — Booking confirmations, status updates, and provider contact
- **Notifications** — In-app notification system

## Quick Start (Docker)

```bash
# 1. Clone and copy config
git clone https://github.com/Ayihlome/OneStopShop-C2C.git
cd OneStopShop-C2C
cp .env.example .env
cp backend/.env.example backend/.env

# 2. Edit .env with a strong database password
#    Edit backend/.env — ensure DB_PASSWORD matches, pick a JWT_SECRET

# 3. Start everything
docker compose up --build
```

**What starts:**
| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api/health |
| PostgreSQL | localhost:5432 |
| PHP Worker | Background daemon (no web port) |

On first startup, migrations run automatically and an admin account is seeded.

**Default admin login:**
```
Email:    admin@onestopshop.com
Password: Admin1234!
Role:     superadmin
```

**Common commands:**

```bash
make up              # Start stack
make down            # Stop
make logs            # Follow all logs
make db-shell        # psql into the database
make reset-db        # Wipe DB volumes and restart clean
make prod            # Start with production overrides
```

---

## Manual Setup (Without Docker)

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- PHP 8.2+ (for the worker — optional if you skip document processing)
- Tesseract OCR (for the worker — `tesseract --version`)

### Backend

```bash
cd backend
cp .env.example .env

# Edit .env with your database credentials
npm install
npm run migrate
npm run seed:admin
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### PHP Worker (optional — document processing)

```bash
cd php-auth
cp .env.example .env
composer install
# Edit .env with your database URL and BACKEND_URL
php worker.php
```

### Verify

```bash
curl http://localhost:3000/api/health
# → { "status": "ok", "timestamp": "...", "uptime": 42 }
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | API server port |
| `NODE_ENV` | No | development | `development` or `production` |
| `DATABASE_URL` | Conditional* | — | Full PostgreSQL URL (overrides individual DB_* vars) |
| `DB_HOST` | Conditional* | localhost | PostgreSQL host |
| `DB_PORT` | No | 5432 | PostgreSQL port |
| `DB_NAME` | No | onestopshop | Database name |
| `DB_USER` | No | postgres | Database user |
| `DB_PASSWORD` | Conditional* | — | Database password |
| `DB_POOL_MAX` | No | 10 | Connection pool size |
| `JWT_SECRET` | **Yes** | — | Random 64+ char string (`openssl rand -base64 64`) |
| `JWT_EXPIRES_IN` | No | 7d | Token expiry (e.g. `7d`, `24h`) |
| `CORS_ORIGINS` | **Production** | localhost:3001,5173 | Comma-separated allowed origins |
| `ADMIN_EMAIL` | No | admin@onestopshop.com | Default admin email (for seed) |
| `ADMIN_PASSWORD` | Conditional* | — | Default admin password (for seed) |
| `PAYFAST_MERCHANT_ID` | For payments | — | PayFast merchant ID |
| `PAYFAST_MERCHANT_KEY` | For payments | — | PayFast merchant key |
| `PAYFAST_PASSPHRASE` | For payments | — | PayFast passphrase |
| `PAYFAST_RETURN_URL` | No | localhost:5173/booking/success | PayFast return URL |
| `PAYFAST_CANCEL_URL` | No | localhost:5173/booking/cancel | PayFast cancel URL |
| `PAYFAST_NOTIFY_URL` | No | localhost:3000/api/payments/itn | PayFast ITN webhook URL |
| `WHATSAPP_TOKEN` | For WhatsApp | — | WhatsApp Cloud API access token |
| `WHATSAPP_PHONE_NUMBER_ID` | For WhatsApp | — | WhatsApp Business phone number ID |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | No | — | Webhook verification token |

\* `DATABASE_URL` OR `DB_HOST`+`DB_PASSWORD` is required.

### Frontend (`frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | **Production** | /api | Backend API URL (use `/api` for local dev with Vite proxy) |

### PHP Worker (`php-auth/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | **Yes** | — | PostgreSQL DSN (`pgsql:host=...;port=...;dbname=...;user=...;password=...`) |
| `BACKEND_URL` | Production | http://localhost:3000 | Backend API URL (for file downloads on separate-container deployments) |

---

## Deployment (Railway)

The project deploys as **three separate Railway services** from the same repo:

| Service | Directory | Builder | Start Command |
|---------|-----------|---------|---------------|
| Backend API | `backend/` | Dockerfile (`Dockerfile.backend`) | `npm start` |
| Frontend | `frontend/` | Nixpacks | `npm run build && npx serve dist -p 5173 -s` |
| PHP Worker | `php-auth/` | Dockerfile (`Dockerfile.php-worker`) | `php worker.php` |

**Environment setup:**
- Backend needs `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` (set to frontend Railway URL)
- Frontend needs `VITE_API_URL` (set to backend Railway URL)
- Worker needs `DATABASE_URL` and `BACKEND_URL` (set to backend Railway URL)
- Attach a PostgreSQL plugin to the backend Railway project — it auto-injects `DATABASE_URL`

**Important notes:**
- The Vite dev proxy (`vite.config.js` → `server.proxy`) is **dev-only** and does not exist in production. Always set `VITE_API_URL` explicitly in production.
- The PHP worker runs headless (no web server) — it polls the database every 3 seconds for pending document jobs.
- On Railway, the worker and backend are on separate containers with no shared filesystem. The worker downloads uploaded files from the backend via HTTP.

---

## API Routes

All routes are prefixed with `/api`.

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/mechanics` | List all providers |
| GET | `/api/mechanics/search` | Search providers (query params: `speciality`, `location`, `available_on`, `min_rating`, `verified_only`) |
| GET | `/api/mechanics/filter` | Filter providers |
| GET | `/api/mechanics/nearby` | Nearby providers (`?lat=&lng=`) |
| GET | `/api/mechanics/:id` | Single provider profile |
| GET | `/api/mechanics/:id/profile` | Public provider profile |
| GET | `/api/mechanics/:id/availability` | Get provider's availability schedule |
| GET | `/api/reviews/mechanic/:id` | Reviews for a provider |

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup/user` | — | Register a new user |
| POST | `/api/auth/login/user` | — | Login as user |
| POST | `/api/auth/login/admin` | — | Login as admin |

### Authenticated (requires Bearer token)
| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/api/users/me` | Any | Get current user profile |
| PATCH | `/api/users/me` | Any | Update profile |
| POST | `/api/mechanics/become-provider` | Any | Create provider profile |
| POST | `/api/mechanics/documents` | Provider | Upload verification document |
| PUT | `/api/mechanics/:id` | Owner | Update provider profile |
| GET | `/api/mechanics/provider/stats` | Provider | Provider dashboard stats |
| PUT | `/api/mechanics/:id/availability` | Owner | Set weekly availability |
| POST | `/api/mechanics/:id/availability/exceptions` | Owner | Add date exception |
| DELETE | `/api/mechanics/:id/availability/exceptions/:id` | Owner | Remove date exception |
| POST | `/api/vehicles` | Any | Register a vehicle |
| GET | `/api/vehicles/my` | Any | List my vehicles |
| PUT | `/api/vehicles/:id` | Owner | Update vehicle |
| DELETE | `/api/vehicles/:id` | Owner | Delete vehicle |
| POST | `/api/bookings` | Any | Create booking |
| GET | `/api/bookings/user` | Any | My bookings (customer) |
| GET | `/api/bookings/mechanic` | Provider | My bookings (provider) |
| GET | `/api/bookings/:id` | Any | Booking detail |
| PATCH | `/api/bookings/:id/status` | Provider/Admin | Update booking status |
| POST | `/api/payments/booking/:id/initiate` | Customer | Initiate PayFast payment |
| GET | `/api/payments/booking/:id/status` | Customer | Check payment status |
| POST | `/api/payments/itn` | — | PayFast Instant Transaction Notification |
| POST | `/api/reviews` | User/Provider | Leave a review |
| GET | `/api/reviews/user` | Any | My reviews |
| GET | `/api/notifications` | Any | List notifications |
| PATCH | `/api/notifications/:id/read` | Any | Mark notification read |

### Admin (requires moderator or superadmin role)
| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/api/admin/dashboard` | Mod+ | Dashboard analytics |
| GET | `/api/admin/users` | Mod+ | List all users |
| DELETE | `/api/admin/users/:id` | Superadmin | Delete user |
| GET | `/api/admin/mechanics` | Mod+ | List all providers |
| DELETE | `/api/admin/mechanics/:id` | Superadmin | Delete provider |
| PATCH | `/api/admin/mechanics/:id/verify` | Superadmin | Verify provider |
| PATCH | `/api/admin/accounts/:id/suspend` | Superadmin | Suspend account |
| GET | `/api/admin/documents` | Mod+ | List verification documents |
| GET | `/api/admin/documents/:id` | Mod+ | Document detail with OCR |
| PATCH | `/api/admin/documents/:id/approve` | Superadmin | Approve document |
| PATCH | `/api/admin/documents/:id/reject` | Superadmin | Reject document |
| GET | `/api/admin/payments` | Mod+ | Payment history |

---

## Database Migrations

Migrations live in `backend/db/migrations/` and are applied in order:

| File | Description |
|------|-------------|
| `001_init.sql` | Core schema — accounts, users, service_providers, vehicles, bookings, payments, notifications, reviews, mechanic_documents, processing_jobs |
| `006_provider_availability.sql` | Provider weekly availability schedule and date exceptions |

Run migrations:

```bash
# Via npm script (uses DATABASE_URL)
npm --prefix backend run migrate

# Or via psql directly
psql "$DATABASE_URL" -f backend/db/migrations/001_init.sql
psql "$DATABASE_URL" -f backend/db/migrations/006_provider_availability.sql
```

---

## PHP Document Worker

The worker (`php-auth/worker.php`) is a headless daemon that:

1. Polls `processing_jobs` every 3 seconds for pending jobs
2. Downloads the uploaded file from the backend (or reads locally)
3. Generates a thumbnail via Imagick
4. Runs OCR via Tesseract
5. Matches text against keyword rules per document type (ID, certification, proof of residence)
6. Auto-verifies or flags for manual review
7. Updates the database with results

**Running locally:**

```bash
cd php-auth
composer install
cp .env.example .env
# Set DATABASE_URL and BACKEND_URL in .env
php worker.php
```

**On Railway:** The worker runs as a separate Docker service. Set `DATABASE_URL` and `BACKEND_URL` as Railway environment variables.

---

## Project Structure

```
OneStopShop-C2C/
├── backend/                  # Express API server
│   ├── config/               # Environment config
│   ├── controllers/          # Route handlers
│   ├── db/                   # Database pool + migrations
│   ├── middleware/           # Auth, validation, upload, error handling
│   ├── routes/               # Route definitions
│   ├── services/             # Business logic
│   ├── utils/                # Logger, sanitize, errors, async handler
│   ├── scripts/              # Migration + seed scripts
│   ├── Dockerfile.backend    # Railway Docker image
│   └── server.js             # Entry point
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── api/              # API client modules
│   │   ├── app/              # Components, layout, routes
│   │   └── imports/          # Page-level components
│   ├── Dockerfile.frontend   # Dev Docker image
│   └── vite.config.js        # Vite config + dev proxy
├── php-auth/                 # PHP document worker
│   ├── worker.php            # Daemon entry point
│   ├── Dockerfile.php-worker # Production Docker image
│   └── composer.json         # PHP dependencies
├── docker-compose.yml        # Local dev stack
├── docker-compose.prod.yml   # Production overrides
└── Makefile                  # Convenience commands
```

---

## Troubleshooting

| Problem | Likely fix |
|---------|-----------|
| Backend can't connect to DB | Check `DB_PASSWORD` matches `POSTGRES_PASSWORD` in `.env`. Wait for DB healthcheck. |
| Frontend shows network error | Check `VITE_API_URL`. Dev proxy is dev-only — in production set it to the backend URL. |
| CORS error in production | Set `CORS_ORIGINS` to the frontend's Railway URL. |
| Build fails for PHP worker | Ensure `libpq-dev`, `libzip-dev` are installed. See `Dockerfile.php-worker` for full list. |
| Uploaded documents not processing | Worker needs `DATABASE_URL` and `BACKEND_URL` to download files. Check Railway env vars. |
| OCR returning empty | Worker container needs Tesseract 5+ installed. Check `tesseract --version` inside the container. |
| WhatsApp messages not sending | Set `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`. WhatsApp notifications are non-blocking — booking flow works without them. |
| Port already in use | Change host ports in `docker-compose.yml` (e.g. `"5174:5173"`). |
| "Could not find driver" (worker) | The PHP DSN format must be `pgsql:host=...` not `postgresql://...`. The worker auto-converts URL-style connection strings. |
