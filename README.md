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
