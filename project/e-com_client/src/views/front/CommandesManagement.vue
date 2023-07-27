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
              <div class="flex fdc gap-25" v-for="(product, productIndex) in orders[editingOrderIndex].products" :key="productIndex">
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
                <hr />
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

h2{
  margin-top: 20px;
}

main{
  height: auto;
  margin-bottom: 50px;
}

</style>