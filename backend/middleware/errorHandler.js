const logger = require('../utils/logger');
const { errorMeta, requestMeta } = require('../utils/logging');

function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || error.status || 500;
  let message = error.message;

  if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'Document file must be 5MB or smaller';
  }

  if (error.message === 'Only PDF, JPG, JPEG, and PNG files are allowed') {
    statusCode = 400;
    message = error.message;
  }

  if (error.message === 'Not allowed by CORS') {
    statusCode = 403;
    message = error.message;
  }

  const logPayload = {
    ...requestMeta(req),
    ...errorMeta(error, { includeStack: statusCode >= 500 }),
    statusCode,
  };

  if (statusCode >= 500) {
    logger.error('Unhandled request error', logPayload);
  } else {
    logger.warn('Request failed', logPayload);
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal server error' : message,
  });
}

module.exports = errorHandler;
