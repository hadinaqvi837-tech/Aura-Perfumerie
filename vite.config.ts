import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR can be disabled via the `DISABLE_HMR` env var for CI or reduced CPU usage.
      hmr: process.env.DISABLE_HMR !== 'true',
      // When HMR is disabled, file system watching may be turned off to save resources.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
