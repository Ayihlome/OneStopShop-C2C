import client from './client';

export async function createBooking(data) {
  return client.post('/bookings', data);
}

export async function getBooking(id) {
  return client.get(`/bookings/${id}`);
}

export async function listMyBookings() {
  return client.get('/bookings/user');
}

export async function listMechanicBookings() {
  return client.get('/bookings/mechanic');
}

export async function updateBookingStatus(id, status) {
  return client.patch(`/bookings/${id}/status`, { status });
}
