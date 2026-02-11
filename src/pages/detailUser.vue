<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/services/api'
const route = useRoute()
const user = ref(null)

onMounted(async () => {
    const id = route.params.id
    try {

        user.value = await api.getUserById(id)
    } catch (err) {
        console.error("Erreur lors de la récup de l'utilisateur", err)
    }
})
</script>
<script scoped>
import '@/assets/css/detailUser.css'
</script>
<template>
    <div class="app-wrapper">
        <main class="content">
            <div class="container">
                <div v-if="user" class="user-detail">
                    <div class="book-info-content">
                        <div class="header-row">
                            <h1>{{ user.username }}</h1>
                            <span class="category-tag">{{ book.category }}</span>
                        </div>

                        <div class="meta-data">
                            nombre d'ouvrages : {{ user.nblivre }}<br>
                            Nombre d'appréciations : {{ user.nbrate }}<br>
                            Nombre de commentaires : {{ user.nbcomm }}
                        </div>

                        <p class="resume-text">{{ book.resume }}</p>

                        <a :href="book.extrait" target="_blank" class="btn-extrait">Commencer un lire</a>

                        <div class="comment-section">
                            <h3>Commentaire</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>