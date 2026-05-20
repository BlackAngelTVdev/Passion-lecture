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
const commentError = ref('')
const isSubmittingComment = ref(false)

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
    const exact = sum / book.value.rates.length
    return (Math.round(exact*2) / 2).toFixed(1)
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

    try {
        await api.rateBook(book.value.id, ratingValue)
        // Recharger le livre pour avoir les données à jour depuis la DB
        book.value = await api.getBookById(book.value.id)
        userRating.value = ratingValue
    } catch (err) {
        console.error('Erreur de notation :', err)
        alert('Impossible de noter ce livre pour le moment.')
    }
}

const submitComment = async () => {
    const trimmedComment = newComment.value.trim()
    if (!trimmedComment) {
        commentError.value = "Écris un commentaire avant d'envoyer."
        return
    }
    if (!book.value?.id) {
        commentError.value = "Livre introuvable."
        return
    }

    try {
        commentError.value = ""
        isSubmittingComment.value = true
        await api.addComment(book.value.id, trimmedComment)
        book.value = await api.getBookById(book.value.id)
        closeModal()
    } catch (err) {
        console.error("Erreur commentaire :", err)
        commentError.value = err?.message ?? "Impossible d'ajouter le commentaire"
    } finally {
        isSubmittingComment.value = false
    }
}

const openModal = () => showModal.value = true
const closeModal = () => {
    showModal.value = false
    newComment.value = ""
    commentError.value = ""
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
                                    <p><strong>{{ comment.username || getUserName(comment.userId) }}</strong></p>
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
                                <p v-if="commentError" class="comment-error" style="color:#b00020; font-weight:600;">
                                    {{ commentError }}
                                </p>
                                <div class="modal-actions">
                                    <button @click="closeModal" class="btn-extrait"
                                        style="border:none; background:none; cursor:pointer;">Annuler</button>
                                    <button @click.prevent.stop="submitComment" class="category-tag"
                                        :disabled="isSubmittingComment" type="button"
                                        style="border:none; cursor:pointer;">
                                        {{ isSubmittingComment ? 'Envoi...' : 'Poster' }}
                                    </button>
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