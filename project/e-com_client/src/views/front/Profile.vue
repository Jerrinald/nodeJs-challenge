<template>
  <div class="profile">
    <h2>Profil de {{ user.firstname }} {{ user.lastname }}</h2>
    <p>Email: {{ user.email }}</p>

    <!-- Formulaire de mise à jour du profil -->
    <form @submit.prevent="updateProfile">
      <div>
        <label for="firstname">Prénom:</label>
        <input type="text" id="firstname" v-model="editedUser.firstname" required>
      </div>
      <div>
        <label for="lastname">Nom:</label>
        <input type="text" id="lastname" v-model="editedUser.lastname" required>
      </div>
      <!-- Ajoutez d'autres champs pour les autres informations que vous souhaitez permettre à l'utilisateur de modifier -->

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Assurez-vous que vous avez déjà installé vuex

// Définir des propriétés réactives pour stocker les informations de l'utilisateur
const user = ref({});
const editedUser = ref({});

// Récupérer l'état du store Vuex
const store = useStore();

// Récupérer les informations de l'utilisateur à partir du store Vuex lors de la première montée du composant
onMounted(() => {
  // Assurez-vous que votre store Vuex dispose d'une propriété 'user' qui contient les informations de l'utilisateur connecté
  user.value = store.state.user;
  // Copiez les informations de l'utilisateur dans editedUser pour permettre la modification sans affecter directement les données dans le store
  editedUser.value = { ...store.state.user };
});

// Fonction pour mettre à jour le profil de l'utilisateur
async function updateProfile() {
  try {

    const token = localStorage.getItem('token'); // Récupérer le token JWT du local storage

    // Vérifier si le token existe
    if (!token) {
      console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
      return;
    }
    // Vérifier si le mot de passe a été modifié
    const isPasswordModified = editedUser.value.password !== user.value.password;

    // Si le mot de passe a été modifié, inclure le champ password dans la requête
    const requestBody = isPasswordModified
        ? { ...editedUser.value }
        : { ...editedUser.value, password: undefined };

    // Appeler votre API backend pour mettre à jour les informations de l'utilisateur
    const response = await fetch(`http://127.0.0.1:3100/users/${user.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token JWT à l'en-tête de la requête
      },
      body: JSON.stringify(requestBody), // Envoyez les mises à jour des informations de l'utilisateur dans le corps de la requête
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      // Mettez à jour les informations de l'utilisateur dans le store Vuex
      store.commit('SET_USER', requestBody);
      // Affichez un message de succès ou effectuez toute autre action nécessaire
      console.log('Profil mis à jour avec succès !');
    } else {
      console.error('Erreur lors de la mise à jour du profil');
    }
  } catch (error) {
    console.error('Une erreur est survenue:', error);
  }
}</script>

<style scoped>
/* Vos styles CSS ici */
</style>
