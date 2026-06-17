ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS quoted_amount DECIMAL(10, 2)
    CHECK (quoted_amount IS NULL OR quoted_amount > 0);

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS quoted_at TIMESTAMPTZ;

ALTER TABLE bookings
  DROP CONSTRAINT IF EXISTS bookings_booking_status_check;

ALTER TABLE bookings
  ADD CONSTRAINT bookings_booking_status_check
    CHECK (booking_status IN (
      'payment_pending', 'paid', 'whatsapp_redirected',
      'in_progress', 'completed', 'cancelled', 'rejected', 'refunded'
    ));
