import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'; // Import Pinia
import router from './router';

const app = createApp(App);

// Create a Pinia store instance
const pinia = createPinia();

// Use Pinia with your app
app.use(pinia); // Make sure this is called before any store usage

// Use router (if applicable)
app.use(router);

app.mount('#app');
import('./axios.js').then(() => {
    console.log('Axios has been set up.');
  });