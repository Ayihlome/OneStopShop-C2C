const pool = require('../db/pool');
const logger = require('../utils/logger');

async function trackVisit(req, res, next) {
  pool
    .query(
      `INSERT INTO page_visits (path, ip, user_agent)
       VALUES ($1, $2, $3)`,
      [req.originalUrl, req.ip, req.get('user-agent') || null]
    )
    .catch((error) => {
      logger.warn('Failed to track page visit', {
        message: error.message,
        path: req.originalUrl,
      });
    });

  next();
}

module.exports = trackVisit;
