import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [inspectAttr(), react()],
  server: {
    // Permite acesso pelo ngrok (host bloqueado pelo Vite por padrão)
    allowedHosts: [
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
