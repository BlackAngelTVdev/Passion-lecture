<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue' // Ajoute computed
import api from '@/services/api'
import '@/assets/css/app.css'

const route = useRoute()
const book = ref(null)

// Calcul de la moyenne des notes
const averageRating = computed(() => {

    if (!book.value || !book.value.rates || book.value.rates.length === 0) return "N/A"
    const sum = book.value.rates.reduce((acc, curr) => acc + curr.value, 0)
    const result = sum / book.value.rates.length
    return result.toFixed(1)
})
onMounted(async () => {
    const id = route.params.id
    try {
        book.value = await api.getBookById(id)
    } catch (err) {
        console.error("Erreur lors de la récup du livre", err)
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

                        <a :href="book.extrait" target="_blank" class="btn-extrait">Commencer un lire</a>

                        <div class="comment-section">
                            <h3>Commentaires</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>