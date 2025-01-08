import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      // Specify a port
    open: true,      // Auto-open browser on start
    strictPort: true, // Fail if the port is already in use
    host: '0.0.0.0'
  },
  logLevel: 'info'   // Set log level to display more details
})
