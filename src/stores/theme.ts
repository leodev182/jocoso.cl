import { atom } from 'nanostores';

export type Theme = 'dark' | 'light';

export const themeStore = atom<Theme>('dark');

export function toggleTheme() {
  const next: Theme = themeStore.get() === 'dark' ? 'light' : 'dark';
  themeStore.set(next);
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

export function initTheme() {
  const saved = (localStorage.getItem('theme') as Theme) ?? 'dark';
  themeStore.set(saved);
  document.documentElement.setAttribute('data-theme', saved);
}
