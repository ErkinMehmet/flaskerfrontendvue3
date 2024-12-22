import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,  // Get JWT token from localStorage or default to null
    isAuthenticated: !!localStorage.getItem('jwt'),  // Check if the user is authenticated based on presence of token
  }),
  actions: {
    setToken(token) {
      this.token = token;
      try {
        localStorage.setItem('jwt', token);  // Save JWT to localStorage
      } catch (error) {
        console.error("Error saving token to localStorage:", error);
      }
      this.isAuthenticated = true;
    },
    logout() {
      this.token = null;
      try {
        localStorage.removeItem('jwt');  // Remove JWT from localStorage
      } catch (error) {
        console.error("Error removing token from localStorage:", error);
      }
      this.isAuthenticated = false;
    },
  },
  getters: {
    getToken() {
      return this.token;
    },
    getAuthStatus() {
      return this.isAuthenticated;
    },
  },
});
