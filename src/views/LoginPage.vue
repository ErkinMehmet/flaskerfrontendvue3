<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; 
  import { useAuthStore } from '@/store/auth';

  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
     methods: {
    async login() {
      try {
        const response = await axios.post('/api-login', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        
        const authStore = useAuthStore();
        authStore.setToken(token);
        
        this.$router.push('/dashboard'); 
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      }
    },
  },
};
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: auto;
    padding: 1em;
    text-align: center;
  }
  .error {
    color: red;
  }
  </style>
  