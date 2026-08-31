<template>
  <article class="post-detail" v-if="post">
    <router-link to="/" class="back">← Back</router-link>
    <p class="meta">{{ formatDate(post.createdAt) }} · By {{ post.author?.fullName }}</p>
    <h1>{{ post.title }}</h1>
    <p class="content">{{ post.content }}</p>

    <div v-if="isAuthor" class="actions">
      <div v-if="!isEditing">
        <button class="edit" @click="isEditing = true">Edit</button>
        <button class="danger" @click="handleDelete">Delete post</button>
      </div>

      <form v-else @submit.prevent="handleUpdate" class="edit-form">
        <input v-model="editTitle" type="text" required />
        <textarea v-model="editContent" rows="8" required></textarea>
        <div class="edit-actions">
          <button type="submit">Save changes</button>
          <button type="button" class="cancel" @click="isEditing = false">Cancel</button>
        </div>
      </form>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const post = ref(null);
// edit
const isEditing = ref(false);
const editTitle = ref('');
const editContent = ref('');

const isAuthor = computed(() => post.value?.author?.fullName === authStore.fullName);

const fetchPost = async () => {
  try {
    const res = await axios.get(`https://blog-app-server-v3zf.onrender.com/api/posts/${route.params.id}`);
    post.value = res.data;
    editTitle.value = res.data.title;
    editContent.value = res.data.content;
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async () => {
  try {
    await axios.delete(
      `https://blog-app-server-v3zf.onrender.com/api/posts/${route.params.id}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );
    router.push('/');
  } catch (err) {
    console.error(err);
  }
};

const handleUpdate = async () => {
  try {
    const res = await axios.put(
      `https://blog-app-server-v3zf.onrender.com/api/posts/${route.params.id}`,
      { title: editTitle.value, content: editContent.value },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );
    post.value.title = res.data.updatedPost.title;
    post.value.content = res.data.updatedPost.content;
    isEditing.value = false;
  } catch (err) {
    console.error(err);
  }
};
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

onMounted(fetchPost);
</script>

<style scoped>
.post-detail {
  max-width: 680px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

.back {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--sage);
  text-decoration: none;
  margin-bottom: 2rem;
}

.back:hover {
  color: var(--red);
}

.meta {
  font-size: 0.85rem;
  color: var(--sage);
  margin-bottom: 0.8rem;
}

.post-detail h1 {
  font-size: 2.4rem;
  margin-bottom: 2rem;
}

.content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2c2c3a;
  white-space: pre-wrap;
}

.actions {
  margin-top: 3rem;
  border-top: 1px solid var(--line);
  padding-top: 2rem;
}

.danger {
  background: transparent;
  border: 1px solid var(--red);
  color: var(--red);
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  cursor: pointer;
  font-size: 0.9rem;
}

.danger:hover {
  background: var(--red);
  color: white;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.edit-form input,
.edit-form textarea {
  padding: 0.8rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
}

.edit-actions {
  display: flex;
  gap: 0.8rem;
}

.edit,
.cancel {
  background: transparent;
  border: 1px solid var(--line);
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  cursor: pointer;
  color: var(--ink);
  margin-right: 0.5rem;
}

.edit:hover {
  border-color: var(--sage);
}

.edit-actions button[type="submit"] {
  background: var(--ink);
  color: var(--paper);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  cursor: pointer;
}
</style>