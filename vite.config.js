import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
    open: true,
    strictPort: true,
    hmr: {
      clientPort: 3001,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
