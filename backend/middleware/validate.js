const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const { requestMeta } = require('../utils/logging');

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn('Request validation failed', {
      ...requestMeta(req),
      errors: errors.array().map((item) => ({
        field: item.path,
        message: item.msg,
      })),
    });

    return res.status(400).json({
      error: 'Validation failed',
      errors: errors.array().map((item) => ({
        field: item.path,
        message: item.msg,
        value: item.value,
      })),
    });
  }

  return next();
}

module.exports = validate;
