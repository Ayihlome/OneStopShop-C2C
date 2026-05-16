import client from './client';

export async function listVehicles() {
  return client.get('/vehicles');
}

export async function getVehicle(id) {
  return client.get(`/vehicles/${id}`);
}

export async function createVehicle(data) {
  return client.post('/vehicles', data);
}

export async function updateVehicle(id, data) {
  return client.put(`/vehicles/${id}`, data);
}

export async function deleteVehicle(id) {
  return client.delete(`/vehicles/${id}`);
}
