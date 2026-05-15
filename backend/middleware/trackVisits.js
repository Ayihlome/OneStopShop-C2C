// keeps tarck of page vists
const Visit = require('../models/Visit');

async function trackVisits(req, res, next) {
  try {
    const visit = new Visit({ path: req.path, method: req.method, timestamp: new Date() });
    await visit.save();
  } catch (err) {
    console.error('Error tracking visit:', err);
  }
    next();
}

module.exports = trackVisits;