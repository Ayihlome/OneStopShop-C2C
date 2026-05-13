const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res, next) => {
  try {
    const { mechanicId, vehicleId, description, preferredSchedule } = req.body;
    const booking = await bookingService.create({
      userId: req.user.id,
      mechanicId,
      vehicleId,
      description,
      preferredSchedule,
    });
    res.status(201).json(booking);
  } catch (err) { next(err); }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) { next(err); }
};

exports.listUserBookings = async (req, res, next) => {
  try {
    res.json(await bookingService.listByUser(req.user.id));
  } catch (err) { next(err); }
};

exports.listMechanicBookings = async (req, res, next) => {
  try {
    res.json(await bookingService.listByMechanic(req.user.id));
  } catch (err) { next(err); }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const updated = await bookingService.updateStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) { next(err); }
};