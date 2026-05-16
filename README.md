# OneStopShop-C2C

Monorepo for the OneStopShop C2C marketplace.

## Structure

- `frontend/` - Vite, React, React Router, Tailwind CSS, and the complete updated Figma-exported application.
- `backend/` - Plain PHP REST API scaffold using PDO for a future MySQL database.

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
