<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/css/register.css'

const emit = defineEmits<{
  close: []
  'switch-to-login': []
}>()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref<string | null>(null)

async function handleRegister() {
  error.value = null
  try {
    if (password.value !== confirmPassword.value) {
      error.value = 'Les mots de passe ne correspondent pas'
      return
    }
  } catch (err) {
    console.error(err)
    error.value = 'Le serveur My JSON Server ne répond pas correctement.'
  }
}
</script>

<template>
  <div class="register-overlay">
    <div class="register-container">
      <button class="close-button" @click="emit('close')">×</button>

      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Pseudo</label>
          <input v-model="username" type="text" placeholder="Pseudo" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" placeholder="Mot de passe" required />
        </div>

        <div class="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>

        <button type="submit">S'INSCRIRE</button>
        <p v-if="error" class="error-text" style="color: red">{{ error }}</p>

        <div class="register-links">
          <a href="#" @click.prevent="emit('switch-to-login')">Déjà inscrit ?</a>
        </div>
      </form>
    </div>
  </div>
</template>
