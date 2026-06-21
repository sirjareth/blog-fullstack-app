<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
:root {
  --paper: #FAF7F2;
  --ink: #1A1A2E;
  --red: #C1432E;
  --sage: #7A8B7F;
  --gold: #C9A66B;
  --line: #E4DFD3;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}

a {
  color: var(--red);
}

button {
  font-family: 'Inter', sans-serif;
}
</style>