<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/services/api'

const route = useRoute()
const user = ref(null)

onMounted(async () => {
    const id = route.params.id
    try {

        user.value = await api.getUserStats(id)
    } catch (err) {
        console.error("Erreur lors de la récup de l'utilisateur", err)
    }
})
</script>
<script scoped>
import '@/assets/css/detailUser.css'
</script>

<template>
    <div class="app-wrapper" v-if="user">
        <h1>Profil de {{ user.username }}</h1>
        <div class="meta-data">
            Nombre d'ouvrages publiés : {{ user.nblivre }} <br>
            Nombre d'appréciations données : {{ user.nbrate }} <br>
            Nombre de commentaires écrits : {{ user.nbcomm }}
        </div>
    </div>
</template>