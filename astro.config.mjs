// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        external: ['@emulatorjs/emulatorjs/data/loader.js'], // Externalize loader.js
      },
    },
  },
});
