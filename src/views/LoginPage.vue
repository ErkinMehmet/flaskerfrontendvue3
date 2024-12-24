<template>
  <div class="login-page">
    <h1 class="text-4xl font-display text-royal-blue mb-6">Login</h1>
    <form @submit.prevent="login" class="bg-lightest-blue p-6 rounded-lg shadow-blue-glow">
      <div class="mb-4">
        <input 
          type="text" 
          v-model="username" 
          placeholder="Username" 
          class="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-royal-blue transition-all"
        />
      </div>
      <div class="mb-6">
        <input 
          type="password" 
          v-model="password" 
          placeholder="Password" 
          class="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-royal-blue transition-all"
        />
      </div>
      <button 
        type="submit" 
        class="w-full py-2 bg-blue text-white rounded-md hover:bg-dark-blue focus:outline-none transition-all"
      >
        Login
      </button>
    </form>
    <p v-if="error" class="error mt-4 text-red-600">{{
      error
    }}</p>
  </div>
</template>

<script>
import axios from '../axios'; 
import { useAuthStore } from '@/stores/auth';

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

        this.$router.push('/req-dashboard'); 
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      }
    },
  },
};
</script>