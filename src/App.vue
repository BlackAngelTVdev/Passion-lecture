<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import '@/assets/css/home.css'
import '@/assets/css/app.css'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
const books = ref([])
const error = ref(null)

const latestBooks = computed(() => {
  return books.value.slice(-5).reverse()
})

onMounted(async () => {
  try {
    books.value = await api.getBooks()
  } catch (err) {
    error.value = 'Impossible de charger les données.'
    console.error(err)
  }
})
</script>

<template>
  <TheHeader />
  <div class="container">
    <h2 class="main-title">Un endroit pour vos livres</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-else class="book-grid">
      <div v-for="book in latestBooks" :key="book.id" class="book-card">
        <img :src="`${book.image}`" :alt="book.title" class="book-image" />
        <div class="book-info">
          <span class="title-author">{{ book.title }} | {{ book.author }}</span>
          <span class="user-label">user</span>
        </div>
      </div>
    </div>
  </div>
  <TheFooter />
</template>