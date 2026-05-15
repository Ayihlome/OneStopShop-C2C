const logger = require('winston');

// Configure winston logger
logger.configure({
  level: 'info',
    format: logger.format.combine( 
        logger.format.timestamp(),
        logger.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
    ),
  transports: [
    new logger.transports.Console(),
    new logger.transports.File({ filename: 'logs/app.log' })
  ]
});

module.exports = logger;