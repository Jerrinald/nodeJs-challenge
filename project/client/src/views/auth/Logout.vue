<template>
  <slot name="activator">
    <div @click="logoutUser">
      <BtnDeconnect />
    </div>
  </slot>
</template>


<script setup>
import BtnDeconnect from "../../components/BtnDeconnect.vue"
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Importer useStore pour accéder au store Vuex
import store from "../../store";
import router from "../../router";

// Fonction pour effectuer la déconnexion
async function logoutUser() {
  try {

    var url = "";
    if (store.state.user.role === 'admin') {
      url = `${import.meta.env.VITE_API_PAIEMENT}/logoutUser`
    } else {
      url = `${import.meta.env.VITE_API_PAIEMENT}/logout`
    }

    console.log(url)
    // Effectuer un appel API pour déconnecter l'utilisateur du serveur
    // Par exemple, si vous utilisez des tokens JWT, vous pouvez envoyer une demande pour invalider le token côté serveur
    // Remplacez 'http://localhost:3100/logout' par l'URL de votre API de déconnexion
    console.log(localStorage.getItem('token'));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Vérifier si la déconnexion s'est effectuée avec succès
    if (response.ok) {
      // Appeler l'action 'logout' du store pour effectuer la déconnexion
      store.dispatch('logout');

      // Rediriger vers la page d'accueil
      router.push('/');

      console.log(store.state.user)
    } else {
      // En cas d'erreur lors de la déconnexion, afficher un message d'erreur ou effectuer d'autres actions nécessaires
      console.error('Erreur lors de la déconnexion');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la déconnexion:', error.message);
  }
}
</script>
