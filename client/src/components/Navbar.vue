<template>
  <nav>
    <router-link to="/" class="brand">The Send-Off<span class="dot">.</span></router-link>

    <div v-if="authStore.isAuthenticated" class="nav-right">
      <span class="Welcome">Trainee {{ authStore.username }}</span>
      <router-link to="/create" class="new-post">Write</router-link>
      <button @click="handleLogout">Sign out</button>
    </div>

    <div v-else class="nav-right">
      <router-link to="/login">Sign in</router-link>
      <router-link to="/register" class="new-post">Join</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}

.brand {
  font-family: 'Fraunces', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
}

.dot {
  color: var(--red);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.welcome {
  font-size: 0.9rem;
  color: var(--sage);
}

.nav-right a {
  text-decoration: none;
  color: var(--ink);
  font-size: 0.95rem;
}

.new-post {
  background: var(--ink);
  color: var(--paper) !important;
  padding: 0.5rem 1.1rem;
  border-radius: 100px;
  font-weight: 500;
}

.new-post:hover {
  background: var(--red);
}

nav button {
  background: transparent;
  border: 1px solid var(--line);
  padding: 0.5rem 1.1rem;
  border-radius: 100px;
  cursor: pointer;
  color: var(--ink);
  font-size: 0.9rem;
}

nav button:hover {
  border-color: var(--red);
  color: var(--red);
}
</style>