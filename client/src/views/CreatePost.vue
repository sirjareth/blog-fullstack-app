<template>
  <div class="create-page">
    <h1>Share your experience</h1>
    <p class="sub">Tell us about your time in the training — what you learned, what stood out.</p>
    <form @submit.prevent="handleCreatePost">
      <input v-model="title" type="text" placeholder="Give your reflection a title" required />
      <textarea v-model="content" placeholder="Share your thoughts about the training..." rows="10" required></textarea>
      <button type="submit">Share reflection</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const title = ref('');
const content = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleCreatePost = async () => {
  try {
    const res = await axios.post(
      'https://blog-app-server-v3zf.onrender.com/api/posts',
      { title: title.value, content: content.value },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );
    router.push(`/post/${res.data.post._id}`);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create post';
  }
};
</script>

<style scoped>
.create-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

.create-page h1 {
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
  gap: 1rem;
}

input, textarea {
  padding: 0.9rem 1rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  background: white;
  resize: vertical;
}

input {
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
}

textarea {
  line-height: 1.6;
}

input:focus, textarea:focus {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

button {
  align-self: flex-start;
  background: var(--ink);
  color: var(--paper);
  border: none;
  padding: 0.85rem 1.8rem;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  background: var(--red);
}

.error {
  color: var(--red);
  font-size: 0.85rem;
  margin-top: 1rem;
}
</style>