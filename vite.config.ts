import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Or set to '0.0.0.0' for public access
    port: 5173,  // You can specify the port if needed
    origin: 'https://ultimate-horse-shortly.ngrok-free.app', // Set this if you're using ngrok
    strictPort: true, // Optional: fail if port is taken
  }
})
