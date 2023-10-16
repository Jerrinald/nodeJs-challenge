<template>
    <div class="dashboard flex">
      <div class="aside-container">
        <a href="/" class="logo-content flex aic gap-10"><span>Stripetify</span></a>
        <div class="flex aside-link-container fdc gap-20">
          <a href="#" @click="handleMenuClick($event, 'Accueil')">Accueil</a>
          <a href="#" @click="handleMenuClick($event, 'Profil')">Profil</a>
          <a href="#" @click="handleMenuClick($event, 'Transactions')">Transactions</a>
          <a href="#" @click="handleMenuClick($event, 'Opérations')">Opérations</a>
          <a href="#" @click="handleMenuClick($event, 'Marchands')">Marchands</a>
        </div>
      </div>
        <div class="block-container flex fdc gap-20">
            <div class="top-bar flex jcsb aic gap-20"> 
              <input type="search" placeholder="Rechercher..." class="search-input"> 
              <Logout />
            </div>
            <div v-if="selectedMenu === 'Marchands'" class="marchant-container">
              <h2>Marchands</h2>
              <Marchands :selectedMenu="selectedMenu" />
            </div>
            <div v-else-if="selectedMenu === 'Transactions'" class="marchant-container">
              <h2>Transactions</h2>
              <Transactions :selectedMenu="selectedMenu" />
            </div>
            <div v-else-if="selectedMenu === 'Profil'" class="marchant-container">
              <h2>Profil</h2>
              <Profile :selectedMenu="selectedMenu" />
            </div>
            <div v-else class="marchant-container">
                <h2>Marchands</h2>
                    <Profile />
            </div>
        </div>
    </div>
</template>
<script setup>
import Aside from '../../components/Aside.vue'
// import Dashboard from '../front/Dashboard.vue';
import Marchands from '../front/Marchands.vue';
import Transactions from '../front/Transactions.vue';
import Profile from '../front/Profile.vue';
import store from "../../store";
import router from "../../router";
import Logout from "../auth/Logout.vue"
import { ref, defineProps, defineEmits } from 'vue';

const selectedMenu = ref('Marchands'); // Valeur par défaut

function handleMenuClick(event, menu) {

  event.preventDefault(); // Empêche le comportement par défaut du lien
  selectedMenu.value = menu;
  console.log(selectedMenu.value)
  console.log(selectedMenu)
}
async function logoutUser() {
  try {
    // Ajoutez ici toute opération nécessaire pour la déconnexion côté client

    // Supprimez le token et toute autre information de session
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    // Effectuez d'autres opérations de nettoyage si nécessaire

    // Redirigez l'utilisateur vers la page de connexion ou d'accueil
    router.push('/login'); // Redirigez vers la page appropriée après la déconnexion
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
}

</script>
<style scoped>

  html, body {
    height: 100% !important;
    margin: 0 !important; /* Il est important de réinitialiser la marge */
  }
  .dashboard {
    display: flex;
    flex-direction: row; /* orientation horizontale des éléments */
    height: 100%; /* la hauteur totale du viewport */
    background-color: #f5f5f5; /* fond clair */
    color: #333; /* texte foncé pour le contraste */
  }

  .aside-container{
    display: flex;
    flex-direction: column; /* oriente les éléments verticalement */
    height: 100% !important; /* hauteur totale du parent */
    width: 300px;
    padding: 20px;
    background-color: #ffffff; /* Panneau latéral blanc */
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.2); /* Ombre subtile pour le relief */
    color: #333;
  }

  .aside-link-container{
    flex-grow: 1 !important; /* permet à l'élément de remplir tout l'espace disponible */
    margin-top: 20px;
    height: 100%;
  }

  .aside-link-container a{
    color: #333;
    font-weight: bold;
    padding: 10px 15px; /* Plus d'espace, plus facile à cliquer */
    border-radius: 5px; /* Bords légèrement arrondis */
    display: block; /* Faire prendre tout l'espace horizontal possible */
    transition: background-color 0.3s; /* Transition douce des couleurs */
  }

  .aside-link-container a:hover,
  .aside-link-container a:focus {
    color: #ffffff;
    background-color: #3498db; /* Couleur bleue au survol */
    text-decoration: none; /* Pas de soulignement */
  }

  .logo-content span{
    font-weight: bold;
    font-size: 1.3rem;
  }

  .logo-content img{
    border-radius: 50%;
    height: 35px;
    width: 35px;
  }

  .block-container {
      padding: 20px;
      flex-grow: 1; /* Permettre à ce conteneur de remplir l'espace */
  }

  input[type="search"] {
      width: 100%;
      padding: 10px;
      border-radius: 5px; /* Bords arrondis sur l'entrée */
      border: 1px solid #ddd; /* Bordure plus subtile */
      margin-bottom: 20px; /* Espace en bas */
  }

  input[type="search"]:focus {
      outline: none;
      box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Ombre subtile au focus */
  }

  .marchant-container, .block {
    background-color: #ffffff; /* Fond blanc pour les contenus */
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.1); /* Ombre pour un effet "flottant" */
    color: #333;
    padding: 20px;
  }

  h2 {
    margin-bottom: 20px; /* Espacement uniforme */
    color: #333;
  }
  
  .top-bar {
    margin-bottom: 20px; /* Espace supplémentaire en dessous de la barre supérieure */
}

.search-input {
    flex-grow: 1; /* La barre de recherche prend tout l'espace disponible */
    margin-right: 20px; /* Espace entre la barre de recherche et le bouton */
}

.logout-button {
    background-color: #e74c3c; /* Couleur rouge pour l'action de déconnexion */
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s; /* Couleur de fond animée au survol */
}

.logout-button:hover,
.logout-button:focus {
    background-color: #c0392b; /* Une teinte de rouge légèrement plus foncée au survol/focus */
    outline: none; /* Enlever l'outline au focus pour les navigateurs qui l'appliquent */
}
/* Ajoutez des styles pour les autres éléments au besoin */
</style>
