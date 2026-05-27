const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  jwt: {
    secret: process.env.JWT_SECRET || 'change_this_secret_in_env',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  db: process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  } : {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'onestopshop',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: Number(process.env.DB_POOL_MAX || 10),
  },
  cors: {
    origins: ['http://localhost:3001', 'http://localhost:5173', ...( process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []),],
  },
  payfast: {
    merchantId: process.env.PAYFAST_MERCHANT_ID || '',
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || '',
    passphrase: process.env.PAYFAST_PASSPHRASE || '',
    sandbox: process.env.NODE_ENV !== 'production',
    returnUrl: process.env.PAYFAST_RETURN_URL || 'http://localhost:5173/booking/success',
    cancelUrl: process.env.PAYFAST_CANCEL_URL || 'http://localhost:5173/booking/cancel',
    notifyUrl: process.env.PAYFAST_NOTIFY_URL || 'http://localhost:3000/api/payments/itn',
  },
};

module.exports = config;
