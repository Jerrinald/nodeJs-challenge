<template>
  <div class="account-activated">
    <h2>{{ decodedMessage }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Définir une référence réactive pour stocker le message du serveur
const message = ref('');

// Récupérer le message du serveur à partir du cookie lors de la première montée du composant
onMounted(() => {
  message.value = getCookie('activationMessage') || '';
});

// Décoder le message avant de l'afficher
const decodedMessage = decodeURIComponent(message.value);

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
</script>

<style scoped>
/* Vos styles CSS ici */
</style>
