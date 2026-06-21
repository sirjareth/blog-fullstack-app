<template>
  <div class="home">
    <header class="hero">
      <p class="eyebrow">Reflections from the training</p>
      <h1>What our trainees say</h1>
    </header>

    <div v-if="posts.length === 0" class="empty">
      No reflections shared yet. Be the first.
    </div>

    <div class="post-list">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PostCard from '../components/PostCard.vue';

const posts = ref([]);

const fetchPosts = async () => {
  try {
    const res = await axios.get('https://blog-app-server-v3zf.onrender.com/api/posts');
    posts.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchPosts);
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

.hero {
  margin-bottom: 3rem;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 0.5rem;
}

.hero h1 {
  font-size: 2.6rem;
}

.empty {
  color: var(--sage);
  font-style: italic;
  padding: 2rem 0;
}

.post-list {
  display: flex;
  flex-direction: column;
}
</style>