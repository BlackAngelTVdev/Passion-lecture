<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
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
    <router-view />
    <TheFooter />
  </div>
</template>