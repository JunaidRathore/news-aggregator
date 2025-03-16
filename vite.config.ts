// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    // Optional: Make the server automatically open in your browser
    open: true,
    // Optional: If port 3000 is taken, don't fail, try the next available port
    strictPort: false,
  }
})