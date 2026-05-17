const pool = require('../db/pool');
const logger = require('../utils/logger');
const { createError } = require('../utils/errors');

async function checkDocumentLimit(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT COUNT(*)::int AS count
       FROM mechanic_documents
       WHERE mechanic_id = $1
         AND status != 'rejected'`,
      [req.user.id]
    );
    const count = Number(result.rows[0].count);

    req.documentCount = count;

    if (count >= 5) {
      logger.warn('Document upload rejected because mechanic reached the limit', {
        mechanicId: req.user.id,
        documentCount: count,
      });
      throw createError(400, 'Document limit reached. Maximum 5 documents allowed.');
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = checkDocumentLimit;
