import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "8d4b6dc4-b588-4d4a-a5cc-a6b9cf4a0905-00-15li0l1bn1dqu.pike.replit.dev"
    ]
  }
})
