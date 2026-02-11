<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'


const books = ref([])
const users = ref([])
const error = ref(null)
const selectedCategory = ref('Tous')

const categories = computed(() => {
  // On récupère toutes les catégories des livres
  const allCategories = books.value.map(book => book.category)
  
  // On utilise "Set" pour supprimer les doublons (ex: éviter d'avoir 4 fois 'Fantasy')
  const uniqueCategories = [...new Set(allCategories)]
  
  // On ajoute 'Tous' au début et on trie par ordre alphabétique
  return ['Tous', ...uniqueCategories.sort()]
})

const filteredBooks = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return books.value
  }
  return books.value.filter(book => book.category === selectedCategory.value)
})

onMounted(async () => {
  try {
    // On récupère les deux listes
    books.value = await api.getBooks()
    users.value = await api.getUsers()
  } catch (err) {
    error.value = 'Impossible de charger les données.'
    console.error(err)
  }
})

// La fonction de recherche qui utilise users.value
const getUserName = (userId) => {
  if (!users.value.length) return 'Chargement...'
  const userFound = users.value.find((u) => u.id === userId)
  return userFound ? userFound.username : 'Inconnu'
}
</script>
<script scoped>
import '@/assets/css/liste.css'
</script>

<template>
  <div class="app-wrapper">

    <main class="content">
      <div class="categorie">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="{ active: selectedCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>

      <div class="container">

        <p v-if="error" class="error">{{ error }}</p>

        <div v-else class="book-grid">
          <div v-for="book in filteredBooks" :key="book.id" class="book-card">
            <img :src="book.image" :alt="book.title" class="book-image" />

            <div class="book-info">
              <span>
                <router-link to="'/livre/' + book.id" class="title-author">{{ book.title }} | {{ book.author }}</router-link>
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
