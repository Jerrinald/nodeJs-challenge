<template>
  <div>
    <Header />
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

      <div class="my-orders">
        <h2>Commandes de {{ user.firstname }} {{ user.lastname }}</h2>
        <ul class="order-list">
          <li v-for="order in orders" :key="order.id" class="order-item">
            <div class="order-info">
              <p><strong>Numéro de commande:</strong> {{ order.numeroCommande }}</p>
              <p><strong>Numéro de produit:</strong> {{ order.numeroProduit }}</p>
              <p><strong>Prix du produit:</strong> {{ order.prixProduit }} €</p>
              <p><strong>Quantité du produit:</strong> {{ order.quantiteProduit }}</p>
              <p><strong>Statut:</strong> {{ order.statut }}</p>
            </div>

            <!-- Display product details -->
            <div class="product-details" v-if="order.product">
              <h3>Information sur le produit</h3>
              <p><strong>Nom du produit:</strong> {{ order.product.name }}</p>
              <p><strong>Description:</strong> {{ order.product.description }}</p>
              <p><strong>Numéro Produit:</strong> {{ order.product.numeroProduit }}</p>
              <p><strong>Prix:</strong> {{ order.product.price }} &euro;</p>
              <img :src="order.product.image ? apiEcomUrl + '/' + order.product.image : adidas" :alt="order.product.name" style="max-height: 100px; max-width: 100px;">
              <!-- Add more product details as needed -->
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Assurez-vous que vous avez déjà installé vuex
import Header from '../../components/Header.vue'

// Définir des propriétés réactives pour stocker les informations de l'utilisateur
const user = ref({});
const editedUser = ref({});

const orders = ref([]);

// Récupérer l'état du store Vuex
const store = useStore();

const apiEcomUrl = ref(import.meta.env.VITE_API_ECOM);

// Récupérer les informations de l'utilisateur à partir du store Vuex lors de la première montée du composant
onMounted(() => {
  // Assurez-vous que votre store Vuex dispose d'une propriété 'user' qui contient les informations de l'utilisateur connecté
  user.value = store.state.user;
  // Copiez les informations de l'utilisateur dans editedUser pour permettre la modification sans affecter directement les données dans le store
  editedUser.value = { ...store.state.user };

  fetchOrders()
});

async function fetchOrders() {
  try {

    const token = localStorage.getItem('token'); // Récupérer le token JWT du local storage

    // Vérifier si le token existe
    if (!token) {
      console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
      return;
    }

    // Appeler votre API backend pour mettre à jour les informations de l'utilisateur
    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/orders?idClient=${user.value.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Ajouter le token JWT à l'en-tête de la requête
      },
      // Envoyez les mises à jour des informations de l'utilisateur dans le corps de la requête
    });

    if (response.ok) {
      const ordersData = await response.json();

      // Fetch product details for each order
      const productPromises = ordersData.map(async (order) => {
        const productResponse = await fetch(
          `${import.meta.env.VITE_API_ECOM}/products/${order.idProduct}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Ajouter le token JWT à l'en-tête de la requête
              },
              // Envoyez les mises à jour des informations de l'utilisateur dans le corps de la requête
            });
        if (productResponse.ok) {
          const productData = await productResponse.json();
          order.product = productData; // Add the product details to the order object
        }
      });

      // Wait for all product requests to complete
      await Promise.all(productPromises);

      orders.value = ordersData;
    } else {
      console.error('Erreur lors la recuperation des commandes');
    }
  } catch (error) {
    console.error('Une erreur est survenue:', error);
  }
}

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
    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/users/${user.value.id}`, {
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

.my-orders{
  margin-top: 30px;
}
.order-list {
  list-style: none;
  padding: 0;
}

.order-item {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.order-info {
  padding: 10px;
}
</style>
