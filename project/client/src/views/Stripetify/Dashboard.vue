<template>
    <div class="dashboard flex">
        <Aside />
        <div class="block-container flex fdc gap-20">
            <div class="flex jcsb">
                <input type="search" placeholder="Rechercher...">
                <div class="flex aic gap-10">
                    <a href="#" @click="logoutUser">Déconnexion</a>
                </div>
            </div>
            <div v-if="store.state.user.role === 'admin'" class="marchant-container">
              <div v-if="selectedMenu === 'Marchands'" class="marchant-container">
                <h2>Marchands</h2>
                <Marchands :selectedMenu="selectedMenu" />
              </div>
              <div v-if="selectedMenu === 'Transactions'" class="marchant-container">
                <h2>Transactions</h2>
                <Transactions :selectedMenu="selectedMenu" />
              </div>
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
import { ref } from 'vue';


const selectedMenu = ref('Transactions');
const props = defineProps({
  selectedMenu: String // Définir le type de la prop
});
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
.dashboard {
  background-color: #2c3e50; /* Couleur de fond principale */
}

.block-container {
    padding: 20px;
}

input {
    width: 300px;
}

.block-container .block {
  background-color: #34495e; /* Couleur de fond pour les blocs */
  border-radius: 5px;
  height: 350px;
  color: #ecf0f1; /* Couleur du texte */
  padding: 20px;
}
</style>