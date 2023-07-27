<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import router from "../../router";
import store from "../../store";


let user = reactive({
  email: '',
  password: ''
});

async function loginUser() {
  try {
    const response = await fetch('http://127.0.0.1:3100/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      // Gérer la réponse de l'API en fonction de vos besoins
      console.log(data);
      const tokenExpiration = Date.now() + 3600 * 1000; // La durée doit correspondre à celle que vous avez définie côté serveur (ici 1 heure)

      // on rajoute le token dans le localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', tokenExpiration);

      // on redirige vers la page d'accueil
      store.dispatch('login', data.user);

      router.push('/'); // Remplacez '/accueil' par le chemin de votre page d'accueil
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
</script>

<style scoped>
/* Vos styles CSS ici */
</style>
