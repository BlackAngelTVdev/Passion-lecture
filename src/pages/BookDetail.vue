<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import api from '@/services/api'
import { getConnectedUser, getConnectedUserId } from '@/composables/useAuth'

const route = useRoute()
const book = ref(null)
const users = ref([])
const loading = ref(true)
const showModal = ref(false)
const newComment = ref('')
const userRating = ref(0)

// --- LOGIQUE UTILISATEUR ---

const canEdit = computed(() => {
    const user = getConnectedUser()
    if (!user || !book.value) return false

    const isOwner = user.id === book.value.userId
    const isAdmin = user.admin === true

    return isOwner || isAdmin
})

const getUserName = (userId) => {
    const user = users.value.find(u => u.id == userId)
    return user ? user.username : `Utilisateur ${userId}`
}

// --- LOGIQUE SCORING ---

const averageRating = computed(() => {
    if (!book.value || !book.value.rates || book.value.rates.length === 0) return "N/A"
    const sum = book.value.rates.reduce((acc, curr) => acc + curr.value, 0)
    return (sum / book.value.rates.length).toFixed(1)
})

const totalVotes = computed(() => {
    return book.value?.rates?.length || 0
})

// --- ACTIONS ---

onMounted(async () => {
    const id = route.params.id
    try {
        const [bookData, usersData] = await Promise.all([
            api.getBookById(id),
            api.getUsers()
        ])
        book.value = bookData
        users.value = usersData

        // Check si l'utilisateur a déjà noté ce livre
        const userId = getConnectedUserId()
        if (userId && book.value.rates) {
            const existingRate = book.value.rates.find(r => r.userId === userId)
            if (existingRate) userRating.value = existingRate.value
        }
    } catch (err) {
        console.error("Erreur de chargement :", err)
    } finally {
        loading.value = false
    }
})

const submitRating = async (ratingValue) => {
    const userId = getConnectedUserId()
    if (!userId) return alert("Connecte-toi pour noter !")

    const rateObj = { userId, value: ratingValue }
    const updatedBook = { ...book.value }
    if (!updatedBook.rates) updatedBook.rates = []

    const existingRateIndex = updatedBook.rates.findIndex(r => r.userId === userId)
    if (existingRateIndex !== -1) {
        updatedBook.rates[existingRateIndex] = rateObj
    } else {
        updatedBook.rates.push(rateObj)
    }

    try {
        await api.updateBook(book.value.id, updatedBook)
        book.value = updatedBook
        userRating.value = ratingValue
    } catch (err) {
        console.warn("Update serveur impossible, sauvegarde en cache local...")
        book.value = updatedBook
        api._saveToCache(`book_${book.value.id}`, updatedBook)
    }
}

const submitComment = async () => {
    if (newComment.value.trim() === "") return
    const userId = getConnectedUserId()
    if (!userId) return alert("Connecte-toi pour commenter !")

    const commentObj = {
        id: Date.now(),
        userId: userId,
        title: newComment.value
    }

    const updatedBook = { ...book.value }
    if (!updatedBook.comments) updatedBook.comments = []
    updatedBook.comments.push(commentObj)

    try {
        await api.updateBook(book.value.id, updatedBook)
        book.value = updatedBook
        closeModal()
    } catch (err) {
        console.warn("Serveur injoignable, update cache seulement.")
        book.value = updatedBook
        api._saveToCache(`book_${book.value.id}`, updatedBook)
        closeModal()
    }
}

const openModal = () => showModal.value = true
const closeModal = () => {
    showModal.value = false
    newComment.value = ""
}
</script>

<template>
    <div class="app-wrapper">
        <main class="content">
            <div class="container">
                <div v-if="loading" class="loader">Chargement...</div>

                <div v-else-if="book" class="book-detail">
                    <img :src="book.image || 'https://via.placeholder.com/450x600?text=Lien+Vide'"
                        @error="(e) => { e.target.src = 'https://placehold.co/400x600/red/white?text=Image+Introuvable' }"
                        :alt="book.title">

                    <div class="book-info-content">
                        <div class="header-row">
                            <h1>{{ book.title }}</h1>
                            <span class="category-tag">{{ book.category }}</span>
                        </div>

                        <div class="meta-container">
                            <div class="rating-box">
                                <div><span class="rating-value">{{ averageRating }}</span>
                                    <span class="star-main">★</span>
                                    <span class="total-votes">({{ totalVotes }} {{ totalVotes > 1 ? 'avis' : 'avis'
                                        }})</span>
                                </div>


                                <div class="rating-stars">
                                    <span v-for="star in 5" :key="star" @click="submitRating(star)"
                                        :class="['star-clickable', { active: star <= userRating }]">
                                        ★
                                    </span>
                                </div>
                            </div>

                            <div class="meta-data">
                                {{ book.nbpages }} pages | Sorti en {{ book.published }} <br>
                                Écrit par <strong>{{ book.author }}</strong> | édité par {{ book.editor }}
                            </div>
                        </div>

                        <p class="resume-text">{{ book.resume }}</p>

                        <div class="extedit">
                            <a :href="book.extrait" target="_blank" class="btn-extrait">Lire un extrait</a>
                            <router-link :to="{ name: 'EditBook', params: { id: book.id } }" class="edit"
                                v-if="canEdit">
                                Modifier
                            </router-link>
                        </div>

                        <div class="comment-section">
                            <div class="header-row">
                                <h3>Commentaires</h3>
                                <button @click="openModal" class="category-tag add-tag"
                                    style="cursor: pointer; border: none;">
                                    + Ajouter
                                </button>
                            </div>

                            <div v-if="book.comments && book.comments.length > 0">
                                <div v-for="comment in book.comments" :key="comment.id" class="comment-card">
                                    <p><strong>{{ getUserName(comment.userId) }}</strong></p>
                                    <p>{{ comment.title }}</p>
                                </div>
                            </div>
                            <p v-else>Pas encore de commentaires...</p>
                        </div>

                        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                            <div class="modal-content">
                                <h2 style="font-family: 'Jaro';">Laisse ton avis</h2>
                                <textarea v-model="newComment" placeholder="Alors, ce bouquin ?"
                                    class="comment-textarea"></textarea>
                                <div class="modal-actions">
                                    <button @click="closeModal" class="btn-extrait"
                                        style="border:none; background:none; cursor:pointer;">Annuler</button>
                                    <button @click="submitComment" class="category-tag"
                                        style="border:none; cursor:pointer;">Poster</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>Livre introuvable.</div>
            </div>
        </main>
    </div>
</template>

<style scoped src="@/assets/css/bookDetail.css"></style>