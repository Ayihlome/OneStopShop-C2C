const pool = require('../db/pool');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

async function listVehicles(userId) {
  const result = await pool.query(
    `SELECT *
     FROM vehicles
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return sanitize(result.rows);
}

async function getVehicle(id, userId) {
  const result = await pool.query(
    `SELECT *
     FROM vehicles
     WHERE id = $1
       AND user_id = $2`,
    [id, userId]
  );

  if (!result.rows[0]) {
    throw createError(404, 'Vehicle not found');
  }

  return sanitize(result.rows[0]);
}

async function createVehicle(userId, input) {
  const result = await pool.query(
    `INSERT INTO vehicles (
       user_id, make, model, year_produced, color, license_plate,
       fuel_type, transmission, notes
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      userId,
      input.make,
      input.model,
      input.year_produced,
      input.color ?? null,
      input.license_plate,
      input.fuel_type ?? null,
      input.transmission ?? null,
      input.notes ?? null,
    ]
  );

  return sanitize(result.rows[0]);
}

async function updateVehicle(id, userId, input) {
  const result = await pool.query(
    `UPDATE vehicles
     SET make = COALESCE($3, make),
         model = COALESCE($4, model),
         year_produced = COALESCE($5, year_produced),
         color = COALESCE($6, color),
         license_plate = COALESCE($7, license_plate),
         fuel_type = COALESCE($8, fuel_type),
         transmission = COALESCE($9, transmission),
         notes = COALESCE($10, notes)
     WHERE id = $1
       AND user_id = $2
     RETURNING *`,
    [
      id,
      userId,
      input.make ?? null,
      input.model ?? null,
      input.year_produced ?? null,
      input.color ?? null,
      input.license_plate ?? null,
      input.fuel_type ?? null,
      input.transmission ?? null,
      input.notes ?? null,
    ]
  );

  if (!result.rows[0]) {
    throw createError(404, 'Vehicle not found');
  }

  return sanitize(result.rows[0]);
}

async function deleteVehicle(id, userId) {
  const result = await pool.query(
    `DELETE FROM vehicles
     WHERE id = $1
       AND user_id = $2
     RETURNING *`,
    [id, userId]
  );

  if (!result.rows[0]) {
    throw createError(404, 'Vehicle not found');
  }

  return sanitize(result.rows[0]);
}

module.exports = {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
