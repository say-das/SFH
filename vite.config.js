import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set base to your repository name for GitHub Pages
  // Change 'SMS-Fraud-Hub' to match your actual repo name
  base: process.env.NODE_ENV === 'production' ? '/SFH/' : '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimize for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
