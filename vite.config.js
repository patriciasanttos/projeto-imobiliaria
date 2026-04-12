import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/geocode': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL(path, 'http://localhost');
          const q = url.searchParams.get('q') || '';
          return `/search?format=json&q=${encodeURIComponent(q)}&limit=1`;
        },
      },
    },
  },
})
