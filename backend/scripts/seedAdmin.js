const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const logger = require('../utils/logger');

async function seedAdmin() {
  const email = 'admin@onestopshop.com';
  const existing = await pool.query('SELECT id, username, email, role, created_at FROM admins WHERE email = $1', [
    email,
  ]);

  if (existing.rows[0]) {
    logger.info('Admin already seeded, skipping', {
      email: existing.rows[0].email,
      role: existing.rows[0].role,
    });

    return {
      ...existing.rows[0],
      skipped: true,
    };
  }

  const passwordHash = await bcrypt.hash('Admin1234!', 12);

  const result = await pool.query(
    `INSERT INTO admins (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, role, created_at`,
    ['superadmin', email, passwordHash, 'superadmin']
  );

  logger.info('Seeded superadmin account', {
    email: result.rows[0].email,
    role: result.rows[0].role,
  });

  return result.rows[0];
}

seedAdmin()
  .then((admin) => {
    if (admin.skipped) {
      console.log('Admin already seeded, skipping');
      return;
    }

    console.log(`Seeded admin: ${admin.email} (${admin.role})`);
  })
  .catch((error) => {
    console.error('Failed to seed admin:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
