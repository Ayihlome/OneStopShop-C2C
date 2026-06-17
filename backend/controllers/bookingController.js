const bookingService = require('../services/bookingService');

async function createBooking(req, res) {
  const data = await bookingService.createBooking(req.user.id, req.body);
  return res.status(201).json({ data, message: 'Success' });
}

async function getBooking(req, res) {
  const data = await bookingService.getBooking(req.params.id, req.user);
  return res.status(200).json({ data });
}

async function listMyBookings(req, res) {
  const data = await bookingService.listUserBookings(req.user.id);
  return res.status(200).json({ data });
}

async function listMechanicBookings(req, res) {
  const data = await bookingService.listMechanicBookings(req.user.id);
  return res.status(200).json({ data });
}

async function updateBookingStatus(req, res) {
  const data = await bookingService.updateBookingStatus(
    req.params.id,
    req.body.status,
    req.user
  );
  return res.status(200).json({ data, message: 'Success' });
}

async function updateBookingPrice(req, res) {
  const data = await bookingService.updateBookingPrice(
    req.params.id,
    req.body.amount,
    req.user
  );
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  createBooking,
  getBooking,
  listMyBookings,
  listMechanicBookings,
  updateBookingStatus,
  updateBookingPrice,
};
