import client from './client';

export async function getMe() {
  return client.get('/users/me');
}

export async function updateMe(data) {
  return client.put('/users/me', data);
}
