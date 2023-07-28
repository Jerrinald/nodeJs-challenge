<template>
  <div class="orders">
    <h2>Toutes les commandes</h2>
    <table>
      <thead>
      <tr>
        <th>Numéro de Commande</th>
        <th>Numéro de Produit</th>
        <th>Prix du Produit</th>
        <th>Quantité du Produit</th>
        <th>Statut</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.numeroCommande }}</td>
        <td>{{ order.numeroProduit }}</td>
        <td>{{ order.prixProduit }}</td>
        <td>{{ order.quantiteProduit }}</td>
        <td>{{ order.statut }}</td>
      </tr>
      </tbody>
    </table>

    <h2>Rechercher une <commande></commande></h2>
    <form @submit.prevent="searchOrders">
      <label for="searchQuery">Recherche:</label>
      <input type="text" id="searchQuery" v-model="searchQuery" @input="onSearchInput" required>
      <button type="submit">Rechercher</button>
    </form>

    <div v-if="searchedOrders.length > 0">
      <h3>Résultats de la recherche</h3>
      <table>
        <thead>
        <tr>
          <th>Numéro de Commande</th>
          <th>Numéro de Produit</th>
          <th>Prix du Produit</th>
          <th>Quantité du Produit</th>
          <th>Statut</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in searchedOrders" :key="order._id">
          <td>{{ order.numeroCommande }}</td>
          <td>{{ order.numeroProduit }}</td>
          <td>{{ order.prixProduit }}</td>
          <td>{{ order.quantiteProduit }}</td>
          <td>{{ order.statut }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Définir une propriété réactive pour stocker toutes les commandes
const orders = ref([]);

// Définir une propriété réactive pour stocker les résultats de la recherche par numéro de commande
const searchedOrders = ref([]);

// Récupérer toutes les commandes lors de la première montée du composant
onMounted(() => {
  getAllOrders();
});

// Fonction pour récupérer toutes les commandes depuis l'API
const getAllOrders = async () => {
  try {

    const token = localStorage.getItem('token'); // Récupérer le token JWT du local storage

    // Vérifier si le token existe
    if (!token) {
      console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token JWT à l'en-tête de la requête
      },
    });
    if (response.ok) {
      const data = await response.json();
      orders.value = data;
    } else {
      console.error('Erreur lors de la récupération des commandes:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
  }
};

const searchOrders = async () => {
  try {
    const token = localStorage.getItem('token'); // Récupérer le token JWT du local storage

    // Vérifier si le token existe
    if (!token) {
      console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
      return;
    }

    // Code pour effectuer la recherche en fonction de la saisie utilisateur
    const response = await fetch(`http://localhost:3100/orders?searchQuery=${searchQuery.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token JWT à l'en-tête de la requête
      },
    });

    if (response.ok) {
      const data = await response.json();
      searchedOrders.value = data;
    } else {
      console.error('Erreur lors de la recherche des commandes:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche des commandes:', error);
  }
};

const onSearchInput = async () => {
  // Vérifier si la saisie de recherche a atteint un certain nombre de caractères (ici, 1 caractère)
  if (searchQuery.value.length >= 1) {
    // Exécuter la recherche dès que l'utilisateur tape un caractère
    searchOrders();
  } else {
    // Réinitialiser les résultats de recherche si la saisie est vide
    searchedOrders.value = [];
  }
};
</script>
<style scoped>
/* Vos styles CSS ici */
</style>
