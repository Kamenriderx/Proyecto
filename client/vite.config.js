import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@react-pdf/renderer': '@react-pdf/renderer/dist/react-pdf.es.js',
  },
})
