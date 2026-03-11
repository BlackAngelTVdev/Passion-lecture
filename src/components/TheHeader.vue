<script setup>
import '@/assets/css/app.css'
</script>
<script>
import LoginComponent from './login.vue'
import RegisterComponent from './register.vue'
export default {
  data() {
    return {
      showLogin: false,
      showRegister: false,
    }
  },
  watch: {
    // On surveille les changements de route
    $route(to) {
      if (to.query.authRequired === 'true') {
        this.showLogin = true
      }
    },
  },
  mounted() {
    // Vérification aussi au chargement initial
    if (this.$route.query.authRequired === 'true') {
      this.showLogin = true
    }
  },
}
</script>

<template>
  <header>
    <router-link to="/">
      <h1>Passion Lecture</h1>
    </router-link>
    <nav>
      <router-link :to="{ name: 'AjoutLivre' }" class="Button">Ajouter</router-link>
      <router-link :to="{ name: 'Livres' }" class="Button">Livres</router-link>

      <button class="Button" @click="showLogin = true">Login</button>
      <LoginComponent v-if="showLogin" @close="showLogin = false"
        @switch-to-register="((showLogin = false), (showRegister = true))" />
      <RegisterComponent v-if="showRegister" @close="showRegister = false"
        @switch-to-login="((showRegister = false), (showLogin = true))" />
    </nav>
  </header>
</template>
