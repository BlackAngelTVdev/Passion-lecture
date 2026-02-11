<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'


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
<script scoped>
import '@/assets/css/home.css'
</script>

<template>
  <div class="app-wrapper">
    <router-view />
    <main class="content">
      <div class="container">
        <h2 class="main-title">Un endroit pour vos livres</h2>
        <p class="main-subtitle">
          Plongez dans votre bibliothèque numérique personnelle. Explorez nos derniers titres,
          consultez les résumés et survolez les extraits en un instant.
          Notez vos lectures et partagez vos coups de cœur avec la communauté!
        </p>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-else class="book-grid">
          <div v-for="book in latestBooks" :key="book.id" class="book-card">
            <img :src="book.image" :alt="book.title" class="book-image" />

            <div class="book-info">
              <span>
                <router-link :to="`/livre/${book.id}`" class="title-author">{{ book.title }} | {{ book.author
                }}</router-link>

              </span>
              <span>
                <router-link to="" class="user-label">Par : {{ getUserName(book.userId) }}</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
