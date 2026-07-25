/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // lets component styles `@use 'tokens'` / `@use 'theme'` from the shared package
        loadPaths: [fileURLToPath(new URL('../../packages/ui', import.meta.url))],
      },
    },
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
