<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

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
      ...form.value,
      published: Number(form.value.published),
      nbpages: Number(form.value.nbpages),
      comments: [],
      rates: [],
      userId: 1,
    })
    success.value = true
    setTimeout(() => router.push('/Livres'), 1500)
  } catch (err) {
    error.value = "Erreur lors de l'ajout du livre."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="ajout-wrapper">
    <div class="ajout-container">
      <p v-if="error" class="ajout-error">{{ error }}</p>
      <p v-if="success" class="ajout-success">Livre ajouté avec succès ! Redirection...</p>

      <form @submit.prevent="handleSubmit" class="ajout-form">

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
            <input id="published" v-model="form.published" type="number"/>
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
              <textarea id="resume" v-model="form.resume" rows="9"></textarea>
            </div>
          </div>

          <div class="form-col-right">
            <div class="form-group">
              <label for="image">Couverture</label>
              <input
                id="image"
                v-model="form.image"
                type="url"
                placeholder="URL de l'image"
              />
            </div>

            <div class="image-preview">
              <img v-if="form.image" :src="form.image" alt="Couverture" />
              <span v-else class="image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"></svg>
              </span>
            </div>
          </div>
        </div>
      </form>

      <div class="form-actions">
        <button type="button" class="btn-submit" :disabled="isLoading" @click="handleSubmit">
          {{ isLoading ? 'Publication...' : 'Publier' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/var.css';

.ajout-wrapper {
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;
}

.ajout-container {
  background: var(--background-color);
  border: 2px solid var(--bouton-color);
  border-radius: 4px;
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 780px;
}

.ajout-error {
  background: #fde8e8;
  color: #c0392b;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.ajout-success {
  background: #e8f8e8;
  color: #27ae60;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.ajout-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-row-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.form-col-left {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.form-col-right {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.92rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  border: 1px solid #bbb;
  border-radius: 0;
  padding: 0.45rem 0.6rem;
  font-size: 0.9rem;
  color: var(--text-color);
  background: #fff;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--hf-color);
}

.form-group textarea {
  resize: vertical;
}

/* Image preview */
.image-preview {
  width: 100%;
  flex: 1;
  min-height: 150px;
  background: #e0d8c8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #bbb;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  color: #a08060;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder svg {
  width: 48px;
  height: 48px;
}

.image-url-input {
  margin-top: 0.4rem;
}

/* Boutons */

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.btn-submit {
  background: var(--bouton-color);
  color: #fff;
  border: none;
  padding: 0.5rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .form-row,
  .form-row-bottom {
    grid-template-columns: 1fr;
  }
}
</style>
