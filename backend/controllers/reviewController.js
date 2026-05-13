const reviewService = require('../services/reviewService');

exports.createReview = async (req, res, next) => {
  try {
    const { bookingId, mechanicId, rating, comment } = req.body;
    const review = await reviewService.create({
      bookingId,
      userId: req.user.id,
      mechanicId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) { next(err); }
};

exports.getMechanicReviews = async (req, res, next) => {
  try {
    res.json(await reviewService.findByMechanic(req.params.id));
  } catch (err) { next(err); }
};

exports.getUserReviews = async (req, res, next) => {
  try {
    res.json(await reviewService.findByUser(req.user.id));
  } catch (err) { next(err); }
};