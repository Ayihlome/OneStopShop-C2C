const pool = require('../db/pool');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const sql = fs.readFileSync(
    path.resolve(__dirname, '../db/migrations/001_init.sql'),
    'utf8'
  );
  await pool.query(sql);
  console.log('Migration complete.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});