<script lang="ts">
import { defineComponent } from 'vue'
import '@/assets/css/login.css'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: null as string | null,
    }
  },
  methods: {
    async handleLogin() {
      this.error = null
      try {
        // Utilisation de My JSON Server comme demandé dans le CDC [cite: 28]
        const response = await fetch(
          `https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture/user`,
        )

        if (!response.ok) throw new Error("Erreur lors de l'accès au serveur")

        const users = await response.json()

        // Recherche de l'utilisateur avec typage explicite pour éviter les erreurs TS
        const foundUser = users.find(
          (u: any) => u.username === this.username && u.password === this.password,
        )

        if (foundUser) {
          localStorage.setItem('user', JSON.stringify(foundUser))
          this.$emit('close') // Ferme la modale automatiquement après succès
          // Optionnel : recharger la page pour mettre à jour l'affichage
          window.location.reload()
        } else {
          this.error = 'Identifiants incorrects'
        }
      } catch (err) {
        console.error(err)
        this.error = 'Le serveur My JSON Server ne répond pas correctement.'
      }
    },
  },
})
</script>

<template>
  <div class="login-overlay">
    <div class="login-container">
      <button class="close-button" @click="$emit('close')">×</button>

      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Pseudo</label>
          <input v-model="username" type="text" placeholder="Pseudo" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" placeholder="Mot de passe" required />
        </div>

        <button type="submit">SE CONNECTER</button>
        <p v-if="error" class="error-text" style="color: red">{{ error }}</p>

        <div class="login-links">
          <a href="#" @click.prevent="$emit('switch-to-register')">S'inscrire</a>
        </div>
      </form>
    </div>
  </div>
</template>
