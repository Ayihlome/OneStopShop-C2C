import client from './client';

export async function listMechanics() {
  return client.get('/mechanics');
}

export async function getMechanic(id) {
  return client.get(`/mechanics/${id}`);
}

export async function getMechanicProfile(id) {
  return client.get(`/mechanics/${id}/profile`);
}

export async function searchMechanics(params = {}) {
  return client.get('/mechanics/search', {
    params,
  });
}

export async function filterMechanics(params) {
  return client.get('/mechanics/filter', {
    params,
  });
}

export async function findNearby(lat, lng) {
  return client.get('/mechanics/nearby', {
    params: { lat, lng },
  });
}

export async function updateMechanic(id, data) {
  return client.put(`/mechanics/${id}`, data);
}

export async function becomeProvider(data) {
  return client.post('/mechanics/become-provider', data);
}

export async function uploadDocument(file, docType) {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('doc_type', docType);

  return client.post('/mechanics/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
