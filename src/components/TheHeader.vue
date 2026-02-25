<script setup>
import '@/assets/css/app.css'
</script>
<script>
import LoginComponent from './login.vue'
export default {
  data() {
    return {
      showLogin: false
    }
  },
  watch: {
    // On surveille les changements de route
    '$route'(to) {
      if (to.query.authRequired === 'true') {
        this.showLogin = true
      }
    }
  },
  mounted() {
    // Vérification aussi au chargement initial
    if (this.$route.query.authRequired === 'true') {
      this.showLogin = true
    }
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <header>
    <router-link to="/">
      <h1>Passion Lecture</h1>
    </router-link>
    <nav>
      <router-link to="/add" class="Button">Ajouter</router-link>
      <router-link to="/livres" class="Button">Livres</router-link>

      <button class="Button" @click="showLogin = true">Login</button>
      <LoginComponent v-if="showLogin" @close="showLogin = false" />
    </nav>
  </header>
</template>