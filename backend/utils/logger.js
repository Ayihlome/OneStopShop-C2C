const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logsDir = path.resolve(__dirname, '..', 'logs');
const projectRoot = path.resolve(__dirname, '..', '..');
fs.mkdirSync(logsDir, { recursive: true });

const metaOrder = [
  'method',
  'url',
  'statusCode',
  'responseTimeMs',
  'ip',
  'userId',
  'role',
  'requiredRoles',
  'updatedFields',
  'errorMessage',
  'code',
];

function shortenPaths(value) {
  if (!value || typeof value !== 'string') {
    return value;
  }

  return value
    .replaceAll(projectRoot, '.')
    .replaceAll(projectRoot.replaceAll('\\', '/'), '.')
    .replaceAll('\\', '/');
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return `[${value.join(',')}]`;
  }

  if (typeof value === 'string') {
    return value.includes(' ') ? JSON.stringify(shortenPaths(value)) : shortenPaths(value);
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

const compactConsoleFormat = winston.format.printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;
  const orderedKeys = [
    ...metaOrder.filter((key) => meta[key] !== undefined),
    ...Object.keys(meta)
      .filter((key) => !metaOrder.includes(key) && !key.startsWith('Symbol('))
      .sort(),
  ];
  const details = orderedKeys.map((key) => `${key}=${formatValue(meta[key])}`).join(' ');
  const stackTrace = stack ? `\n${shortenPaths(stack)}` : '';

  return `${timestamp} ${level}: ${message}${details ? ` ${details}` : ''}${stackTrace}`;
});

const baseFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'info'),
  format: winston.format.combine(baseFormat, winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(baseFormat, compactConsoleFormat),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
    }),
  ],
});

module.exports = logger;
