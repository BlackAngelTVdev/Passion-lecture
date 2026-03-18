<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { getConnectedUserId } from '@/composables/useAuth'
import { useSelectCategory } from '@/composables/selectCategory'
import { useSelectEditeur } from '@/composables/selectEditeur'
import BookForm from '@/components/BookForm.vue'

const router = useRouter()

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
})

const error = ref(null)
const success = ref(false)
const isLoading = ref(false)

onMounted(async () => {
  try {
    books.value = await api.getBooks()
  } catch (err) {
    console.error('Erreur lors du chargement des livres:', err)
  }
})

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

<template>
  <div class="add-wrapper">
    <div class="add-container">
      <p v-if="error" class="add-error">{{ error }}</p>
      <p v-if="success" class="add-success">Livre ajouté avec succès ! Redirection...</p>

      <BookForm
        :form="form"
        :categories="categories"
        :editeurs="editeurs"
        :is-loading="isLoading"
        mode="create"
        @submit="handleSubmit"
        @cancel="goBack"
      />
      <div class="form-actions"></div>
    </div>
  </div>
</template>

<style scoped src="@/assets/css/addBook.css"></style>
