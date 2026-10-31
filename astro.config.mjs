import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.easttowndigital.com',
  output: 'static',
  devToolbar: { enabled: false },
  vite: { css: { preprocessorOptions: { scss: { quietDeps: true } } } },
});
