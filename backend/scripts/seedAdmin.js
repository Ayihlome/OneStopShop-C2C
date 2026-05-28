const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const logger = require('../utils/logger');

const BCRYPT_ROUNDS = 12;

const SEED_ACCOUNTS = [
  {
    type: 'admin',
    email: 'sByrneAdmin@gmail.com',
    password: 'bestLecturer4eva!',
    username: 'superadmin',
    role: 'superadmin',
  },
  {
    type: 'user',
    email: 'sByrne@gmail.com',
    password: 'bestLecturer4always!',
  },
];

async function seedAdmin(email, password, username, role) {
  const existing = await pool.query(
    'SELECT id, username, email, role, created_at FROM admins WHERE email = $1',
    [email],
  );

  if (existing.rows[0]) {
    logger.info('Admin already seeded, skipping', {
      email: existing.rows[0].email,
      role: existing.rows[0].role,
    });
    return { ...existing.rows[0], skipped: true };
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const result = await pool.query(
    `INSERT INTO admins (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, role, created_at`,
    [username, email, passwordHash, role],
  );

  logger.info('Seeded admin account', {
    email: result.rows[0].email,
    role: result.rows[0].role,
  });

  return result.rows[0];
}

async function seedUser(email, password) {
  const existingAccount = await pool.query(
    'SELECT id FROM accounts WHERE email = $1',
    [email],
  );

  if (existingAccount.rows[0]) {
    logger.info('User already exists, skipping', { email });
    return { email, skipped: true };
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  // Insert into accounts
  const accountResult = await pool.query(
    `INSERT INTO accounts (first_name, last_name, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, first_name, last_name, email, status, created_at`,
    ['Sibabalwe', 'Byrne', email, passwordHash],
  );

  const account = accountResult.rows[0];

  // Insert into users (every account gets a users row at signup)
  await pool.query(
    'INSERT INTO users (account_id) VALUES ($1)',
    [account.id],
  );

  logger.info('Seeded user account', {
    email: account.email,
    id: account.id,
  });

  return account;
}

async function seedAll() {
  const results = [];

  for (const account of SEED_ACCOUNTS) {
    if (account.type === 'admin') {
      results.push(
        await seedAdmin(account.email, account.password, account.username, account.role),
      );
    } else if (account.type === 'user') {
      results.push(await seedUser(account.email, account.password));
    }
  }

  return results;
}

seedAll()
  .then((results) => {
    for (const r of results) {
      if (r.skipped) {
        console.log(`Skipped (already exists): ${r.email}`);
      } else {
        console.log(`Seeded: ${r.email}`);
      }
    }
  })
  .catch((error) => {
    console.error('Failed to seed accounts:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
