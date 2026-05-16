const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  jwt: {
    secret: process.env.JWT_SECRET || 'change_this_secret_in_env',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'onestopshop',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: Number(process.env.DB_POOL_MAX || 10),
  },
  cors: {
    origins: ['http://localhost:3001', 'http://localhost:5173'],
  },
};

module.exports = config;
