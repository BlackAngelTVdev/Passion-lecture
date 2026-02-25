<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()
const bookId = route.params.id // On récupère l'ID dans l'URL (ex: /modifier/45)

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
    userId: null // On garde ça pour savoir qui l'a créé
})

const error = ref(null)
const isLoading = ref(false)

onMounted(async () => {
    try {
        // 1. Charger les infos du livre
        const book = await api.getBookById(bookId)

        // 2. Charger l'utilisateur connecté depuis le localstorage
        const userData = localStorage.getItem('user')
        const currentUser = userData ? JSON.parse(userData) : null

        if (!currentUser) {
            router.push('/login')
            return
        }

        // 3. LA SÉCURITÉ : Admin ou Propriétaire ?
        const isAdmin = currentUser.role === 'admin'
        const isOwner = currentUser.id === book.userId

        if (!isAdmin && !isOwner) {
            alert("Tu n'as pas le droit de modifier ce livre !")
            router.push('/livres')
            return
        }

        // 4. Si c'est bon, on remplit le formulaire
        form.value = { ...book }
    } catch (err) {
        error.value = "Impossible de charger le livre."
    }
})

async function handleUpdate() {
    isLoading.value = true
    error.value = null // On nettoie les erreurs au début

    try {
        // 1. On récupère la version actuelle du livre (pour avoir les comms et ratings)
        const currentBook = await api.getBookById(bookId)

        // 2. On crée l'objet final : 
        // On prend tout l'ancien (...currentBook) 
        // ET on écrase par dessus avec les modifs du formulaire (...form.value)
        const finalData = {
            ...currentBook,
            ...form.value
        }

        // 3. On envoie cet objet complet au serveur
        await api.updateBook(bookId, finalData)

        alert("Livre mis à jour !")
        router.push(`/livre/${bookId}`)
    } catch (err) {
        error.value = "Erreur lors de la modification."
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

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
</script>
<script scoped>
import '@/assets/css/ajoutLivre.css'
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
                        <input id="published" v-model="form.published" type="number" />
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
                            <input id="image" v-model="form.image" type="url" placeholder="URL de l'image" />
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
                <button type="button" class="btn-submit" :disabled="isLoading" @click="handleUpdate">
                    {{ isLoading ? 'Publication...' : 'Publier' }}
                </button>
            </div>
        </div>
    </div>
</template>
