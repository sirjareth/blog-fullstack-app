<template>
  <router-link :to="`/post/${post._id}`" class="post-card">
    <span class="rule" />
    <div class="meta">{{ formatDate(post.createdAt) }} · {{ post.author?.fullName }}</div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content.substring(0, 140) }}{{ post.content.length > 140 ? '…' : '' }}</p>
    <span class="read-more">Read message →</span>
  </router-link>
</template>

<script setup>
defineProps({
  post: { type: Object, required: true }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.post-card {
  display: block;
  text-decoration: none;
  color: var(--ink);
  padding: 2rem 0;
  border-bottom: 1px solid var(--line);
  position: relative;
}

.rule {
  display: block;
  width: 32px;
  height: 3px;
  background: var(--red);
  margin-bottom: 1rem;
}

.meta {
  font-size: 0.8rem;
  color: var(--sage);
  margin-bottom: 0.6rem;
}

.post-card h3 {
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
}

.post-card p {
  color: #4a4a5a;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.read-more {
  font-size: 0.85rem;
  color: var(--red);
  font-weight: 500;
}

.post-card:hover h3 {
  color: var(--red);
}
</style>