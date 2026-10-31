import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  vite: { css: { preprocessorOptions: { scss: { quietDeps: true } } } },
});
