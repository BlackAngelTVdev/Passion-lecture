<script setup>
import '@/assets/css/app.css'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import ConsoleErrorDisplay from './components/ConsoleErrorDisplay.vue'
import DBStatusBanner from './components/DBStatusBanner.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- Banneau de statut DB -->
    <DBStatusBanner />

    <TheHeader />

    <main class="main-content">
      <router-view />
    </main>

    <TheFooter />

    <!-- Affichage des erreurs console avec flash visual -->
    <ConsoleErrorDisplay />
  </div>
</template>