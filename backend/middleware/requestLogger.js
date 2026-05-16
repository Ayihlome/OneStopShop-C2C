const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const elapsed = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info('HTTP request completed', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      statusCode: res.statusCode,
      responseTimeMs: Number(elapsed.toFixed(2)),
    });
  });

  next();
}

module.exports = requestLogger;
