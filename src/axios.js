import axios from 'axios';
import { useAuthStore } from './store/auth';
import { getActivePinia } from 'pinia';
console.log('API URL:', process.env.VUE_APP_API_URL); // This should print http://127.0.0.1:5000

// Create an Axios instance
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,  // Ensure the variable is accessed correctly
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
    console.log("Making request to:", config.baseURL + config.url); 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
