<script setup>
import '@/assets/css/app.css'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <TheHeader />

    <main class="main-content">
      <router-view />
    </main>

    <TheFooter />
  </div>
</template>