import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL || process.env.DOCKER ? '/' : './',
  plugins: [inspectAttr(), react()],
  server: {
    host: process.env.DOCKER ? '0.0.0.0' : true,
    // Proxy /api para o serviço email-api (Docker: thor-api, local: localhost)
    proxy: {
      '/api': {
        target: process.env.DOCKER ? 'http://thor-api:3001' : 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    allowedHosts: [
      'thorpersonal.com.br',
      'www.thorpersonal.com.br',
      'unbiased-hip-bengal.ngrok-free.app',
      'localhost',
      '127.0.0.1',
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
