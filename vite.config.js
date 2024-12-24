import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Import the path module

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for the src folder
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',  // Your backend server
        changeOrigin: true,  // Modify the Origin header
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' prefix if needed on backend
      },
    },
  },
});
