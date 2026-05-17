# OneStopShop-C2C

Monorepo for the OneStopShop C2C marketplace.

## Structure

- `frontend/` - Vite, React, React Router, Tailwind CSS, and the complete updated Figma-exported application.
- `backend/` - Plain PHP REST API scaffold using PDO for a future MySQL database.

## Running with Docker

Docker Compose runs the full OneStopShop stack: PostgreSQL, the Express API, and the Vite frontend. PostgreSQL runs entirely in a container, so you do not need Postgres installed locally.

### Prerequisites

- Docker Desktop installed and running.
- On Windows, use Docker Desktop with the WSL2 backend.
- `make` is optional. Every Makefile command below also shows the underlying Docker command.

### First run

Copy the root Compose variables:

```bash
cp .env.example .env
```

Edit `.env` and set a strong database password:

```env
POSTGRES_DB=onestopshop
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme_strong_password
```

Copy the backend app variables:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`. Make sure `DB_PASSWORD` matches `POSTGRES_PASSWORD` from the root `.env`, and set a strong `JWT_SECRET`:

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_NAME=onestopshop
DB_USER=postgres
DB_PASSWORD=changeme_strong_password
JWT_SECRET=generate_with_openssl_rand_base64_64
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the stack:

```bash
make up
```

Or run Docker Compose directly:

```bash
docker compose up --build
```

Visit:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:3000/api/health`

On startup, the backend waits for PostgreSQL, runs `backend/db/migrations/001_init.sql`, seeds the default admin account if needed, then starts the API.

Default admin credentials:

```text
email: admin@onestopshop.com
password: Admin1234!
role: superadmin
```

### Switching machines

On another desktop:

```bash
git pull
cp .env.example .env
cp backend/.env.example backend/.env
make up
```

Fill in `.env` and `backend/.env` before starting the stack.

### Connecting a database GUI

Use these settings in pgAdmin, DBeaver, TablePlus, or another PostgreSQL client:

```text
host: localhost
port: 5432
database: onestopshop
user: postgres
password: value from .env
```

### Common commands

```bash
make up             # docker compose up --build
make down           # docker compose down
make logs           # docker compose logs -f
make db-shell       # docker compose exec db psql -U postgres -d onestopshop
make backend-shell  # docker compose exec backend sh
make prod           # docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

Reset everything, including the PostgreSQL data volume:

```bash
make reset-db
```

`postgres_data` survives `docker compose down`, so your database persists across normal restarts. It is deleted only when you run `docker compose down -v`, including through `make reset-db`. Uploaded mechanic documents are stored in the `uploads_data` named volume and also survive normal restarts.

## Frontend

```bash
npm install
npm run dev
```

From the repo root, these scripts delegate into `frontend/`:

```bash
npm run dev
npm run build
npm run preview
```

Routes:

- `/`
- `/login`
- `/signup`
- `/driver/setup`
- `/driver/verify`
- `/mechanic/setup`
- `/mechanic/verify`
- `/mechanic/profile`
- `/mechanic/:id`
- `/find-mechanic`
- `/admin/dashboard`

See `frontend/ROUTES.md` for the full route map and navigation flow.

## Backend

PHP is not installed on this machine yet. Once PHP is available on PATH:

```bash
php -S localhost:8000 -t backend/public backend/public/index.php
```

Then visit:

```text
http://localhost:8000/api/health
```

Copy `.env.example` to `.env` when you are ready to connect MySQL.

## Express/PostgreSQL API update

The production API now lives in `backend/` as a Node.js, Express, and PostgreSQL service. The PHP scaffold is still present, but the Node entrypoint is:

```bash
npm --prefix backend run dev
```

### Install dependencies

```bash
npm --prefix backend install express bcrypt jsonwebtoken pg express-validator dotenv helmet cors express-rate-limit winston multer
npm --prefix backend install -D nodemon
npm --prefix frontend install axios
```

### Environment variables

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onestopshop
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_POOL_MAX=10
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```

Create `frontend/.env` when needed:

```env
VITE_API_URL=http://localhost:3000/api
```

### Database migration

Create the PostgreSQL database first if it does not exist:

```bash
createdb -h localhost -p 5432 -U postgres onestopshop
```

Run the migration:

```bash
psql -h localhost -p 5432 -U postgres -d onestopshop -f backend/db/migrations/001_init.sql
```

### Seed the superadmin

```bash
npm --prefix backend run seed:admin
```

Default credentials:

```text
email: admin@onestopshop.com
password: Admin1234!
role: superadmin
```

### Phase curl checks

Health:

```bash
curl http://localhost:3000/api/health
```

Auth validation and signup:

```bash
curl -X POST http://localhost:3000/api/auth/signup/user \
  -H "Content-Type: application/json" \
  -d "{\"first_name\":\"Avery\",\"last_name\":\"Johnson\",\"email\":\"avery@example.com\",\"password\":\"Password123!\",\"phone_number\":\"+27123456789\"}"
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"avery@example.com\",\"password\":\"Password123!\"}"
```

Create a vehicle:

```bash
curl -X POST http://localhost:3000/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d "{\"make\":\"Toyota\",\"model\":\"Corolla\",\"year_produced\":2018,\"license_plate\":\"CA123456\"}"
```

Create a booking:

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d "{\"mechanicId\":2,\"vehicleId\":1,\"description\":\"Brake inspection\",\"preferredSchedule\":\"2026-05-20T10:00:00.000Z\"}"
```

Mechanic WhatsApp profile:

```bash
curl http://localhost:3000/api/mechanics/2/profile
```

Upload a verification document:

```bash
curl -X POST http://localhost:3000/api/mechanics/documents \
  -H "Authorization: Bearer MECHANIC_TOKEN" \
  -F "doc_type=id" \
  -F "document=@./id-document.pdf"
```

Approve or reject verification documents:

```bash
curl -X GET http://localhost:3000/api/admin/documents \
  -H "Authorization: Bearer ADMIN_TOKEN"

curl -X PATCH http://localhost:3000/api/admin/documents/1/approve \
  -H "Authorization: Bearer ADMIN_TOKEN"

curl -X PATCH http://localhost:3000/api/admin/documents/1/reject \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

Admin analytics:

```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

Notifications:

```bash
curl -X GET http://localhost:3000/api/notifications \
  -H "Authorization: Bearer USER_OR_MECHANIC_TOKEN"

curl -X PATCH http://localhost:3000/api/notifications/1/read \
  -H "Authorization: Bearer USER_OR_MECHANIC_TOKEN"
```

Frontend API build check:

```bash
npm --prefix frontend run build
```

## Troubleshooting

### Port already in use

If `3000`, `5173`, or `5432` is already in use, stop the local service using that port or change the host-side port in `docker-compose.yml`. For example, change `"5173:5173"` to `"5174:5173"` and visit `http://localhost:5174`.

### DB connection refused on startup

The `db` service has a healthcheck and the backend has an entrypoint wait loop. This prevents the backend from running migrations before PostgreSQL is ready. If you still see connection errors, check that `POSTGRES_PASSWORD` in `.env` matches `DB_PASSWORD` in `backend/.env`, then restart with `docker compose up --build`.

### node_modules conflicts between host and container

The Compose file mounts `/app/node_modules` as an anonymous volume for both Node services. This keeps container-installed Linux dependencies separate from host dependencies, which avoids native package and operating-system conflicts while still allowing source hot-reload through the bind mounts.

### Windows WSL2 hot-reload not working

The Compose file sets `CHOKIDAR_USEPOLLING=true` for the backend and frontend. If file changes still do not trigger reloads, keep the repo inside the WSL2 filesystem rather than a mounted Windows path, then restart the stack with `docker compose up --build`.
