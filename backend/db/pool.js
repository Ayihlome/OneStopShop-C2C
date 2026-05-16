const { Pool } = require('pg');
const config = require('../config');
const logger = require('../utils/logger');

const pool = new Pool(config.db);

pool.on('error', (error) => {
  logger.error('Unexpected idle PostgreSQL client error', {
    message: error.message,
    stack: error.stack,
  });
});

module.exports = pool;
