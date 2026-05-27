import client from './client';

export async function signupUser(data) {
  return client.post('/auth/signup/user', data);
}

export async function loginUser(data) {
  return client.post('/auth/login/user', data);
}

export async function loginAdmin(data) {
  return client.post('/auth/login/admin', data);
}
