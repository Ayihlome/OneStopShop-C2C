# Phase 2: PHP Auth Sidecar (Backend Revamp)

> **For Hermes:** Execute task-by-task using subagent-driven-development.

**Goal:** Add a PHP-FPM sidecar service that validates JWT tokens from Node's sensitive write routes, giving PHP a real role without replacing Node.

**Architecture:** PHP-FPM handles token validation behind Nginx (port 8080). Node calls PHP via HTTP from a new `phpAuthCheck` middleware inserted after the existing `authenticate` middleware on sensitive write routes. PHP validates the JWT, checks DB for account status, returns ok/error. No Composer, no TypeScript.

**Tech Stack:** PHP 8.3 (FPM Alpine), Nginx Alpine, Node.js Express, PostgreSQL 16

**Branch:** `backend-revamp` (from `master` after merging PR #1)

**Global Rule:** No TypeScript — rewrite any `.tsx` you touch to `.jsx`/`.js`.

---

## Pre-Flight Check

### PR #1 is still open

PR #1 (`phase-1/apply-new-theme` → `master`) is **open, not merged**. Mav said "Can you merge the previous branch and start phase 2 on a new branch called backend revamp." So:

1. First merge PR #1 into master locally
2. Push master
3. Create `backend-revamp` from master

---

## Task 1: Merge PR #1 and create `backend-revamp` branch

**Objective:** Merge the 3 phase-1 commits into master, push, start the phase-2 branch.

**Files:** None (git operations)

**Step 1: Merge phase-1 into master**

```bash
cd /data/projects/OneStopShop-C2C
git checkout master
git merge phase-1/apply-new-theme
```

Expected: Fast-forward merge, bringing in commits `e1d23bd`, `861c312`, `7163afa`.

**Step 2: Push master**

```bash
git push origin master
```

**Step 3: Close PR #1 via API** (now that commits are merged)

```bash
# Use GitHub API to close PR #1
TOKEN=$(python3 -c "import subprocess; url=subprocess.run(['git','config','remote.origin.url'],capture_output=True,text=True).stdout.strip(); print(url.split('https://Ayihlome:')[1].split('@github.com')[0])")
curl -s -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"state":"closed"}' \
  "https://api.github.com/repos/Ayihlome/OneStopShop-C2C/pulls/1"
```

**Step 4: Create `backend-revamp` branch**

```bash
git checkout master
git checkout -b backend-revamp
git push origin backend-revamp
```

**Step 5: Commit**

```bash
# No commit needed for branch creation
```

---

## Task 2: Create `php-auth/` directory and PHP application files

**Objective:** Create the PHP-FPM application with TokenController, entry point, and copy existing utility classes.

**Files:**
- Create: `php-auth/Response.php` (copy from `backend/utils/Response.php`)
- Create: `php-auth/Router.php` (copy from `backend/utils/Router.php`)
- Create: `php-auth/TokenController.php`
- Create: `php-auth/index.php`

### Step 2a: Copy `php-auth/Response.php`

Copy verbatim from `backend/utils/Response.php`:
```php
<?php

declare(strict_types=1);

class Response
{
    public static function json(array $payload, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
```

### Step 2b: Copy `php-auth/Router.php`

Copy verbatim from `backend/utils/Router.php`:
```php
<?php

declare(strict_types=1);

class Router
{
    private array $routes = [];

    public function get(string $path, array $handler, array $params = []): void
    {
        $this->routes['GET'][$this->normalize($path)] = [
            'handler' => $handler,
            'params' => $params,
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = $this->normalize(parse_url($uri, PHP_URL_PATH) ?: '/');
        $route = $this->routes[$method][$path] ?? null;

        if ($route === null) {
            Response::json([
                'error' => 'Not Found',
                'path' => $path,
            ], 404);
        }

        [$class, $action] = $route['handler'];
        $controller = new $class();
        if ($route['params'] === []) {
            $controller->{$action}();
            return;
        }

        $controller->{$action}($route['params']);
    }

    private function normalize(string $path): string
    {
        $path = '/' . trim($path, '/');
        return $path === '//' ? '/' : $path;
    }
}
```

### Step 2c: Create `php-auth/TokenController.php`

```php
<?php

declare(strict_types=1);

class TokenController
{
    public function validate(): void
    {
        // 1. Read Authorization header
        $authHeader = $_SERVER['HTTP_AUTHORIZATION']
            ?? ($_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null);

        if (!$authHeader) {
            // Fallback for Apache-style headers
            if (function_exists('apache_request_headers')) {
                $headers = apache_request_headers();
                $authHeader = $headers['Authorization'] ?? null;
            }
        }

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            Response::json(['error' => 'Token missing'], 401);
            return;
        }

        $token = substr($authHeader, 7);

        // 2. Manually decode JWT (no Composer)
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            Response::json(['error' => 'Invalid token'], 401);
            return;
        }

        [$headerB64, $payloadB64, $signatureB64] = $parts;

        $payload = json_decode(
            base64_decode(strtr($payloadB64, '-_', '+/'), true),
            true
        );

        if (!$payload || !isset($payload['id'], $payload['email'], $payload['role'])) {
            Response::json(['error' => 'Invalid token payload'], 401);
            return;
        }

        // 3. Verify signature
        $secret = getenv('JWT_SECRET');
        $expectedSig = hash_hmac(
            'sha256',
            "$headerB64.$payloadB64",
            $secret,
            true
        );
        $actualSig = base64_decode(strtr($signatureB64, '-_', '+/'), true);

        if (!$actualSig || !hash_equals($expectedSig, $actualSig)) {
            Response::json(['error' => 'Invalid token'], 401);
            return;
        }

        // 4. Query Postgres for account status
        $dsn = getenv('DATABASE_URL');
        if (!$dsn) {
            Response::json(['error' => 'Server configuration error'], 500);
            return;
        }

        $conn = pg_connect($dsn);
        if (!$conn) {
            Response::json(['error' => 'Database connection failed'], 503);
            return;
        }

        $id = (int) $payload['id'];
        $result = pg_query_params(
            $conn,
            'SELECT status FROM accounts WHERE id = $1',
            [$id]
        );

        if (!$result || pg_num_rows($result) === 0) {
            pg_close($conn);
            Response::json(['error' => 'Account not found'], 404);
            return;
        }

        $row = pg_fetch_assoc($result);
        pg_close($conn);

        if ($row['status'] !== 'active') {
            Response::json(['error' => 'Account suspended'], 403);
            return;
        }

        // 5. Success
        Response::json([
            'ok' => true,
            'id' => $payload['id'],
            'role' => $payload['role'],
        ], 200);
    }
}
```

### Step 2d: Create `php-auth/index.php`

```php
<?php

declare(strict_types=1);

require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Router.php';
require_once __DIR__ . '/TokenController.php';

$router = new Router();
$router->get('/validate-token', [TokenController::class, 'validate']);
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
```

### Step 2e: Verify files exist

```bash
ls -la php-auth/
```

Expected output:
```
-rw-r--r--  index.php
-rw-r--r--  TokenController.php
-rw-r--r--  Response.php
-rw-r--r--  Router.php
```

### Step 2f: Commit

```bash
git add php-auth/
git commit -m "feat: add PHP auth sidecar with JWT validation endpoint"
```

---

## Task 3: Create Dockerfile and Nginx config for PHP service

**Objective:** Containerize the PHP app with FPM and Nginx.

**Files:**
- Create: `php-auth/Dockerfile`
- Create: `php-auth/nginx.conf`

### Step 3a: Create `php-auth/Dockerfile`

```dockerfile
FROM php:8.3-fpm-alpine

RUN docker-php-ext-install pgsql

COPY . /var/www/html/

EXPOSE 9000

CMD ["php-fpm"]
```

### Step 3b: Create `php-auth/nginx.conf`

```nginx
server {
    listen 8080;
    server_name _;

    root /var/www/html;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME /var/www/html/index.php;
        include fastcgi_params;
    }
}
```

Note: `fastcgi_pass php:9000` — the Docker service name is `php`, and FPM listens on port 9000 by default. All PHP requests get routed to the single `index.php` entry point.

### Step 3c: Commit

```bash
git add php-auth/Dockerfile php-auth/nginx.conf
git commit -m "feat: add Dockerfile and nginx config for PHP-FPM sidecar"
```

---

## Task 4: Add PHP services to docker-compose.yml

**Objective:** Add `php` and `php-auth` services to the Docker composition.

**Files:**
- Modify: `docker-compose.yml`

### Step 4a: Add `php` and `php-auth` services

Add after the `frontend` service block (before `volumes:`):

```yaml
  php:
    build:
      context: ./php-auth
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  php-auth:
    image: nginx:alpine
    ports:
      - "8080:8080"
    volumes:
      - ./php-auth/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php
    restart: unless-stopped
```

### Step 4b: Add `php-auth` to backend's `depends_on`

Update the `backend` service's `depends_on` to include `php-auth`:

```yaml
    depends_on:
      db:
        condition: service_healthy
      php-auth:
        condition: service_started
```

### Step 4c: Commit

```bash
git add docker-compose.yml
git commit -m "feat: add PHP-FPM and Nginx auth sidecar services to docker-compose"
```

---

## Task 5: Create phpAuthCheck middleware

**Objective:** Node middleware that delegates token validation to the PHP sidecar.

**Files:**
- Create: `backend/middleware/phpAuthCheck.js`

### Step 5a: Create the middleware

```javascript
const http = require('http');

function phpAuthCheck(req, res, next) {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const options = {
    hostname: 'php-auth',
    port: 8080,
    path: '/validate-token',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  const phpReq = http.request(options, (phpRes) => {
    let body = '';
    phpRes.on('data', (chunk) => { body += chunk; });
    phpRes.on('end', () => {
      if (phpRes.statusCode === 200) return next();
      try {
        return res.status(phpRes.statusCode).json(JSON.parse(body));
      } catch {
        return res.status(phpRes.statusCode).json({ error: 'Auth check failed' });
      }
    });
  });

  phpReq.on('error', () => res.status(503).json({ error: 'Auth service unavailable' }));
  phpReq.end();
}

module.exports = phpAuthCheck;
```

### Step 5b: Verify

```bash
node -c backend/middleware/phpAuthCheck.js
```

Expected: No output (syntax is valid).

### Step 5c: Commit

```bash
git add backend/middleware/phpAuthCheck.js
git commit -m "feat: add phpAuthCheck middleware that delegates token validation to PHP sidecar"
```

---

## Task 6: Apply phpAuthCheck to sensitive routes

**Objective:** Insert `phpAuthCheck` after `authenticate` and before `requireRole` on sensitive write routes.

**Files:**
- Modify: `backend/routes/bookings.js`
- Modify: `backend/routes/mechanics.js`

### Step 6a: Update `backend/routes/bookings.js`

1. Import `phpAuthCheck` at the top:
```javascript
const phpAuthCheck = require('../middleware/phpAuthCheck');
```

2. On `POST /` route, insert `phpAuthCheck` between `authenticate` and `requireRole('user')`:
```javascript
router.post(
  '/',
  authenticate,
  phpAuthCheck,
  requireRole('user'),
  // ... validators, validate, controller
);
```

3. On `PATCH /:id/status` route, add `phpAuthCheck` after `authenticate`:
```javascript
router.patch(
  '/:id/status',
  authenticate,
  phpAuthCheck,
  // ... validators, validate, controller
);
```

### Step 6b: Update `backend/routes/mechanics.js`

1. Import `phpAuthCheck` at the top:
```javascript
const phpAuthCheck = require('../middleware/phpAuthCheck');
```

2. On `POST /documents` route, insert `phpAuthCheck` between `authenticate` and `requireRole('mechanic')`:
```javascript
router.post(
  '/documents',
  authenticate,
  phpAuthCheck,
  requireRole('mechanic'),
  // ... upload, validators, validate, controller
);
```

### Step 6c: Verify syntax

```bash
node -c backend/routes/bookings.js
node -c backend/routes/mechanics.js
```

### Step 6d: Commit

```bash
git add backend/routes/bookings.js backend/routes/mechanics.js
git commit -m "feat: apply phpAuthCheck middleware to sensitive write routes"
```

---

## Task 7: Environment variables update

**Objective:** Ensure `DATABASE_URL` and `JWT_SECRET` are documented and available to all services.

**Files:**
- Modify: `backend/.env.example`
- Modify: `.env.example` (root)

### Step 7a: Update `backend/.env.example`

Add `DATABASE_URL` entry:
```
DATABASE_URL=postgresql://postgres:changeme_strong_password@db:5432/onestopshop
```

(This is the connection string format PHP's `pg_connect` expects, composed from the existing vars.)

### Step 7b: Update root `.env.example`

Add `DATABASE_URL` and `JWT_SECRET`:
```
DATABASE_URL=postgresql://postgres:changeme_strong_password@db:5432/onestopshop
JWT_SECRET=generate_with_openssl_rand_base64_64
```

### Step 7c: Create/update root `.env` (for docker-compose variable resolution)

Check if root `.env` has `DATABASE_URL` and `JWT_SECRET`. If not, add them (using existing values from `backend/.env`).

```bash
# Check current root .env
cat .env 2>/dev/null || echo "No root .env"
```

### Step 7d: Commit

```bash
git add backend/.env.example .env.example .env
git commit -m "docs: add DATABASE_URL and JWT_SECRET to env examples"
```

---

## Task 8: Push branch and verify build

**Objective:** Push `backend-revamp` to GitHub and verify Docker Compose builds.

### Step 8a: Push

```bash
git push origin backend-revamp
```

### Step 8b: Verify Docker build

```bash
docker compose build php
docker compose build php-auth
```

Expected: Both images build without errors.

### Step 8c: Open PR

```bash
# Open PR via GitHub API
TOKEN=$(python3 -c "import subprocess; url=subprocess.run(['git','config','remote.origin.url'],capture_output=True,text=True).stdout.strip(); print(url.split('https://Ayihlome:')[1].split('@github.com')[0])")
curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"title":"feat: add PHP auth sidecar (Phase 2 - Backend Revamp)","head":"backend-revamp","base":"master","body":"## What\n\nAdds a PHP-FPM sidecar service for JWT token validation on sensitive write routes.\n\n## Changes\n\n- **php-auth/**: New PHP app with TokenController, Response, Router\n- **Dockerfile + nginx.conf**: PHP-FPM Alpine container behind Nginx\n- **docker-compose.yml**: Added `php` (FPM) and `php-auth` (Nginx) services\n- **phpAuthCheck.js**: Node middleware that calls PHP for token validation\n- **Routes**: Applied phpAuthCheck to POST /bookings, PATCH /bookings/:id/status, POST /mechanics/:id/documents\n- **Env docs**: Added DATABASE_URL and JWT_SECRET to .env.example files\n\n## Architecture\n\nNode authenticate middleware → phpAuthCheck middleware → PHP-FPM (port 8080) → validate JWT + check DB → return ok/error"}' \
  "https://api.github.com/repos/Ayihlome/OneStopShop-C2C/pulls"
```

---

## Summary of files created/modified

| File | Action | Purpose |
|------|--------|---------|
| `php-auth/index.php` | Create | Entry point, routes `/validate-token` to TokenController |
| `php-auth/TokenController.php` | Create | JWT validation logic (no Composer) |
| `php-auth/Response.php` | Create | Copy of existing `backend/utils/Response.php` |
| `php-auth/Router.php` | Create | Copy of existing `backend/utils/Router.php` |
| `php-auth/Dockerfile` | Create | PHP 8.3 FPM Alpine with pgsql extension |
| `php-auth/nginx.conf` | Create | Nginx config, port 8080, pass to FPM |
| `docker-compose.yml` | Modify | Add `php` and `php-auth` services; update `backend` depends_on |
| `backend/middleware/phpAuthCheck.js` | Create | Node middleware that calls PHP auth sidecar |
| `backend/routes/bookings.js` | Modify | Add phpAuthCheck to POST / and PATCH /:id/status |
| `backend/routes/mechanics.js` | Modify | Add phpAuthCheck to POST /documents |
| `backend/.env.example` | Modify | Add DATABASE_URL |
| `.env.example` | Modify | Add DATABASE_URL and JWT_SECRET |

## Verification

After all tasks complete:

1. `git log --oneline backend-revamp ^master` — should show ~7 commits
2. `docker compose config` — should show `php` and `php-auth` services
3. `docker compose build php php-auth` — should pass
4. PR #2 should be open on GitHub with all changes
