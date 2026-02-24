<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import api from '@/services/api'
import '@/assets/css/app.css'

const route = useRoute()
const book = ref(null)
const users = ref([]) // Pour stocker la liste des users

// Calcul de la moyenne des notes
const averageRating = computed(() => {
    if (!book.value || !book.value.rates || book.value.rates.length === 0) return "N/A"
    const sum = book.value.rates.reduce((acc, curr) => acc + curr.value, 0)
    return (sum / book.value.rates.length).toFixed(1)
})

const getUserName = (userId) => {
    const user = users.value.find(u => u.id == userId)
    return user ? user.username : `Utilisateur ${userId}`
}

onMounted(async () => {
    const id = route.params.id
    try {
        const [bookData, usersData] = await Promise.all([
            api.getBookById(id),
            api.getUsers()
        ])
        book.value = bookData
        users.value = usersData
    } catch (err) {
        console.error("Erreur :", err)
    } finally {
        loading.value = false
    }
})
</script>
<script scoped>
import '@/assets/css/detaillivre.css'
</script>

<template>
    <div class="app-wrapper">
        <main class="content">
            <div class="container">
                <div v-if="book" class="book-detail">
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
                                <span class="rating-value">{{ averageRating }}</span>
                                <span class="star">★</span>
                            </div>

                            <div class="meta-data">
                                {{ book.nbpages }} pages | Sorti en {{ book.published }} <br>
                                Écrit par <strong>{{ book.author }}</strong> | édité par {{ book.editor }}
                            </div>
                        </div>


                        <p class="resume-text">{{ book.resume }}</p>

                        <a :href="book.extrait" target="_blank" class="btn-extrait">Lire un extrait</a>

                        <div class="comment-section">
                            <h3>Commentaires</h3>

                            <div v-if="loading">Chargement...</div>

                            <div v-else-if="book && book.comments && book.comments.length > 0">
                                <div v-for="comment in book.comments" :key="comment.id" class="comment-card">
                                    <p><strong>{{ getUserName(comment.userId) }}</strong></p>
                                    <p>{{ comment.title }}</p>
                                </div>
                            </div>

                            <p v-else>Aucun commentaire pour le moment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>