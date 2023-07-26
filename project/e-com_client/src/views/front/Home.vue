<template>
  <!-- En-tête du site -->
  <!-- <header>
    <h1>FitFrenzy</h1>
    <nav>
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="/products">Produits</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/">Panier</a></li>
        <li><a href="#">Connexion</a></li>
      </ul>
    </nav>
  </header> -->
  <div>

    <Header />

    <!-- Contenu principal de la page d'accueil -->
    <main class="flex fdc gap-50 container">
      <Banner />

     <Products />

      <Testimony />
    </main>
    <Footer />
  </div>
</template>

<script setup>
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
