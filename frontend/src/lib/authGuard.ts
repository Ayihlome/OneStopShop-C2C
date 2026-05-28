import { redirect } from 'react-router';

/**
 * Loader that blocks unauthenticated access.
 * Redirects to /login?redirect=<return_path> if no token is found.
 */
export function requireAuth() {
  const token = typeof window !== 'undefined' && localStorage.getItem('oss_token');

  if (!token) {
    const currentPath = typeof window !== 'undefined'
      ? window.location.pathname + window.location.search
      : '/';
    throw redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }

  return null;
}

/**
 * Loader that redirects already-authenticated users away from
 * login/signup pages back to the home page.
 */
export function redirectIfAuth() {
  const token = typeof window !== 'undefined' && localStorage.getItem('oss_token');

  if (token) {
    throw redirect('/');
  }

  return null;
}
