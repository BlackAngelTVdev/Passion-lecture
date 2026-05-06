<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'
import { getConnectedUser } from '@/composables/useAuth'
import { useSelectCategory } from '@/composables/selectCategory'
import { useSelectEditeur } from '@/composables/selectEditeur'
import BookForm from '@/components/BookForm.vue'

const router = useRouter()
const route = useRoute()
const bookId = route.params.id

const books = ref([])
const { categories } = useSelectCategory(books)
const { editeurs } = useSelectEditeur(books)

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

onMounted(async () => {
  try {
    books.value = await api.getBooks()
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

    await api.updateBook(bookId, finalData)
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

<template>
  <div class="add-wrapper">
    <div class="add-container">
      <p v-if="error" class="add-error">{{ error }}</p>

      <BookForm
        :form="form"
        :categories="categories"
        :editeurs="editeurs"
        :is-loading="isLoading"
        mode="edit"
        @submit="handleUpdate"
        @delete="handleDelete"
        @cancel="goBack"
      />
    </div>
  </div>
</template>

<style scoped src="@/assets/css/addBook.css"></style>
