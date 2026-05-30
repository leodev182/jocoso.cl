import { atom } from 'nanostores';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
}

export const userStore = atom<AuthUser | null>(null);
export const tokenStore = atom<string | null>(null);

export function setAuth(user: AuthUser, accessToken: string, refreshToken: string) {
  userStore.set(user);
  tokenStore.set(accessToken);
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('refreshToken', refreshToken);
}

export function clearAuth() {
  userStore.set(null);
  tokenStore.set(null);
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('cart');
}

export function initAuth() {
  const token = sessionStorage.getItem('accessToken');
  if (token) tokenStore.set(token);
}

export function isAuthenticated(): boolean {
  return tokenStore.get() !== null;
}
