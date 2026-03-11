<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import '@/assets/css/addBook.css'
import { getConnectedUserId } from '@/composables/useAuth'

const router = useRouter()

const form = ref({
  title: '',
  author: '',
  category: '',
  published: '',
  nbpages: '',
  editor: '',
  resume: '',
  extrait: '',
  image: '',
})

const error = ref(null)
const success = ref(false)
const isLoading = ref(false)

const categories = [
  'Fantasy',
  'Science-Fiction',
  'Romance',
  'Thriller',
  'Policier',
  'Horreur',
  'Historique',
  'Biographie',
  'Autre',
]

async function handleSubmit() {
  error.value = null
  success.value = false
  isLoading.value = true

  try {
    await api.addBook({
      id: Date.now(),
      ...form.value,
      userId: getConnectedUserId(), // On associe le livre à l'utilisateur connecté,
    })
    success.value = true
    setTimeout(() => router.push({ name: 'Books' }), 1500)
  } catch (err) {
    error.value = "Erreur lors de l'ajout du livre."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function goBack() {
  router.back()
}
</script>
<script scoped>
import '@/assets/css/addBook.css'
</script>

<template>
  <div class="add-wrapper">
    <div class="add-container">
      <p v-if="error" class="add-error">{{ error }}</p>
      <p v-if="success" class="add-success">Livre ajouté avec succès ! Redirection...</p>

      <form @submit.prevent="handleSubmit" class="add-form">
        <!-- Titre | Auteur -->
        <div class="form-row">
          <div class="form-group">
            <label for="title">Titre</label>
            <input id="title" v-model="form.title" type="text" required />
          </div>
          <div class="form-group">
            <label for="author">Nom complete de l'écrivain</label>
            <input id="author" v-model="form.author" type="text" required />
          </div>
        </div>

        <!-- Catégorie | Éditeur -->
        <div class="form-row">
          <div class="form-group">
            <label for="category">Catégorie</label>
            <select id="category" v-model="form.category" required>
              <option value="" disabled></option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editor">Éditeur</label>
            <input id="editor" v-model="form.editor" type="text" />
          </div>
        </div>

        <!-- Nombre de pages | Année d'édition -->
        <div class="form-row">
          <div class="form-group">
            <label for="nbpages">Nombre de pages</label>
            <input id="nbpages" v-model="form.nbpages" type="number" min="1" />
          </div>
          <div class="form-group">
            <label for="published">Année d'édition</label>
            <input id="published" v-model="form.published" type="number" />
          </div>
        </div>

        <!-- Extrait | Couverture -->
        <div class="form-row form-row-bottom">
          <div class="form-col-left">
            <div class="form-group">
              <label for="extrait">Lien d'un extrait</label>
              <input id="extrait" v-model="form.extrait" type="url" />
            </div>

            <!-- Résumé de l'ouvrage -->
            <div class="form-group">
              <label for="resume">Résumé de l'ouvrage</label>
              <textarea id="resume" v-model="form.resume" rows="13"></textarea>
            </div>
          </div>

          <div class="form-col-right">
            <div class="form-group">
              <label for="image">Couverture</label>
              <input id="image" v-model="form.image" type="url" placeholder="URL de l'image" />
            </div>

            <div class="preview-publish-row">
              <div class="image-preview">
                <img v-if="form.image" :src="form.image" alt="Couverture" />
                <span v-else class="image-placeholder">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  ></svg>
                </span>
              </div>
              <div class="publish-side">
                <button class="button" @click="goBack">Annuler</button>
                <button class="button" type="button" :disabled="isLoading" @click="handleSubmit">
                  {{ isLoading ? 'Publication...' : 'Publier' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="form-actions"></div>
    </div>
  </div>
</template>
