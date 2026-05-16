const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const logger = require('../utils/logger');

async function seedAdmin() {
  const passwordHash = await bcrypt.hash('Admin1234!', 12);

  const result = await pool.query(
    `INSERT INTO admins (username, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email)
     DO UPDATE SET
       username = EXCLUDED.username,
       password_hash = EXCLUDED.password_hash,
       role = EXCLUDED.role
     RETURNING id, username, email, role, created_at`,
    ['superadmin', 'admin@onestopshop.com', passwordHash, 'superadmin']
  );

  logger.info('Seeded superadmin account', {
    email: result.rows[0].email,
    role: result.rows[0].role,
  });

  return result.rows[0];
}

seedAdmin()
  .then((admin) => {
    console.log(`Seeded admin: ${admin.email} (${admin.role})`);
  })
  .catch((error) => {
    console.error('Failed to seed admin:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
