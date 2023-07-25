<template>
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
              <button @click="editOrder(orderIndex, productIndex)">Modifier</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Formulaire de modification de commande -->
    <div v-if="editingOrderIndex !== null && editingProductIndex !== null">
      <h3>Modifier la commande :</h3>
      <form @submit.prevent="saveEditedOrder">
        <div v-for="(product, productIndex) in orders[editingOrderIndex].products" :key="productIndex">
          <label>Numéro de produit :</label>
          <input v-model="product.productId" required>
          <label>Prix du produit (€) :</label>
          <input v-model="product.productPrice" type="number" required>
          <label>Quantité du produit :</label>
          <input v-model="product.quantity" type="number" required>
          <hr>
        </div>
        <label>Statut :</label>
        <input v-model="orders[editingOrderIndex].status" required>
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
const editingOrderIndex = ref(null);
const editingProductIndex = ref(null);

// Exemple de création de commandes pour les besoins de l'exemple
onMounted(() => {
  addNewOrder([
    { productId: 1, productPrice: 25.0, quantity: 3, status: "En cours" },
    { productId: 2, productPrice: 12.5, quantity: 5, status: "En cours" },
  ]);

  addNewOrder([
    { productId: 3, productPrice: 10.0, quantity: 2, status: "Terminée" },
    { productId: 1, productPrice: 25.0, quantity: 1, status: "Terminée" },
  ]);
});

// Fonction pour ajouter une nouvelle commande
function addNewOrder(products, status) {
  orders.value.push({
    products: products,
    status: status,
  });
}

// Fonction pour gérer l'événement de clic sur le bouton "Modifier"
function editOrder(orderIndex, productIndex) {
  editingOrderIndex.value = orderIndex;
  editingProductIndex.value = productIndex;
}

// Fonction pour enregistrer la commande modifiée
function saveEditedOrder() {
  editingOrderIndex.value = null;
  editingProductIndex.value = null;
}

// Fonction pour annuler l'édition de la commande
function cancelEdit() {
  editingOrderIndex.value = null;
  editingProductIndex.value = null;
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
