// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jocoso.cl',
  adapter: vercel(),
  integrations: [sitemap({
    filter: (page) => !/\/(login|carrito|checkout|cuenta)(\/|$)/.test(new URL(page).pathname),
  })],
});
