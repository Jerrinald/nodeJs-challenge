<template>
  <!-- En-tête du site -->
  <!-- <header>
    <h1>FitFrenzy</h1>
    <nav>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/products">Produits</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/">Panier</router-link></li>
        <li v-if="user">
          <router-link to="/profile">Profil</router-link>
        </li>
        <li v-if="user">
          <router-link to="/logout">Déconnexion</router-link>
        </li>

        <li v-else>
          <router-link to="/login">Connexion</router-link>
        </li>
      </ul>
    </nav>
  </header> -->
  <div>

    <Header />

    <!-- Contenu principal de la page d'accueil -->
    <main class="flex fdc gap-50 container">
      <Banner />

     <!-- <Products /> -->
      <Testimony />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Utilisez une propriété calculée pour récupérer l'état de l'utilisateur depuis le store Vuex
const user = computed(() => store.state.user);
// Vous pouvez ajouter du code logique ici si nécessaire
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Banner from '../../components/Banner.vue'
import montre from '../../assets/images/montre.jpg'
import Products from '../../components/Products.vue';
import Testimony from '../../components/Testimony.vue';

</script>

<style scoped>
/* Vos styles CSS pour la page d'accueil ici */
main {
  padding: 50px 0;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
