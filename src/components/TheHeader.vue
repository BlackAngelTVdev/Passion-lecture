<template>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
  <header>
    <router-link to="/"><h1>Passion Lecture</h1></router-link>
    <nav>
      <router-link to="/Ajoute" class="Button">Ajouter</router-link>
      <router-link to="/Livres" class="Button">Livres</router-link>
      <router-link to="/" class="Button">Login</router-link>
    </nav>
  </header>
</template>
<script setup>
import '@/assets/css/app.css'
</script>