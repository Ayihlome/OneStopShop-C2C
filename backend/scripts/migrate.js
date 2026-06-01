const pool = require('../db/pool');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const migrationsDir = path.resolve(__dirname, '../db/migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    console.log(`  ✓ ${file} applied.`);
  }

  console.log('All migrations complete.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
