<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li>
          <!-- Conditionally render Login or Logout based on the authenticated state -->
          <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
          <router-link v-if="isAuthenticated" to="/login" @click="logout">Logout</router-link>
        </li>
        <li><router-link to="/req-dashboard">Dashboard</router-link></li>
        <li><router-link to="/ml">IA</router-link></li>
      </ul>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // Adjust the path to your store

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();  // Get the auth store
    const isAuthenticated = authStore.getAuthStatus; // Access the authentication status
    const logout = () => {
      authStore.logout();  // Trigger the logout action
      this.$router.push('/login');  // Redirect to the home page
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style>
/* Simple styling for navigation */
nav {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
}
nav a {
  text-decoration: none;
  color: #007bff;
}
nav a.router-link-active {
  font-weight: bold;
}
main {
  padding: 2rem;
}
</style>
