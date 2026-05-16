const reviewService = require('../services/reviewService');

async function createReview(req, res) {
  const data = await reviewService.createReview(req.user.id, req.body);
  return res.status(201).json({ data, message: 'Success' });
}

async function getMechanicReviews(req, res) {
  const data = await reviewService.getMechanicReviews(req.params.id);
  return res.status(200).json({ data });
}

async function getMyReviews(req, res) {
  const data = await reviewService.getUserReviews(req.user.id);
  return res.status(200).json({ data });
}

module.exports = {
  createReview,
  getMechanicReviews,
  getMyReviews,
};
