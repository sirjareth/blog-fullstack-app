<template>
  <div class="auth-page">
    <h1>Join</h1>
    <p class="sub">Start writing in a few seconds.</p>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Create account</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p class="switch">Already have an account? <router-link to="/login">Sign in</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('https://blog-app-server-v3zf.onrender.com/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed';
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