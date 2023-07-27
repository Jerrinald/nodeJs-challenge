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

    <h2>Rechercher une commande par numéro de commande</h2>
    <form @submit.prevent="searchByNumeroCommande">
      <label for="numeroCommande">Numéro de Commande:</label>
      <input type="text" id="numeroCommande" v-model="numeroCommande" required>
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
        <tr v-for="order in searchedOrders" :key="order.id">
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

    const response = await fetch(`http://127.0.0.1:3100/orders`, {
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

// Propriété réactive pour stocker le numéro de commande recherché
const numeroCommande = ref('');

// Fonction pour rechercher les commandes par numéro de commande
const searchByNumeroCommande = async () => {
  try {
    const response = await fetch(`http://localhost:3100/orders?numeroCommande=${numeroCommande.value}`);
    if (response.ok) {
      const data = await response.json();
      searchedOrders.value = data;
    } else {
      console.error('Erreur lors de la recherche des commandes par numéro de commande:', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche des commandes par numéro de commande:', error);
  }
};
</script>
<style scoped>
/* Vos styles CSS ici */
</style>
