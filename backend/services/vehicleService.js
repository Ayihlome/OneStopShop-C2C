const pool = require('../db/pool');

exports.listByUser = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM vehicles WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async (userId, { make, model, year_produced, color, license_plate, fuel_type, transmission, notes }) => {
  const result = await pool.query(`
    INSERT INTO vehicles (user_id, make, model, year_produced, color, license_plate, fuel_type, transmission, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `, [userId, make, model, year_produced, color, license_plate, fuel_type, transmission, notes]);
  return result.rows[0];
};

exports.update = async (id, { make, model, year_produced, color, fuel_type, transmission, notes }) => {
  const result = await pool.query(`
    UPDATE vehicles
    SET make = COALESCE($1, make),
        model = COALESCE($2, model),
        year_produced = COALESCE($3, year_produced),
        color = COALESCE($4, color),
        fuel_type = COALESCE($5, fuel_type),
        transmission = COALESCE($6, transmission),
        notes = COALESCE($7, notes)
    WHERE id = $8
    RETURNING *
  `, [make, model, year_produced, color, fuel_type, transmission, notes, id]);
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
};