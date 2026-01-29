import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  base: mode === 'production' ? './' : '/',

  server: {
    host: true
  },

  define: {
    global: 'globalThis'
  },

  build: {
    chunkSizeWarningLimit: 1000
  }
}))










//Quando for enviar para produção descomentar o código abaixo

/* import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    global: 'globalThis'
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: []
    }
  }
}) */