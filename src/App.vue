<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import '@/assets/css/home.css'
import '@/assets/css/app.css'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

const books = ref([])
const users = ref([])
const error = ref(null)

const latestBooks = computed(() => {
  return books.value.slice(-5).reverse()
})

onMounted(async () => {
  try {
    // 2. On récupère les deux listes
    books.value = await api.getBooks()
    users.value = await api.getUsers()
  } catch (err) {
    error.value = 'Impossible de charger les données.'
    console.error(err)
  }
})

// 3. La fonction de recherche qui utilise users.value
const getUserName = (userId) => {
  if (!users.value.length) return 'Chargement...'
  const userFound = users.value.find((u) => u.id === userId)
  return userFound ? userFound.username : 'Inconnu'
}
</script>

<template>
  <div class="app-wrapper">
    <TheHeader />

    <main class="content">
      <div class="container">
        <h2 class="main-title">Un endroit pour vos livres</h2>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-else class="book-grid">
          <div v-for="book in latestBooks" :key="book.id" class="book-card">
            <img :src="book.image" :alt="book.title" class="book-image" />

            <div class="book-info">
              <span class="title-author">{{ book.title }} | {{ book.author }}</span>
              <span class="user-label">Par : {{ getUserName(book.userId) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>
