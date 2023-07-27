<template>
  <section>
    <h2>Commandes</h2>
    <p v-if="!orders.length">Aucune commande</p>
    <table v-else>
      <!-- Table header -->
      <thead>
        <tr>
          <th>Commande</th>
          <th>Numéro de produit</th>
          <th>Prix du produit</th>
          <th>Quantité du produit</th>
          <th>Statut</th>
          <th>Client</th>
          <th>Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <template v-for="(order, orderIndex) in orders" :key="order.id">
          <tr>
            <td>{{ 'Commande n°' + order.numeroCommande }}</td>
            <td>{{ order.numeroProduit }}</td>
            <td>{{ order.prixProduit }} €</td>
            <td>{{ order.quantiteProduit }}</td>
            <td>{{ order.statut }}</td>
            <td>{{ getClientName(order.idClient) }}</td>
            <td>
              <button @click="editOrder(order.id)">Modifier</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Formulaire de modification de commande -->
    <div v-if="editingOrderId !== null">
      <h3>Modifier la commande :</h3>
      <form @submit.prevent="saveEditedOrder">
        <label>Numéro de produit :</label>
        <input v-model="editedOrder.numeroProduit" required>
        <label>Prix du produit (€) :</label>
        <input v-model="editedOrder.prixProduit" type="number" required>
        <label>Quantité du produit :</label>
        <input v-model="editedOrder.quantiteProduit" type="number" required>
        <hr>
        <label>Statut :</label>
        <input v-model="editedOrder.statut" required>
        <label>Client :</label>
        <input v-model="editedOrder.idClient" required>
        <hr>
        <button type="submit">Enregistrer</button>
        <button @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const orders = ref([]);
const editingOrderId = ref(null);
const editedOrder = ref(null);

// Appel de l'API pour récupérer les commandes au chargement de la page
onMounted(() => {
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem('token');
  if (token) {
    fetchOrdersFromAPI(token);
  } else {
    console.warn('Aucun token trouvé dans le localStorage. Les commandes ne peuvent pas être récupérées.');
  }
});

// Fonction pour gérer l'événement de clic sur le bouton "Modifier"
function editOrder(orderId) {
  editingOrderId.value = orderId;
  const orderToEdit = orders.value.find(order => order.id === orderId);
  editedOrder.value = { ...orderToEdit };
}

// Fonction pour enregistrer la commande modifiée
async function saveEditedOrder() {
  try {
    // Mettre à jour la commande via l'API
    await updateOrder(editedOrder.value.id, editedOrder.value);

    // Réinitialiser la commande éditée
    editedOrder.value = null;
    editingOrderId.value = null;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la sauvegarde de la commande modifiée :', error);
  }
}

// Fonction pour annuler l'édition de la commande
function cancelEdit() {
  editedOrder.value = null;
  editingOrderId.value = null;
}

// Fonction pour récupérer les commandes depuis l'API en incluant le token dans l'en-tête
async function fetchOrdersFromAPI(token) {
  try {
    const response = await fetch('http://localhost:3100/orders', {
      headers: {
        'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête de la requête
      },
    });
    const data = await response.json();
    orders.value = data; // Mettre les données de l'API dans la variable "orders"
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des commandes :', error);
  }
}

// Fonction pour récupérer le nom du client en fonction de son ID
function getClientName(clientId) {
  // Ici, vous pouvez implémenter une logique pour récupérer le nom du client en fonction de son ID.
  // Par exemple, si vous avez un tableau des clients, vous pouvez le parcourir et trouver le client
  // correspondant à l'ID donné, puis retourner son nom.
  // Pour cet exemple, nous allons simplement retourner l'ID du client lui-même.
  return clientId;
}

// Fonction pour mettre à jour une commande spécifique via l'API
async function updateOrder(orderId, orderData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Aucun token trouvé dans le localStorage. La commande ne peut pas être mise à jour.');
      return;
    }

    const response = await fetch(`http://localhost:3100/orders/${orderId}`, {
      method: 'PUT', // Vous pouvez également utiliser 'PATCH' à la place de 'PUT' si l'API le supporte
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      console.error('La mise à jour de la commande a échoué.');
    } else {
      console.log('La commande a été mise à jour avec succès.');
      // Mettre à jour les données locales avec les nouvelles données
      const updatedOrder = orders.value.find(order => order.id === orderId);
      if (updatedOrder) {
        Object.assign(updatedOrder, orderData);
      }
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la mise à jour de la commande :', error);
  }
}
</script>

<style scoped>
/* Vos styles CSS ici */
table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
  padding: 8px;
}

form {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
