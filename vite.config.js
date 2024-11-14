import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Para asegurar que las rutas sean relativas en producción
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Genera los archivos en el directorio 'dist'
  },
});
