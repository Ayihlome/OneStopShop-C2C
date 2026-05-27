BEGIN;

-- Drop old tables that are being replaced
DROP TABLE IF EXISTS mechanic_specialities CASCADE;
DROP TABLE IF EXISTS mechanics CASCADE;

-- 1. SERVICE PROVIDER PROFILES
-- Linked to an existing accounts row. Any user can create one.
-- whatsapp_number is NOT shown to customers until payment is confirmed.
CREATE TABLE IF NOT EXISTS service_provider_profiles (
  id SERIAL PRIMARY KEY,
  account_id BIGINT UNIQUE NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  business_whatsapp_number VARCHAR(20) NOT NULL,
  service_description TEXT,
  years_of_experience INT CHECK (years_of_experience IS NULL OR years_of_experience >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_badge BOOLEAN NOT NULL DEFAULT FALSE,
  provider_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (provider_status IN ('active', 'suspended', 'pending')),
  payfast_merchant_id VARCHAR(50),
  payfast_merchant_key VARCHAR(50),
  lat NUMERIC(9,6) CHECK (lat IS NULL OR (lat >= -90 AND lat <= 90)),
  lng NUMERIC(9,6) CHECK (lng IS NULL OR (lng >= -180 AND lng <= 180)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROVIDER SPECIALITIES (replaces mechanic_specialities)
CREATE TABLE IF NOT EXISTS provider_specialities (
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  speciality_id BIGINT NOT NULL REFERENCES specialities(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, speciality_id)
);

-- 3. REWORK BOOKINGS TABLE
-- Drop the old bookings table and recreate it with the new status flow
-- and a foreign key to service_provider_profiles instead of accounts.
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  service_provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  preferred_schedule TIMESTAMPTZ NOT NULL,
  booking_status VARCHAR(30) NOT NULL DEFAULT 'payment_pending'
    CHECK (booking_status IN (
      'payment_pending', 'paid', 'whatsapp_redirected',
      'in_progress', 'completed', 'cancelled', 'refunded'
    )),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partial unique index: only one active job per provider at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_job
  ON bookings (service_provider_id)
  WHERE booking_status = 'in_progress';

-- 4. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  booking_id INT UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  payer_user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'ZAR',
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'successful', 'failed', 'cancelled', 'refunded')),
  payfast_payment_id VARCHAR(100),
  sandbox_transaction_id VARCHAR(100),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. RECREATE REVIEWS (was dropped with bookings)
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  booking_id INT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  service_provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. UPDATE mechanic_documents to reference service_provider_profiles
ALTER TABLE mechanic_documents
  DROP CONSTRAINT IF EXISTS mechanic_documents_mechanic_id_fkey;

ALTER TABLE mechanic_documents
  ADD COLUMN IF NOT EXISTS provider_id INT REFERENCES service_provider_profiles(id) ON DELETE CASCADE;

-- 7. UPDATE mechanic_availability to reference service_provider_profiles
ALTER TABLE mechanic_availability
  DROP CONSTRAINT IF EXISTS mechanic_availability_mechanic_id_fkey;

ALTER TABLE mechanic_availability
  ADD COLUMN IF NOT EXISTS provider_id INT REFERENCES service_provider_profiles(id) ON DELETE CASCADE;

-- 8. UPDATED_AT TRIGGER for new tables
DROP TRIGGER IF EXISTS set_service_provider_profiles_updated_at ON service_provider_profiles;
CREATE TRIGGER set_service_provider_profiles_updated_at
  BEFORE UPDATE ON service_provider_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 9. INDEXES
CREATE INDEX IF NOT EXISTS idx_service_provider_profiles_account_id ON service_provider_profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_service_provider_profiles_verification ON service_provider_profiles(verification_badge, provider_status);
CREATE INDEX IF NOT EXISTS idx_provider_specialities_provider_id ON provider_specialities(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_user_id ON bookings(customer_user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_provider_id ON bookings(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_reviews_service_provider_id ON reviews(service_provider_id);

COMMIT;
