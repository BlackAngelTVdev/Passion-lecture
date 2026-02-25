<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import api from '@/services/api'
import '@/assets/css/app.css'

const route = useRoute()
const book = ref(null)
const users = ref([]) // Pour stocker la liste des users
const showModal = ref(false)
const newComment = ref("")

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

const openModal = () => {
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    newComment.value = ""
}
const getConnectedUserId = () => {
    const userData = localStorage.getItem('user')
    if (!userData) return null // Personne n'est connecté

    const user = JSON.parse(userData)
    return user.id // On récupère l'ID du user stocké
}

const submitComment = async () => {
    if (newComment.value.trim() === "") return

    const commentObj = {
        id: Date.now(),
        userId: getConnectedUserId(),
        title: newComment.value
    }

    // On prépare la mise à jour localement
    const updatedBook = { ...book.value }
    if (!updatedBook.comments) updatedBook.comments = []
    updatedBook.comments.push(commentObj)

    try {
        // On tente d'envoyer au serveur
        await api.updateBook(book.value.id, updatedBook)

        // Si ça marche, on met à jour l'affichage
        book.value = updatedBook
        closeModal()
    } catch (err) {
        // SI ERREUR (Livre inconnu du serveur car ajouté en cache)
        console.warn("Le serveur ne connaît pas ce livre, on update seulement le cache.")

        // On force quand même la mise à jour locale et dans le cache
        book.value = updatedBook
        api._saveToCache(`book_${book.value.id}`, updatedBook)

        closeModal()
    }
}
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
                            <div class="header-row">
                                <h3>Commentaires</h3>
                                <button @click="openModal" class="category-tag add-tag"
                                    style="cursor: pointer; border: none;">+
                                    Ajouter</button>
                            </div>

                            <div v-if="book && book.comments && book.comments.length > 0">
                                <div v-for="comment in book.comments" :key="comment.id" class="comment-card">
                                    <p><strong>{{ getUserName(comment.userId) }}</strong></p>
                                    <p>{{ comment.title }}</p>
                                </div>
                            </div>
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
            </div>
        </main>
    </div>
</template>