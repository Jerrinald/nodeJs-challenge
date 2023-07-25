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

let user = reactive({
  email: '',
  password: ''
});

async function loginUser() {
  try {
    const response = await fetch('http://localhost:3000/login', {
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

      // Vérification de compte vérifié
      if (data.isActivated) {
        router.push('/'); // Remplacez '/login' par le chemin vers la page de connexion
      } else {
        // Afficher un message d'erreur indiquant à l'utilisateur de valider son compte
        alert('Votre compte n\'a pas encore été vérifié. Veuillez vérifier votre boîte de réception pour le lien de vérification.');
      }
    } else {
      // Afficher un message d'erreur générique en cas d'échec de connexion
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
