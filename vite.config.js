import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base : '/Cafeteria-Management-System/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.vs/**', '**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  }
});