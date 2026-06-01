# Phase 4: Full-Stack Security & Bug Audit

**Date:** 2026-06-01
**Branch:** Phase 3 dependent (will branch from `master` after Phase 3)
**Target:** `master`

> **Scope:** This is a living document. As Phase 3 uncovers additional issues, they should be added here. Phase 4 execution begins after Phase 3 ships.

---

## Overview

Systematic security and correctness audit of the entire codebase — frontend (React/TypeScript), API layer, backend (Express.js), database schema, and deployment configuration. 50+ source files reviewed across three parallel audit streams.

---

## Audit Methodology

Each layer was audited independently by parallel subagents:

| Stream | Scope | Files Examined |
|--------|-------|---------------|
| **Frontend** | Components, routes, auth guards, API client, state management, security | 25+ `.tsx`/`.ts` files |
| **Backend** | Routes, controllers, services, middleware, auth, payment flow | 30+ `.js` files |
| **Database** | Migration, schema constraints, indexes, data integrity, DO block semantics | `001_init.sql`, `pool.js`, config |

---

## 🔴 CRITICAL (Fix Immediately)

### C1 — Migration Copies Wrong IDs Into FK Columns

**Location:** `backend/db/migrations/001_init.sql` — DO $$ block (lines 206, 226, 246, 283)

**Problem:** The DO block copies old `mechanic_id` (a BIGINT pointing to `accounts.id`) directly into new columns (`service_provider_id`, `provider_id`) that expect an INT pointing to `service_provider_profiles.id`. These are different entities with different ID spaces.

**Affected tables:**
| Line | Table | Old Column | New Column | Type Mismatch |
|------|-------|-----------|------------|---------------|
| 206 | bookings | mechanic_id (BIGINT → accounts) | service_provider_id (INT → profiles) | BIGINT → INT + different entity |
| 226 | mechanic_availability | mechanic_id (BIGINT → accounts) | provider_id (INT → profiles) | BIGINT → INT + different entity |
| 246 | mechanic_documents | mechanic_id (BIGINT → accounts) | provider_id (INT → profiles) | BIGINT → INT + different entity |
| 283 | reviews | mechanic_id (BIGINT → accounts) | service_provider_id (INT → profiles) | BIGINT → INT + different entity |

**Impact:** All FK relationships are silently broken. Queries across bookings, availability, documents, and reviews return empty or wrong results.

**Fix:** Need a mapping from `accounts.id` → `service_provider_profiles.id` to translate mechanic IDs to provider profile IDs during migration.

---

### C2 — PayFast ITN Webhook Has No Signature Validation

**Location:** `backend/services/paymentService.js:93-138`, `backend/controllers/paymentController.js:12-22`

**Problem:** The ITN callback handler accepts `req.body.payment_status`, `m_payment_id`, and `pf_payment_id` without verifying the PayFast signature. PayFast sends a `signature` parameter computed from the merchant passphrase + all fields. Anyone can POST to `/api/payments/itn` with `payment_status=COMPLETE` and bypass payment entirely.

**Fix:** Implement PayFast ITN signature validation before processing any status update.

---

### C3 — PayFast Merchant Keys Collected from Frontend

**Location:** `frontend/src/imports/MechanicProfileSetup/MechanicProfileSetup.tsx:111-112`

**Problem:** Provider merchant IDs and keys (`payfast_merchant_id`, `payfast_merchant_key`) are sent from the browser as plaintext form fields. Anyone can inspect network requests and capture financial credentials.

**Fix:** Remove these fields from the frontend form. Configure merchant credentials server-side only (per-provider in admin panel or via encrypted env vars).

---

### C4 — Admin Dashboard `listPayments` Import Missing

**Location:** 
- `frontend/src/imports/PlatformAdminDashboard/PlatformAdminDashboard.tsx:28` — imports `listPayments`
- `frontend/src/api/admin.js` — **does not export** `listPayments`

**Problem:** The admin dashboard will crash with `undefined is not a function` at runtime.

**Fix:** Either implement `listPayments` in `admin.js` or remove the import from the dashboard component.

---

### C5 — Hardcoded Admin Credentials in Seed Script

**Location:** `backend/scripts/seedAdmin.js:7-20`

```js
{ email: 'sByrneAdmin@gmail.com', password: 'bestLecturer4eva!', role: 'superadmin' }
{ email: 'sByrne@gmail.com', password: 'bestLecturer4always!' }
```

**Impact:** Plain-text passwords committed to version control. Anyone with repo access can compromise the superadmin account. Weak passwords (dictionary words + common substitutions).

**Fix:** Remove passwords from code. Read from environment variables or a vault. Force password reset on first production deploy.

---

### C6 — JWT Secret Falls Back to Guessable String

**Location:** `backend/config/index.js:8`

```js
secret: process.env.JWT_SECRET || 'change_this_secret_in_env',
```

**Impact:** If `JWT_SECRET` isn't set in Railway, anyone who reads the source code can forge valid JWTs for any account.

**Fix:** Make `JWT_SECRET` required in production — crash on startup if unset rather than falling back.

---

### C7 — `mechanic_availability.provider_id` Missing `NOT NULL`

**Location:** `backend/db/migrations/001_init.sql:76`

```sql
provider_id INT REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
```

**Problem:** On fresh table creation, the column is nullable. The DO block only applies `SET NOT NULL` for migration paths, not new tables.

**Fix:** Add `NOT NULL` to the column definition in `CREATE TABLE`.

---

## 🟠 HIGH (Fix in Phase 4)

### H1 — No Rate Limiting on Non-Auth Endpoints

**Location:** `backend/server.js:41-58`

Only `/api/auth` has rate limiting. All other routes (`/api/bookings`, `/api/vehicles`, `/api/mechanics`, `/api/reviews`, `/api/payments`, `/api/admin`) are unprotected.

**Impact:** Brute-force IDOR scanning, DoS via expensive queries (haversine proximity), credential stuffing on admin login.

**Fix:** Apply rate limiting middleware to all API routes, with tiered limits (stricter on mutation endpoints).

---

### H2 — Public Uploads Directory

**Location:** `backend/server.js:39`

```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

**Impact:** Mechanic documents (IDs, certifications, proof of residence) stored at `/uploads/documents/{filename}` are publicly accessible without any authentication.

**Fix:** Add authentication middleware to the uploads static route, or serve uploads through a controller with access control.

---

### H3 — File Upload: Extension-Only Filter

**Location:** `backend/middleware/upload.js:8,20-28`

Only `path.extname()` is checked — no MIME type verification. An attacker can upload a `.pdf` that is actually an executable.

**Fix:** Add MIME type validation. Reject files whose magic bytes don't match their extension.

---

### H4 — Fixed Pricing (100 ZAR Flat)

**Location:** `backend/services/paymentService.js:42`

```js
const amount = '100.00';
```

**Impact:** Every booking costs exactly R100 regardless of service scope. A tire change and an engine rebuild are priced identically.

**Fix:** Implement a pricing model (per-service, per-vehicle-type, or provider-set pricing).

---

### H5 — Provider PayFast Credentials Stored in Plaintext

**Location:** `backend/config/index.js:29-31`, `backend/services/mechanicService.js:266-267`

Merchant IDs and keys are stored unencrypted in the database and accepted unvalidated from user input.

**Fix:** Encrypt at rest. Never expose in API responses. Consider server-managed credentials instead of per-provider.

---

### H6 — Express 5.x (Pre-release Framework)

**Location:** `backend/package.json:17`

```json
"express": "^5.2.1"
```

Express 5 is still in beta with known breaking changes from 4.x (middleware signatures, error handling, async behavior).

**Fix:** Pin to Express 4 stable if behavioral issues appear. Test thoroughly before production.

---

### H7 — SSL Certificate Validation Disabled

**Location:** `backend/config/index.js:13`

```js
ssl: { rejectUnauthorized: false }
```

**Impact:** MITM-vulnerable database connection in production.

**Fix:** Enable `rejectUnauthorized: true` and configure proper CA certificates, or rely on Railway's built-in SSL.

---

### H8 — Migration `SET NOT NULL` Can Fail on Upgrade

**Location:** `backend/db/migrations/001_init.sql:159-211`

The migration pattern: (1) ADD COLUMN (nullable), (2) UPDATE old→new, (3) SET NOT NULL. Step 3 fails if existing rows exist AND the old column doesn't exist (so no UPDATE ran).

**Fix:** Use `ALTER COLUMN ... SET NOT NULL` with a default value, or use `COALESCE` in the UPDATE. Wrap in exception handler for idempotency.

---

## 🟡 MEDIUM (Fix in Phase 4)

### M1 — JWT Stored in localStorage (XSS Vector)

**Files:** `frontend/src/api/client.js:44`, `frontend/src/lib/authGuard.ts:18`, login/signup components

Token key is `oss_token`. User data key is `oss_user`. Any XSS vulnerability allows full account takeover.

**Fix:** Consider httpOnly cookies or at minimum add CSP headers and sanitize all user-rendered content.

---

### M2 — Admin Login Fallback in User Login

**File:** `frontend/src/imports/Login/Login.tsx:84-98`

If user login fails (any error), the code automatically tries admin login with the same credentials. This:
- Hides real backend errors (500, network timeout)
- Doubles latency on failure
- Shows admin-specific errors to regular users

**Fix:** Separate user and admin login flows. Show the actual error from the first attempt.

---

### M3 — Hardcoded ngrok Domain in Vite Config

**File:** `frontend/vite.config.js:11`

```js
allowedHosts: ['jennefer-stoniest-pseudocubically.ngrok-free.dev'],
```

**Impact:** Developer's personal ngrok tunnel hardcoded into production build config. Security risk if subdomain is compromised.

**Fix:** Remove from production config. Use environment variable for dev overrides.

---

### M4 — Client-Side Admin Role Bypass

**File:** `frontend/src/lib/authGuard.ts:34-47`

```js
const user = JSON.parse(localStorage.getItem('oss_user'));
// checks user.role === 'admin'
```

**Impact:** Any user can edit localStorage to set `role: 'admin'` and access admin UI routes. Backend authorization is maintained, but the UI guard is trivially bypassable.

**Fix:** Validate the JWT token client-side (decode and check role from payload) rather than reading localStorage.

---

### M5 — `searchMechanics` Sends Broken Query Parameters

**File:** `frontend/src/api/mechanics.js:15-18`

```js
client.get('/mechanics/search', { params: { query } })
```

`query` is a raw object — serializes as `query=%5Bobject+Object%5D` instead of individual params. Search is completely broken.

**Fix:** Pass `params` directly instead of wrapping in a `query` key.

---

### M6 — No Booking Status State Machine

**File:** `backend/services/bookingService.js:201-276`

The service accepts any status transition — providers can move from `payment_pending` directly to `completed`, or from `cancelled` back to `in_progress`.

**Fix:** Implement a state machine that defines valid transitions:

```
payment_pending → paid → whatsapp_redirected → in_progress → completed
                                                              → cancelled
                                                              → refunded
```

---

### M7 — Missing Indexes on Frequently Queried Columns

**File:** `backend/db/migrations/001_init.sql` (index section)

| Column | Used In | Impact |
|--------|---------|--------|
| `reviews.reviewer_user_id` | `getUserReviews()` WHERE clause | Table scan on user review lookup |
| `mechanic_documents.provider_id` | `listPendingDocuments()` JOIN | Slow admin document verification |
| `service_provider_profiles.lat, lng` | `findNearby()` ORDER BY + WHERE | Slow proximity queries |

**Fix:** Add missing indexes.

---

### M8 — Vehicle fuel_type and transmission Have No CHECK Constraints

**File:** `backend/db/migrations/001_init.sql:122-123`

Free-text VARCHAR(50) fields. 'Gasoline', 'Petrol', 'petrol', 'gAsOLiNe' all accepted.

**Fix:** Add CHECK constraints with canonical values, or use a lookup table.

---

### M9 — Notifications Table Has No FK on recipient_id

**File:** `backend/db/migrations/001_init.sql:338-345`

```sql
recipient_id BIGINT NOT NULL,
recipient_type VARCHAR(20) NOT NULL CHECK (...)
```

No `REFERENCES` constraint. Orphaned notifications accumulate after account deletion.

**Fix:** This is a polymorphic FK — either use separate columns per type or add a trigger-based enforcement.

---

### M10 — `page_visits.ip` Uses TEXT Instead of INET

**File:** `backend/db/migrations/001_init.sql:353`

```sql
ip TEXT,
```

Invalid IP strings like 'banana' are accepted. Should be `INET` or `VARCHAR(45)`.

**Fix:** Change column type to `INET`.

---

### M11 — Payments Missing `updated_at` + Currency CHECK

**File:** `backend/db/migrations/001_init.sql:308-320`

No `updated_at` column — payment status changes aren't timestamped. Currency column has no CHECK constraint.

**Fix:** Add `updated_at TIMESTAMPTZ` + currency CHECK.

---

### M12 — Admin Usernames Not Unique

**File:** `backend/db/migrations/001_init.sql:88`

```sql
username VARCHAR(120) NOT NULL,
```

Two admins can share a username.

**Fix:** Add `UNIQUE` constraint.

---

### M13 — Empty catch Blocks Swallowing Errors

**Files:**
- `frontend/src/imports/Login/Login.tsx:84` — completely empty `catch {}`
- `frontend/src/imports/MechProfileFullView/MechProfileFullView.tsx:137` — `catch { if (!ignore) setVehicles([]); }`
- `frontend/src/imports/MyVehicles/MyVehicles.tsx:51` — `catch { setStatus(...) }` without surfacing error

**Fix:** Log errors, show user-facing error messages, or at minimum surface to console.

---

### M14 — `checkPaymentStatus` Function Never Called

**File:** `frontend/src/imports/MechProfileFullView/MechProfileFullView.tsx:195-207`

The function is defined but never triggered. Users who return from PayFast redirect have no way to check their payment status — no button renders, no auto-check.

**Fix:** Wire `checkPaymentStatus` into the component lifecycle or a user-triggerable action after PayFast return.

---

## 🔵 LOW (Nice-to-Have)

### L1 — Stale Column Reference in Admin Logs
**File:** `backend/services/adminService.js:171`
Logs `mechanic_id` — renamed to `provider_id` in migration. Always logs `undefined`.

### L2 — Commented-Out Bootstrap Code
**File:** `backend/server.js:74-99`
48 lines of dead code. Includes `execSync` on `DATABASE_URL` — would be a command injection vector if uncommented.

### L3 — No HTTPS Redirect Middleware
**File:** `backend/server.js`
Fine behind Railway's proxy, but missing if deployed directly without a reverse proxy.

### L4 — No `.env.example` in Frontend
**File:** `frontend/`
Developers can't discover `VITE_API_URL` without checking source code.

### L5 — `users` Table Appears Redundant
**File:** `backend/db/migrations/001_init.sql:25-28`
Only distinguishes regular users from providers. `service_provider_profiles.account_id IS NULL` would suffice.

### L6 — `profile_photo_url` TEXT Should Be VARCHAR(2048)
**File:** `backend/db/migrations/001_init.sql:15`
TEXT for URLs is unnecessarily permissive.

### L7 — Aggressive Booking FK Cascades
**File:** `backend/db/migrations/001_init.sql:133-135`
All booking FKs use `ON DELETE CASCADE`. Deleting an account or vehicle silently wipes bookings, payments, and reviews.

### L8 — `sanitize.js` Only Strips `password_hash`
**File:** `backend/utils/sanitize.js`
PayFast keys, phone numbers, emails all exposed in API responses.

---

## Findings Summary

| Severity | Count | Key Themes |
|----------|:-----:|------------|
| 🔴 Critical | 7 | Migration data corruption, payment bypass, exposed credentials |
| 🟠 High | 8 | Missing rate limits, public uploads, weak crypto, pre-release framework |
| 🟡 Medium | 14 | XSS vectors, broken search, state machine gaps, missing indexes |
| 🔵 Low | 8 | Stale references, aggressive cascades, redundant tables |

---

## Suggested Fix Order

1. **Phase 4.1 — Data Integrity** (C1, C7, H8, M7, M11, M12)
2. **Phase 4.2 — Payment Security** (C2, C3, H5)
3. **Phase 4.3 — Authentication** (C5, C6, M1, M4, M2)
4. **Phase 4.4 — API Security** (H1, H2, H3, H7)
5. **Phase 4.5 — Business Logic** (H4, M5, M6, M14)
6. **Phase 4.6 — Code Quality** (C4, M3, M8, M9, M10, M13, M8, L1-L8)

---

## Note

This Phase 4 document will be updated as Phase 3 development uncovers additional issues. All findings so far are observational — no code was modified during the audit.
