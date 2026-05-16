const pool = require('../db/pool');

async function show(req, res) {
  await pool.query('SELECT 1');
  return res.status(200).json({
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = {
  show,
};
