-- =================================================================
-- 003_drop_old_booking_columns.sql
-- Drop old column names from the bookings table that were replaced
-- during the 001_init migration (customer_user_id replaced user_id,
-- service_provider_id replaced mechanic_id, booking_status replaced
-- status).
--
-- These old columns still carry NOT NULL constraints, causing
-- INSERT failures on migrated databases.
-- =================================================================

DO $$
BEGIN
  -- Drop old user_id column if it still exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE bookings DROP COLUMN user_id;
  END IF;

  -- Drop old mechanic_id column if it still exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'mechanic_id'
  ) THEN
    ALTER TABLE bookings DROP COLUMN mechanic_id;
  END IF;

  -- Drop old status column if it still exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'status'
  ) THEN
    ALTER TABLE bookings DROP COLUMN status;
  END IF;
END;
$$;
