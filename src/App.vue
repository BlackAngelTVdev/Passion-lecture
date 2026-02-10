<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const books = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    books.value = await api.getBooks();
  } catch (err) {
    error.value = "Impossible de charger les données.";
    console.error(err);
  }
});
</script>

<template>
  <div class="p-4">
    <h2>Ma Liste de Livres</h2>
    
    <p v-if="error" style="color: red;">{{ error }}</p>

    <div v-else class="grid">
      <div v-for="book in books" :key="book.id" class="card">
        <h3>{{ book.title }}</h3>
        <p>Auteur : {{ book.author }}</p>
        <img :src="book.image" :alt="book.title" width="100">
      </div>
    </div>
  </div>
</template>