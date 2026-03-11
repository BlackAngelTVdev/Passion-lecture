<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import '@/assets/css/app.css'
import LoginComponent from './login.vue'
import RegisterComponent from './register.vue'

const route = useRoute()
const showLogin = ref(false)
const showRegister = ref(false)

watch(route, (to) => {
  if (to.query.authRequired === 'true') {
    showLogin.value = true
  }
})

onMounted(() => {
  if (route.query.authRequired === 'true') {
    showLogin.value = true
  }
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

      <button class="Button" @click="showLogin = true">Login</button>
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
