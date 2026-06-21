<template>
  <div class="auth-page">
    <h1>Sign in</h1>
    <p class="sub">Welcome back. Pick up where you left off.</p>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign in</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="switch">No account? <router-link to="/register">Join here</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const res = await axios.post('https://blog-app-server-v3zf.onrender.com/api/users/login', {
      email: email.value,
      password: password.value
    });
    authStore.login(res.data.token, res.data.username);
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>

<style scoped>
.auth-page {
  max-width: 380px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.auth-page h1 {
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}

.sub {
  color: var(--sage);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  background: white;
}

input:focus {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

button {
  background: var(--ink);
  color: var(--paper);
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.4rem;
}

button:hover {
  background: var(--red);
}

.error {
  color: var(--red);
  font-size: 0.85rem;
  margin-top: 1rem;
}

.switch {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--sage);
}

.switch a {
  color: var(--ink);
  font-weight: 500;
}
</style>