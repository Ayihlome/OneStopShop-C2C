const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./config');
console.log('Allowed CORS origins:', config.cors.origins);
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const trackVisit = require('./middleware/trackVisit');
const logger = require('./utils/logger');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.cors.origins.includes(origin)) {
        return callback(null, true);
      }

      logger.warn('CORS origin rejected', { origin });
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Please try again later.' },
  handler(req, res) {
    logger.warn('Auth rate limit exceeded', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });

    return res.status(429).json({ error: 'Too many auth attempts. Please try again later.' });
  },
});

app.use('/api/auth', authLimiter);
app.use('/api', trackVisit);
app.use('/api', routes);

app.use((req, res) => {
  logger.warn('Route not found', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(config.port, () => {
    logger.info('OneStopShop API listening', {
      port: config.port,
      env: config.env,
    });
  });
}

module.exports = app;
