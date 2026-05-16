const logger = require('../utils/logger');

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

  logger.error('Unhandled request error', {
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.originalUrl,
  });

  if (res.headersSent) {
    return next(error);
  }

  return res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal server error' : message,
  });
}

module.exports = errorHandler;
