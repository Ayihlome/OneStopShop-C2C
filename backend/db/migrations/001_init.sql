BEGIN;

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

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mechanics (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  bio TEXT,
  years_experience INT CHECK (years_experience IS NULL OR years_experience >= 0),
  is_available BOOLEAN NOT NULL DEFAULT true,
  verification_badge BOOLEAN NOT NULL DEFAULT false,
  whatsapp_number VARCHAR(20),
  lat NUMERIC(9,6) CHECK (lat IS NULL OR (lat >= -90 AND lat <= 90)),
  lng NUMERIC(9,6) CHECK (lng IS NULL OR (lng >= -180 AND lng <= 180))
);

CREATE TABLE IF NOT EXISTS specialities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mechanic_specialities (
  mechanic_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  speciality_id BIGINT NOT NULL REFERENCES specialities(id) ON DELETE CASCADE,
  PRIMARY KEY (mechanic_id, speciality_id)
);

CREATE TABLE IF NOT EXISTS mechanic_availability (
  id BIGSERIAL PRIMARY KEY,
  mechanic_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  CHECK (start_time < end_time)
);

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

CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  mechanic_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  preferred_schedule TIMESTAMPTZ NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  mechanic_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  recipient_id BIGINT NOT NULL,
  recipient_type VARCHAR(20) NOT NULL CHECK (recipient_type IN ('user', 'mechanic', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'moderator'
    CHECK (role IN ('moderator', 'superadmin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mechanic_documents (
  id BIGSERIAL PRIMARY KEY,
  mechanic_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  doc_type VARCHAR(50) NOT NULL CHECK (doc_type IN ('id', 'certification', 'proof_of_residence')),
  file_url TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by BIGINT REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_visits (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_accounts_updated_at ON accounts;
CREATE TRIGGER set_accounts_updated_at
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_mechanics_account_id ON mechanics(account_id);
CREATE INDEX IF NOT EXISTS idx_mechanic_specialities_mechanic_id ON mechanic_specialities(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_mechanic_availability_mechanic_id ON mechanic_availability(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_mechanic_id ON bookings(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_mechanic_id ON reviews(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, recipient_type, is_read);
CREATE INDEX IF NOT EXISTS idx_mechanic_documents_status ON mechanic_documents(status);
CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at);

COMMIT;
