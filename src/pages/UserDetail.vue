<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import api from '@/services/api'

const route = useRoute()
const user = ref(null)

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
}

const formattedDate = computed(() => {
    return user.value ? formatDate(user.value.createdAt) : ''
})

onMounted(async () => {
    const id = route.params.id
    try {

        user.value = await api.getUserStats(id)
    } catch (err) {
        console.error("Erreur lors de la récup de l'utilisateur", err)
    }
})
</script>

<template>
    <div class="app-wrapper" v-if="user">
        <div class="profile">
            <h1>Profil de {{ user.username }}</h1>
            <div class="meta-data">
                <p>
                    Créé le : {{ formattedDate }} <br>
                </p>
                <p>
                    Nombre d'ouvrages publiés : {{ user.nblivre }} <br>
                </p>
                <p>
                    Nombre d'appréciations données : {{ user.nbrate }} <br>
                </p>
                <p>
                    Nombre de commentaires écrits : {{ user.nbcomm }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/assets/css/userDetail.css"></style>