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
-- SERVICE PROVIDER PROFILES (replaces old mechanics table)
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
-- PROVIDER SPECIALITIES (replaces mechanic_specialities)
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
-- MECHANIC DOCUMENTS (references admins)
-- =================================================================
CREATE TABLE IF NOT EXISTS mechanic_documents (
  id BIGSERIAL PRIMARY KEY,
  provider_id INT REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  doc_type VARCHAR(50) NOT NULL CHECK (doc_type IN ('id', 'certification', 'proof_of_residence')),
  file_url TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by BIGINT REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- VEHICLES
-- =================================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  make VARCHAR(120) NOT NULL,
  model VARCHAR(120) NOT NULL,
  year_produced INT NOT NULL CHECK (year_produced BETWEEN 1900 AND 2030),
  color VARCHAR(80),
  license_plate VARCHAR(40) NOT NULL UNIQUE,
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- BOOKINGS (C2C: customer->provider, payment-gated)
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

-- =================================================================
-- MIGRATION: handle pre-existing bookings table (old schema had
--   'status' instead of 'booking_status', 'user_id' instead of
--   'customer_user_id', 'mechanic_id' instead of 'service_provider_id')
--   Must run BEFORE any indexes reference the new column names.
-- =================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'booking_status'
  ) THEN
    ALTER TABLE bookings ADD COLUMN booking_status VARCHAR(30);
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'bookings' AND column_name = 'status'
    ) THEN
      UPDATE bookings SET booking_status =
        CASE status
          WHEN 'pending'  THEN 'payment_pending'
          WHEN 'accepted' THEN 'paid'
          WHEN 'rejected' THEN 'cancelled'
          ELSE status
        END;
    END IF;
    ALTER TABLE bookings ALTER COLUMN booking_status SET NOT NULL;
    ALTER TABLE bookings ALTER COLUMN booking_status SET DEFAULT 'payment_pending';
    ALTER TABLE bookings ADD CONSTRAINT bookings_booking_status_check
      CHECK (booking_status IN (
        'payment_pending', 'paid', 'whatsapp_redirected',
        'in_progress', 'completed', 'cancelled', 'refunded'
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'customer_user_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN customer_user_id BIGINT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'bookings' AND column_name = 'user_id'
    ) THEN
      UPDATE bookings SET customer_user_id = user_id;
    END IF;
    ALTER TABLE bookings ALTER COLUMN customer_user_id SET NOT NULL;
    ALTER TABLE bookings ADD CONSTRAINT fk_bookings_customer
      FOREIGN KEY (customer_user_id) REFERENCES accounts(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'service_provider_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN service_provider_id INT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'bookings' AND column_name = 'mechanic_id'
    ) THEN
      UPDATE bookings b SET service_provider_id = (
      SELECT sp.id FROM service_provider_profiles sp
      WHERE sp.account_id = b.mechanic_id
    )
    WHERE EXISTS (
      SELECT 1 FROM service_provider_profiles sp
      WHERE sp.account_id = b.mechanic_id
    );
    END IF;
    ALTER TABLE bookings ALTER COLUMN service_provider_id SET NOT NULL;
    ALTER TABLE bookings ADD CONSTRAINT fk_bookings_service_provider
      FOREIGN KEY (service_provider_id) REFERENCES service_provider_profiles(id) ON DELETE CASCADE;
  END IF;

  -- ===============================================================
  -- MECHANIC_AVAILABILITY: old had 'mechanic_id' (BIGINT FK→accounts),
  --   new expects 'provider_id' (INT FK→service_provider_profiles)
  -- ===============================================================
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_availability' AND column_name = 'provider_id'
  ) THEN
    ALTER TABLE mechanic_availability ADD COLUMN provider_id INT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'mechanic_availability' AND column_name = 'mechanic_id'
    ) THEN
      UPDATE mechanic_availability ma SET provider_id = (
      SELECT sp.id FROM service_provider_profiles sp
      WHERE sp.account_id = ma.mechanic_id
    )
    WHERE EXISTS (
      SELECT 1 FROM service_provider_profiles sp
      WHERE sp.account_id = ma.mechanic_id
    );
    END IF;
    ALTER TABLE mechanic_availability ALTER COLUMN provider_id SET NOT NULL;
    ALTER TABLE mechanic_availability ADD CONSTRAINT fk_avail_provider
      FOREIGN KEY (provider_id) REFERENCES service_provider_profiles(id) ON DELETE CASCADE;
  END IF;

  -- ===============================================================
  -- MECHANIC_DOCUMENTS: old had 'mechanic_id' (BIGINT FK→accounts),
  --   new expects 'provider_id' (INT FK→service_provider_profiles)
  -- ===============================================================
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_documents' AND column_name = 'provider_id'
  ) THEN
    ALTER TABLE mechanic_documents ADD COLUMN provider_id INT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'mechanic_documents' AND column_name = 'mechanic_id'
    ) THEN
      UPDATE mechanic_documents md SET provider_id = (
      SELECT sp.id FROM service_provider_profiles sp
      WHERE sp.account_id = md.mechanic_id
    )
    WHERE EXISTS (
      SELECT 1 FROM service_provider_profiles sp
      WHERE sp.account_id = md.mechanic_id
    );
    END IF;
    ALTER TABLE mechanic_documents ALTER COLUMN provider_id SET NOT NULL;
    ALTER TABLE mechanic_documents ADD CONSTRAINT fk_docs_provider
      FOREIGN KEY (provider_id) REFERENCES service_provider_profiles(id) ON DELETE CASCADE;
  END IF;

  -- ===============================================================
  -- REVIEWS: old had 'user_id' (BIGINT) and 'mechanic_id' (BIGINT),
  --   new expects 'reviewer_user_id' (BIGINT) and
  --   'service_provider_id' (INT FK→service_provider_profiles)
  -- ===============================================================
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'reviewer_user_id'
  ) THEN
    ALTER TABLE reviews ADD COLUMN reviewer_user_id BIGINT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'reviews' AND column_name = 'user_id'
    ) THEN
      UPDATE reviews SET reviewer_user_id = user_id;
    END IF;
    ALTER TABLE reviews ALTER COLUMN reviewer_user_id SET NOT NULL;
    ALTER TABLE reviews ADD CONSTRAINT fk_reviews_reviewer
      FOREIGN KEY (reviewer_user_id) REFERENCES accounts(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'service_provider_id'
  ) THEN
    ALTER TABLE reviews ADD COLUMN service_provider_id INT;
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'reviews' AND column_name = 'mechanic_id'
    ) THEN
      UPDATE reviews r SET service_provider_id = (
      SELECT sp.id FROM service_provider_profiles sp
      WHERE sp.account_id = r.mechanic_id
    )
    WHERE EXISTS (
      SELECT 1 FROM service_provider_profiles sp
      WHERE sp.account_id = r.mechanic_id
    );
    END IF;
    ALTER TABLE reviews ALTER COLUMN service_provider_id SET NOT NULL;
    ALTER TABLE reviews ADD CONSTRAINT fk_reviews_provider
      FOREIGN KEY (service_provider_id) REFERENCES service_provider_profiles(id) ON DELETE CASCADE;
  END IF;
END;
$$;

-- Drop old-column indexes before creating new ones
DROP INDEX IF EXISTS idx_bookings_user_id;
DROP INDEX IF EXISTS idx_bookings_mechanic_id;
DROP INDEX IF EXISTS idx_bookings_status;
DROP INDEX IF EXISTS idx_reviews_mechanic_id;
DROP INDEX IF EXISTS idx_mechanic_availability_mechanic_id;
DROP INDEX IF EXISTS idx_mechanic_specialities_mechanic_id;

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
