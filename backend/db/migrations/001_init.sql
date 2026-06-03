BEGIN;

-- =================================================================
-- ACCOUNTS
-- =================================================================
CREATE TABLE IF NOT EXISTS accounts (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone_number VARCHAR(30),
  city VARCHAR(120),
  town VARCHAR(120),
  profile_photo_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'suspended', 'deleted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- USERS (every account gets a users row at signup)
-- =================================================================
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE
);

-- =================================================================
-- SERVICE PROVIDER PROFILES
-- =================================================================
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

-- =================================================================
-- SPECIALITIES
-- =================================================================
CREATE TABLE IF NOT EXISTS specialities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

-- =================================================================
-- PROVIDER SPECIALITIES
-- =================================================================
CREATE TABLE IF NOT EXISTS provider_specialities (
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  speciality_id BIGINT NOT NULL REFERENCES specialities(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, speciality_id)
);

-- =================================================================
-- MECHANIC AVAILABILITY
-- =================================================================
CREATE TABLE IF NOT EXISTS mechanic_availability (
  id BIGSERIAL PRIMARY KEY,
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  CHECK (start_time < end_time)
);

-- =================================================================
-- ADMINS
-- =================================================================
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'moderator'
    CHECK (role IN ('moderator', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- MECHANIC DOCUMENTS
-- =================================================================
CREATE TABLE IF NOT EXISTS mechanic_documents (
  id BIGSERIAL PRIMARY KEY,
  mechanic_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  doc_type VARCHAR(50) NOT NULL CHECK (doc_type IN ('id', 'certification', 'proof_of_residence')),
  file_url TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by BIGINT REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Background processing results (populated by PHP worker)
  ocr_text TEXT,
  thumbnail_url VARCHAR(500),
  doc_metadata JSONB DEFAULT '{}',
  validation_result JSONB DEFAULT '{}'
);

-- =================================================================
-- VEHICLES
-- =================================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  make VARCHAR(120) NOT NULL,
  model VARCHAR(120) NOT NULL,
  year_produced INT CHECK (year_produced IS NULL OR (year_produced BETWEEN 1900 AND 2030)),
  color VARCHAR(80),
  license_plate VARCHAR(40) UNIQUE,
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- BOOKINGS
-- =================================================================
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

-- =================================================================
-- PAYMENTS
-- =================================================================
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

-- =================================================================
-- REVIEWS
-- =================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  booking_id INT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  service_provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- NOTIFICATIONS
-- =================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  recipient_id BIGINT NOT NULL,
  recipient_type VARCHAR(20) NOT NULL CHECK (recipient_type IN ('user', 'mechanic', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- PAGE VISITS
-- =================================================================
CREATE TABLE IF NOT EXISTS page_visits (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- PROCESSING JOBS (background document processing queue)
-- =================================================================
CREATE TABLE IF NOT EXISTS processing_jobs (
  id SERIAL PRIMARY KEY,
  document_id INT NOT NULL REFERENCES mechanic_documents(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL DEFAULT 'document_ocr',
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_processing_jobs_pending
  ON processing_jobs (status, created_at)
  WHERE status = 'pending';

-- =================================================================
-- SET_UPDATED_AT TRIGGER FUNCTION
-- =================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- TRIGGERS
-- =================================================================
DROP TRIGGER IF EXISTS set_accounts_updated_at ON accounts;
CREATE TRIGGER set_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_service_provider_profiles_updated_at ON service_provider_profiles;
CREATE TRIGGER set_service_provider_profiles_updated_at
  BEFORE UPDATE ON service_provider_profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =================================================================
-- INDEXES
-- =================================================================
CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_service_provider_profiles_account_id ON service_provider_profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_service_provider_profiles_verification ON service_provider_profiles(verification_badge, provider_status);
CREATE INDEX IF NOT EXISTS idx_provider_specialities_provider_id ON provider_specialities(provider_id);
CREATE INDEX IF NOT EXISTS idx_mechanic_availability_provider_id ON mechanic_availability(provider_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_user_id ON bookings(customer_user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_provider_id ON bookings(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_reviews_service_provider_id ON reviews(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, recipient_type, is_read);
CREATE INDEX IF NOT EXISTS idx_mechanic_documents_status ON mechanic_documents(status);
CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at);

COMMIT;
