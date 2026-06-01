# Phase 2.5: Data Layer & Critical UX Bug Fixes

> **For Hermes:** Execute this plan using `subagent-driven-development` — dispatch a subagent per task with two-stage review.

**Goal:** Fix the migration data corruption and critical frontend bugs that prevent user registration data from being stored, retrieved, and displayed correctly. This is a functional requirement for Phase 3 to have a working foundation.

**Blocking Phase 3:** Without these fixes, provider registration data is silently corrupted, the mechanics feed crashes with "E.data.map", and user profiles show empty data. Phase 3's booking and payment flows depend on correct provider data.

**Root Cause Map:**
```
Migration DO block (C1)
  └── Copies accounts.id into provider-profile-ID columns
       ├── bookings.service_provider_id → wrong FK → no bookings found
       ├── mechanic_availability.provider_id → wrong FK → no availability
       ├── mechanic_documents.provider_id → wrong FK → docs not found
       └── reviews.service_provider_id → wrong FK → reviews broken

searchMechanics params (M5)
  └── Wraps filter object under single `query` key
       └── Serializes as query=[object Object]
            └── Backend gets empty object → empty results
                 └── Component crashes on E.data.map

MyVehicles not showing & profile not persisting
  └── Combination of C1 (wrong FKs) + frontend API call issues
```

**Files affected:**
- `backend/db/migrations/001_init.sql` — Fix DO block mapping
- `frontend/src/api/mechanics.js` — Fix search params
- `frontend/src/imports/FindYourMechanic/FindYourMechanic.tsx` — Handle edge case
- `frontend/src/imports/MyVehicles/MyVehicles.tsx` — Fix data rendering
- `frontend/src/imports/MyMechanicProfile/MyMechanicProfile.tsx` — Fix profile fetch

---

## Task 1: Fix Migration DO Block — Correct `mechanic_id` → Profile ID Mapping

**Objective:** Fix the 4 UPDATE statements in the DO block that incorrectly copy `mechanic_id` (accounts.id) directly into new columns that expect `service_provider_profiles.id`.

**Files:**
- Modify: `backend/db/migrations/001_init.sql:201-211` (bookings)
- Modify: `backend/db/migrations/001_init.sql:221-231` (mechanic_availability)
- Modify: `backend/db/migrations/001_init.sql:241-251` (mechanic_documents)
- Modify: `backend/db/migrations/001_init.sql:278-288` (reviews)

### The Bug (lines 206, 226, 246, 283)

All 4 UPDATEs look like:
```sql
UPDATE bookings SET service_provider_id = mechanic_id;
```

Where `mechanic_id` is a BIGINT FK to `accounts.id`, but `service_provider_id` is an INT FK to `service_provider_profiles.id`. These are semantically different entities with different ID spaces.

### The Fix

Replace each direct copy with a subquery that translates via `service_provider_profiles.account_id`:

```sql
-- bookings (line 206):
UPDATE bookings b SET service_provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = b.mechanic_id
);

-- mechanic_availability (line 226):
UPDATE mechanic_availability ma SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = ma.mechanic_id
);

-- mechanic_documents (line 246):
UPDATE mechanic_documents md SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = md.mechanic_id
);

-- reviews (line 283):
UPDATE reviews r SET service_provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = r.mechanic_id
);
```

### Edge Cases

1. **No matching provider profile**: If `mechanic_id` points to an account that has no `service_provider_profiles` row, the subquery returns NULL. The subsequent `ALTER COLUMN ... SET NOT NULL` will fail.

   **Fix:** Add `WHERE EXISTS` guard before the UPDATE, or use `COALESCE` with a default — but actually, the cleanest approach is to wrap the SET NOT NULL in an exception handler or skip it for rows that couldn't be mapped (log them instead).

   ```sql
   -- Safer pattern: only update rows that can be mapped
   UPDATE bookings b SET service_provider_id = (
     SELECT sp.id FROM service_provider_profiles sp
     WHERE sp.account_id = b.mechanic_id
   )
   WHERE EXISTS (
     SELECT 1 FROM service_provider_profiles sp
     WHERE sp.account_id = b.mechanic_id
   );
   
   -- For unmapped rows, log but don't crash
   IF EXISTS (
     SELECT 1 FROM bookings
     WHERE mechanic_id IS NOT NULL AND service_provider_id IS NULL
   ) THEN
     RAISE WARNING 'X bookings have mechanic_id but no matching provider profile — setting service_provider_id NULL';
     -- Don't SET NOT NULL for these rows
   ELSE
     ALTER TABLE bookings ALTER COLUMN service_provider_id SET NOT NULL;
   END IF;
   ```

2. **Old column doesn't exist**: The IF NOT EXISTS guards and IF EXISTS (old column) checks are already in place.

### Verify

```bash
# Test the new migration on a fresh DB
docker compose down -v
docker compose up -d db
# Wait for healthy, then:
docker compose run --rm backend npm run migrate
```

---

## Task 2: Add `NOT NULL` on `mechanic_availability.provider_id`

**Objective:** Fix C7 — the CREATE TABLE statement for `mechanic_availability` has a nullable `provider_id` column.

**Files:**
- Modify: `backend/db/migrations/001_init.sql:76`

### The Bug (line 76)

```sql
provider_id INT REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
```

Missing `NOT NULL`. Every availability slot must belong to a provider.

### The Fix

```sql
provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
```

---

## Task 3: Fix `searchMechanics` — Broken Query Parameters

**Objective:** Fix M5 — the `searchMechanics` frontend API call wraps the filter object under a single `query` key, serializing as `query=[object+Object]` instead of individual params. This causes the mechanics feed to return empty results, triggering the "E.data.map" crash.

**Files:**
- Modify: `frontend/src/api/mechanics.js:15-18`
- Verify: `frontend/src/imports/FindYourMechanic/FindYourMechanic.tsx:26` (import)

### The Bug (mechanics.js:15-18)

```javascript
export function searchMechanics(query) {
  return client.get('/mechanics/search', { params: { query } });
}
```

`query` is already an object `{ location, specialty }` but it's wrapped again under key `query`. Axios serializes this as `query=%5Bobject+Object%5D`.

### The Fix

Replace with direct param pass-through:

```javascript
export function searchMechanics(params = {}) {
  const query = {};
  if (params.location) query.location = params.location;
  if (params.specialty) query.specialty = params.specialty;
  return client.get('/mechanics/search', { params: query });
}
```

Or simpler:

```javascript
export function searchMechanics(params = {}) {
  return client.get('/mechanics/search', { params });
}
```

The backend `filterMechanics` service (mechanicService.js:120-151) already handles `filters.city` and `filters.specialty` — it reads individual keys from the filter object, so passing `params` directly is correct.

### Verify

Check that `filterMechanics` route handler (in mechanics route) passes the query params correctly to the service. Look for the route's `req.query` handling.

---

## Task 4: Fix Provider Profile Form Data Persistence

**Objective:** Fix the "submit provider form → data doesn't appear on My Provider Profile or Preview tab" bug. This is caused by C1 data corruption + the profile fetch using the wrong ID.

**Files:**
- Modify: `backend/db/migrations/001_init.sql` (already fixed in Task 1 — the root cause)
- Inspect: `frontend/src/imports/MyMechanicProfile/MyMechanicProfile.tsx:75`
- Inspect: `frontend/src/imports/MechanicProfileSetup/MechanicProfileSetup.tsx`

### Step 1: Verify the profile creation flow

The `becomeProvider(accountId, formData)` function in `frontend/src/api/mechanics.js` should call `POST /mechanics/become-provider` with the fields. On the backend, `createProviderProfile` (mechanicService.js:238+) inserts into `service_provider_profiles` with the correct `account_id`.

Check that:
- The backend controller for `become-provider` correctly maps `req.body` field names to what the service expects
- The `updateMechanic` service (for editing profile) correctly handles all fields including `specialities`, `business_name`, `service_description`, etc.

### Step 2: Fix MyMechanicProfile fetch

`MyMechanicProfile.tsx:75` calls `getMechanicProfile(user.id)` — but `user.id` might be the account ID or a different format. The backend's `getProfile(accountId)` queries `accounts WHERE a.id = $1`, so it needs the account ID.

Verify that `user.id` from the decoded JWT (or localStorage `oss_user`) is the correct `accounts.id`.

### Step 3: Add data-format normalization

Verify that the backend provider update endpoint (`PATCH /mechanics/:id`) returns the full updated profile, and the frontend correctly sets the local state from the response.

---

## Task 5: Fix MyVehicles List Not Rendering

**Objective:** Fix the "My Vehicles doesn't show registered vehicles" UX bug.

**Files:**
- Inspect & fix: `frontend/src/imports/MyVehicles/MyVehicles.tsx`
- Verify: `frontend/src/api/vehicles.js`

### Investigation

The `MyVehicles` component calls `listVehicles()` from `src/api/vehicles.js`. Check:
1. Does `listVehicles()` send the correct user ID or auth token? (It should use the JWT token from the interceptor.)
2. Does the backend `GET /vehicles` route use the authenticated user's ID from the token?
3. Does the response shape match what the component expects?

The backend route (vehicles route) should filter vehicles by `user_id = req.user.id` (from JWT auth middleware).

### Fix

If the API call is correct but data doesn't render, it's likely:
- Response shape mismatch (wrapped vs unwrapped)
- Empty/error catch silently swallowing the response
- Missing state update after data fetch

---

## Task 6: Data Repair for Existing Railway DB

**Objective:** Create a data repair migration that fixes the corrupted FK references on the existing Railway database that was already deployed with the wrong migration.

**Files:**
- Create: `backend/db/migrations/002_repair_provider_fks.sql`

### The Problem

On the existing Railway DB, the migration ran and copied `mechanic_id` (accounts.id) directly into `service_provider_id`/`provider_id` columns. All FK relationships across bookings, availability, documents, and reviews are pointing to wrong records.

### The Fix

Create a new migration that:
1. Finds all existing records where the provider-FK column points to an accounts.id instead of a profiles.id
2. Translates them using the `service_provider_profiles.account_id` mapping
3. Logs unmapped rows for manual review

```sql
-- 002_repair_provider_fks.sql
BEGIN;

-- Repair bookings.service_provider_id
UPDATE bookings b SET service_provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = b.service_provider_id
)
WHERE b.service_provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = b.service_provider_id
  );

-- Repair mechanic_availability.provider_id
UPDATE mechanic_availability ma SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = ma.provider_id
)
WHERE ma.provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = ma.provider_id
  );

-- Repair mechanic_documents.provider_id
UPDATE mechanic_documents md SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = md.provider_id
)
WHERE md.provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = md.provider_id
  );

-- Repair reviews.service_provider_id
UPDATE reviews r SET service_provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = r.service_provider_id
)
WHERE r.service_provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = r.service_provider_id
  );

COMMIT;
```

### Migration Runner

The existing `scripts/migrate.js` already reads all `.sql` files from `db/migrations/` sorted alphabetically and runs them. Adding `002_repair_provider_fks.sql` will automatically apply it on next deploy.

### Verify

```sql
-- On Railway prod DB, run these to verify no corrupted rows remain:
SELECT COUNT(*) FROM bookings
WHERE service_provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp WHERE sp.id = bookings.service_provider_id
  );
-- Should return 0

SELECT COUNT(*) FROM mechanic_availability
WHERE provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp WHERE sp.id = mechanic_availability.provider_id
  );
-- Should return 0
```

---

## Execution Order

```
Task 1: Fix migration DO block        ──────┐
Task 2: Add NOT NULL on provider_id    ──────┤── Commit 1: migration fix
Task 6: Create data repair migration   ──────┘
                                               \\
Task 3: Fix searchMechanics params     ────── Commit 2: frontend search fix
                                               \\
Task 4: Fix provider profile persistence ──── Commit 3: profile data fix
Task 5: Fix MyVehicles rendering       ──────┘
```

## Verification Checklist

After all tasks:
- [ ] `docker compose down -v && docker compose up` — fresh DB migration succeeds
- [ ] Provider signup form → data appears on My Provider Profile page
- [ ] Provider signup form → data appears on Preview tab
- [ ] Mechanics feed page loads without "E.data.map" error
- [ ] My Vehicles page shows registered vehicles
- [ ] Booking creation shows correct provider profiles
- [ ] Data repair migration (002) runs without errors on existing DB
- [ ] All queries return 0 for corrupted FK rows after repair
