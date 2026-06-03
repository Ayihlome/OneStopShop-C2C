-- =================================================================
-- PROVIDER AVAILABILITY — recurring weekly windows
-- =================================================================
CREATE TABLE IF NOT EXISTS provider_availability (
  id BIGSERIAL PRIMARY KEY,
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_provider_availability_provider
  ON provider_availability(provider_id);

-- =================================================================
-- PROVIDER AVAILABILITY EXCEPTIONS — specific date overrides
-- =================================================================
CREATE TABLE IF NOT EXISTS provider_availability_exceptions (
  id BIGSERIAL PRIMARY KEY,
  provider_id INT NOT NULL REFERENCES service_provider_profiles(id) ON DELETE CASCADE,
  exception_date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT FALSE,
  reason VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider_id, exception_date)
);

CREATE INDEX IF NOT EXISTS idx_provider_exceptions_provider
  ON provider_availability_exceptions(provider_id);
