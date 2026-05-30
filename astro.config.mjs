// @ts-check
import { defineConfig } from 'astro/config';

// output: 'static' (default en Astro 5) — SSR por página con export const prerender = false
// Agregar @astrojs/vercel al deployar
export default defineConfig({
  site: 'https://jocoso.cl',
});
