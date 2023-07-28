<template>
  <div>
    <Header />
    <main class="login-form container flex aic jcsa">
      <div>
        <img :src="minilogo" alt="logo rest" srcset="">
      </div>
      <div>
        <form @submit.prevent="loginUser" class="flex fdc gap-25">
          <h2>Connectez vous</h2>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password" required>
          </div>
          <div class="flex jce">
            <button type="submit" class="btn btn-primary">Connexion</button>
          </div>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import router from "../../router";
import store from "../../store";
import { useRouter } from 'vue-router'; // Import de Vue Router
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import minilogo from '../../assets/images/minilogo.png'

let user = reactive({
  email: '',
  password: ''
});

async function loginUser() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/login`, {
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
main{
  height: calc(100vh - 96px);

}
img{
  width: 150%;
}
</style>
