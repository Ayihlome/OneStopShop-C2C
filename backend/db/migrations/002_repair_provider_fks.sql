-- =================================================================
-- 002_repair_provider_fks.sql
-- Repair corrupted provider FK references from Phase 2 migration.
--
-- The initial migration (001_init.sql) incorrectly copied
-- mechanic_id (accounts.id) directly into columns that expect
-- service_provider_profiles.id. This repair translates those
-- IDs using the account_id → id mapping.
--
-- Only runs on rows where the FK doesn't already point to
-- a valid service_provider_profiles row.
-- =================================================================

BEGIN;

-- =================================================================
-- REPAIR: bookings.service_provider_id
-- =================================================================
UPDATE bookings b SET service_provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = b.service_provider_id
)
WHERE b.service_provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = b.service_provider_id
  );

-- =================================================================
-- REPAIR: mechanic_availability.provider_id
-- =================================================================
UPDATE mechanic_availability ma SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = ma.provider_id
)
WHERE ma.provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = ma.provider_id
  );

-- =================================================================
-- REPAIR: mechanic_documents.provider_id
-- =================================================================
UPDATE mechanic_documents md SET provider_id = (
  SELECT sp.id FROM service_provider_profiles sp
  WHERE sp.account_id = md.provider_id
)
WHERE md.provider_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM service_provider_profiles sp
    WHERE sp.id = md.provider_id
  );

-- =================================================================
-- REPAIR: reviews.service_provider_id
-- =================================================================
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
