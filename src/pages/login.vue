<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="pseudo" type="text" placeholder="Pseudo" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pseudo: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      // Simulation d'appel API vers votre JSON Server
      const response = await fetch(`http://localhost:3000/users?pseudo=${this.pseudo}&password=${this.password}`);
      const users = await response.json();

      if (users.length > 0) {
        // On stocke l'utilisateur dans le localStorage pour "rester connecté"
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.$router.push('/'); // Redirection vers l'accueil
      } else {
        this.error = "Identifiants incorrects";
      }
    }
  }
}
</script>