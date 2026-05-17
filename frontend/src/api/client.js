import axios from 'axios';

function normalizeApiBaseUrl(value) {
  const baseUrl = (value || 'http://localhost:3000/api').replace(/\/+$/, '');
  return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
}

function formatApiError(error) {
  const status = error.response?.status;
  const payload = error.response?.data;
  const headline = payload?.error || payload?.message || error.message || 'Request failed';
  const validationMessage = Array.isArray(payload?.errors)
    ? payload.errors
        .map((item) => item.message || item.msg)
        .filter(Boolean)
        .join(' ')
    : '';

  if (status === 404) {
    return `404: ${headline}. Confirm VITE_API_URL points to the backend API root, for example http://localhost:3000/api.`;
  }

  return [status ? `${status}: ${headline}` : headline, validationMessage]
    .filter(Boolean)
    .join(' ');
}

const client = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('oss_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('oss_token');
      localStorage.removeItem('oss_user');

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(new Error(formatApiError(error)));
  }
);

export default client;
