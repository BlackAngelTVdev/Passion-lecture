<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import LoginComponent from './Login.vue'
import RegisterComponent from './Register.vue'

const route = useRoute()
const showLogin = ref(false)
const showRegister = ref(false)
const connectedUser = ref(null)

const refreshUser = () => {
  const userData = localStorage.getItem('user')
  connectedUser.value = userData ? JSON.parse(userData) : null
}

const logout = async () => {
  try {
    await api.logout()
  } catch (error) {
    console.error(error)
  } finally {
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
    refreshUser()
  }
}

const handleAuthChange = () => {
  refreshUser()
}

const displayName = computed(() => connectedUser.value?.username ?? 'Utilisateur')

watch(route, (to) => {
  if (to.query.authRequired === 'true') {
    showLogin.value = true
  }
})

onMounted(() => {
  refreshUser()
  window.addEventListener('auth-changed', handleAuthChange)
  window.addEventListener('storage', handleAuthChange)

  if (route.query.authRequired === 'true') {
    showLogin.value = true
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('auth-changed', handleAuthChange)
  window.removeEventListener('storage', handleAuthChange)
})
</script>

<template>
  <header>
    <router-link to="/">
      <h1>Passion Lecture</h1>
    </router-link>
    <nav>
      <router-link :to="{ name: 'AddBook' }" class="Button">Ajouter</router-link>
      <router-link :to="{ name: 'Books' }" class="Button">Livres</router-link>

      <span v-if="connectedUser" class="Button" style="cursor: default;">Bonjour {{ displayName }}</span>
      <button v-if="connectedUser" class="Button" @click="logout">Logout</button>
      <button v-else class="Button" @click="showLogin = true">Login</button>
      <LoginComponent
        v-if="showLogin"
        @close="showLogin = false"
        @switch-to-register="((showLogin = false), (showRegister = true))"
      />
      <RegisterComponent
        v-if="showRegister"
        @close="showRegister = false"
        @switch-to-login="((showRegister = false), (showLogin = true))"
      />
    </nav>
  </header>
</template>
