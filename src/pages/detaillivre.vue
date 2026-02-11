<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/services/api'

const route = useRoute()
const book = ref(null)

onMounted(async () => {
    const id = route.params.id
    try {

        book.value = await api.getBookById(id)
    } catch (err) {
        console.error("Erreur lors de la récup du livre", err)
    }
})
</script>

<template>
    <div v-if="book" class="container">
        <h1>{{ book.title }}</h1>
        <img :src="book.image" alt="">
        <p>{{ book.resume }}</p>
    </div>
</template>