<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import '@/assets/css/addBook.css'
import { getConnectedUser } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const bookId = route.params.id

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
  userId: null,
})

const error = ref(null)
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

onMounted(async () => {
  try {
    const book = await api.getBookById(bookId)
    const currentUser = getConnectedUser()

    if (!currentUser) {
      router.push('/login')
      return
    }

    const isAdmin = currentUser.admin
    const isOwner = currentUser.id === book.userId

    if (!isAdmin && !isOwner) {
      alert("Tu n'as pas le droit de modifier ce livre !")
      router.push({ name: 'Books' })
      return
    }

    form.value = { ...book }
  } catch (err) {
    error.value = 'Impossible de charger le livre.'
  }
})

async function handleUpdate() {
  isLoading.value = true
  error.value = null
  try {
    let currentBook
    try {
      currentBook = await api.getBookById(bookId)
    } catch (e) {
      currentBook = { ...form.value }
    }

    const finalData = { ...currentBook, ...form.value }

    try {
      await api.updateBook(bookId, finalData)
    } catch (serverErr) {
      api._saveToCache(`book_${bookId}`, finalData)
      const allBooks = api._getFromCache('all_books')
      if (allBooks) {
        const updatedList = allBooks.map((b) => (b.id == bookId ? finalData : b))
        api._saveToCache('all_books', updatedList)
      }
    }
    alert('Modification enregistrée !')
    router.push({ name: 'BookDetail', params: { id: bookId } })
  } catch (err) {
    error.value = 'Erreur critique lors de la modif.'
  } finally {
    isLoading.value = false
  }
}

async function handleDelete() {
  if (!confirm('Es-tu sûr de vouloir supprimer ce livre ?')) return
  isLoading.value = true
  try {
    await api.deleteBook(bookId)
    alert('Livre supprimé avec succès.')
    router.push({ name: 'Books' })
  } catch (err) {
    error.value = 'Erreur lors de la suppression.'
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

      <form @submit.prevent="handleUpdate" class="add-form">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Titre</label>
            <input id="title" v-model="form.title" type="text" required />
          </div>
          <div class="form-group">
            <label for="author">Nom complet de l'écrivain</label>
            <input id="author" v-model="form.author" type="text" required />
          </div>
        </div>

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

        <div class="form-row form-row-bottom">
          <div class="form-col-left">
            <div class="form-group">
              <label for="extrait">Lien d'un extrait</label>
              <input id="extrait" v-model="form.extrait" type="url" />
            </div>

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
                <button
                  type="button"
                  @click="handleDelete"
                  :disabled="isLoading"
                  style="width: 100%"
                >
                  {{ isLoading ? '...' : 'Supprimer' }}
                </button>

                <button type=" submit" :disabled="isLoading" style="width: 100%">
                  {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>

                <button type="button" @click="goBack" style="width: 100%">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
