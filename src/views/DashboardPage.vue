<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <button @click="getUserData">Get User Data</button>
    
    <div v-if="userData">
      <h3>User Data:</h3>
      <pre>{{ userData }}</pre>
    </div>
    
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '@/axios'; // Import the configured Axios instance

export default {
  data() {
    return {
      userData: null,
      error: null,
    };
  },
  methods: {
    async getUserData() {
      try {
        const response = await axios.get('/api/secure'); // API call
        this.userData = response.data; // Store the response in userData
        console.log(response.data);
      } catch (err) {
        this.error = err.response?.data?.error || 'Error fetching user data';
        console.error('Error fetching user data:', err);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-page {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
