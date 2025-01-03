import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import RequestDashboardPage from '../views/RequestDashboardPage.vue';
import MachineLearningPage from '../views/MachineLearningPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/req-dashboard',
    name: 'RequestDashboard',
    component: RequestDashboardPage,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/ml',
    name: 'MachineLearning',
    component: MachineLearningPage,
    meta: { requiresAuth: true }, // Protect this route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('jwt'); // Check if a JWT exists
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
