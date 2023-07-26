import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from "vite-plugin-babel-macros"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false
      },
    },
  }
})
