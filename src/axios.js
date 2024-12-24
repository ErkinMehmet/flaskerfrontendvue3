import axios from 'axios';
import { useAuthStore } from './stores/auth';
import { getActivePinia } from 'pinia';

// Vite uses `import.meta.env` for environment variables
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL); // This should print http://127.0.0.1:5000

// Create an Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use Vite's environment variable syntax
});

// Set up the interceptor
instance.interceptors.request.use(
  (config) => {
    if (getActivePinia()) {
      const authStore = useAuthStore();
      const token = authStore.getToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    console.log('Making request to:', config.baseURL + config.url); 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
