<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import '@/assets/css/login.css'

const emit = defineEmits<{
  close: []
  'switch-to-register': []
}>()

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const router = useRouter()

async function handleLogin() {
  error.value = null
  try {
    const users = await api.getUsers()

    const foundUser = users.find(
      (u: any) => u.username === username.value && u.password === password.value,
    )

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser))
      emit('close')
      router.push('/')
    } else {
      error.value = 'Identifiants incorrects'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Le serveur My JSON Server ne répond pas correctement.'
  }
}
</script>

<template>
  <div class="login-overlay">
    <div class="login-container">
      <button class="close-button" @click="emit('close')">×</button>

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
          <a href="#" @click.prevent="emit('switch-to-register')">S'inscrire</a>
        </div>
      </form>
    </div>
  </div>
</template>
