<template>
  <div>
    <Header />
    <main class="container">
      <section>
        <h2>Commandes</h2>
        <p v-if="!orders.length">Aucune commande</p>
        <table v-else>
          <thead>
            <tr>
              <th>Commande</th>
              <th>Numéro de produit</th>
              <th>Prix du produit</th>
              <th>Quantité du produit</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(order, orderIndex) in orders" :key="orderIndex">
              <tr v-for="(product, productIndex) in order.products" :key="productIndex" class="product-item">
                <td v-if="productIndex === 0" :rowspan="order.products.length">{{ 'Commande n°' + (orderIndex + 1) }}</td>
                <td>{{ 'Produits n°' + product.productId }}</td>
                <td>{{ product.productPrice }} €</td>
                <td>{{ product.quantity }}</td>
                <td>{{ order.status }}</td>
                <td>
                  <div class="flex jcc">
                    <button class="btn btn-danger" @click="editOrder(orderIndex, productIndex)">Modifier</button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Formulaire de modification de commande -->
        <div v-if="editingOrderIndex !== null && editingProductIndex !== null">
          <form @submit.prevent="saveEditedOrder">
            <fieldset>
              <legend>Modifier la commande</legend>
              <div class="form-commande flex gap-25" v-for="(product, productIndex) in orders[editingOrderIndex].products" :key="productIndex">
                <div>
                  <label>Numéro de produit :</label>
                  <input v-model="product.productId" type="number" required>
                </div>
                <div>
                  <label>Prix du produit (€) :</label>
                  <input v-model="product.productPrice" type="number" required>
                </div>
                <div>
                  <label>Quantité du produit :</label>
                  <input v-model="product.quantity" type="number" required>
                </div>
                <div>
                  <label>Statut :</label>
                  <input v-model="orders[editingOrderIndex].status" required>
                </div>
              </div>
              <div class="btn-group flex gap-10 jce">
                <button class="btn btn-primary" type="submit">Enregistrer</button>
                <button class="btn btn-danger" @click="cancelEdit">Annuler</button>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
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

table, th, td {
  border: 1px solid #F6931C;
  padding: 8px;
}

form {
  margin-top: 50px;
}

hr{
  margin-bottom: 20px;
}

legend{
  font-size: 1.3rem;
}

fieldset{
  border: 1px solid #ccc;
  padding: 25px;
}

fieldset .form-commande{
  margin-bottom: 50px;
}

h2{
  margin-top: 20px;
}

main{
  height: auto;
  margin-bottom: 50px;
}

</style>