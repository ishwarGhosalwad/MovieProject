// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node', // node is fine; we will mock fetch manually
    globals: true,
    include: ['tests/**/*.test.*', 'tests/**/*.test.ts', 'tests/**/*.test.tsx']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})
