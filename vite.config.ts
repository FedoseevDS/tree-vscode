import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 5007,
  },
});
