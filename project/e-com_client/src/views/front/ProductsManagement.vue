<template>
  <section>
    <h2>Ajouter un produit</h2>
    <form @submit.prevent="addNewProduct">
      <div>
        <label for="productName">Nom du produit:</label>
        <input type="text" id="productName" v-model="newProduct.name" required>
      </div>
      <div>
        <label for="productPrice">Prix du produit (€):</label>
        <input type="number" id="productPrice" v-model="newProduct.price" required>
      </div>
      <div>
        <label for="productImage">URL de l'image:</label>
        <input type="text" id="productImage" v-model="newProduct.image" required>
      </div>
      <button type="submit">Ajouter</button>
    </form>

    <h2>Produits</h2>
    <p v-if="!products.length">Aucun produit</p>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>Prix : {{ product.price }} €</p>
        <button @click="removeProduct(product.id)">Supprimer</button>
        <button @click="editProduct(product)">Modifier</button>
      </div>
    </div>

    <!-- Formulaire d'édition du produit -->
    <form v-if="editingProduct" @submit.prevent="updateProduct">
      <div>
        <label for="editProductName">Nom du produit:</label>
        <input type="text" id="editProductName" v-model="editingProduct.name" required>
      </div>
      <div>
        <label for="editProductPrice">Prix du produit (€):</label>
        <input type="number" id="editProductPrice" v-model="editingProduct.price" required>
      </div>
      <div>
        <label for="editProductImage">URL de l'image:</label>
        <input type="text" id="editProductImage" v-model="editingProduct.image" required>
      </div>
      <button type="submit">Mettre à jour</button>
      <button type="button" @click="cancelEditing">Annuler</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const products = ref([]);
const cartItems = ref([]);

const fallbackProducts = [
  // Vos produits de test
];

const newProduct = ref({
  name: '',
  price: '',
  image: '',
});

const editingProduct = ref(null);

const cartChannel = new BroadcastChannel('cartChannel');

cartChannel.onmessage = (event) => {
  if (event.data) {
    cartItems.value = event.data;
  }
};

function addNewProduct() {
  const newId = products.value.length + 1;
  products.value.push({
    id: newId,
    name: newProduct.value.name,
    price: Number(newProduct.value.price),
    image: newProduct.value.image,
  });
  newProduct.value = {
    name: '',
    price: '',
    image: '',
  };
}

function removeProduct(productId) {
  const index = products.value.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.value.splice(index, 1);
    const cartIndex = cartItems.value.findIndex((item) => item.id === productId);
    if (cartIndex !== -1) {
      cartItems.value.splice(cartIndex, 1);
      saveCartToLocalStorage();
      cartChannel.postMessage(cartItems.value);
    }
  }
}

function editProduct(product) {
  editingProduct.value = { ...product };
}

function cancelEditing() {
  editingProduct.value = null;
}

function updateProduct() {
  const index = products.value.findIndex((product) => product.id === editingProduct.value.id);
  if (index !== -1) {
    products.value[index].name = editingProduct.value.name;
    products.value[index].price = Number(editingProduct.value.price);
    products.value[index].image = editingProduct.value.image;
    editingProduct.value = null;
  }
}

// ... Le reste du code existant ...

</script>

<style scoped>
/* Vos styles CSS ici */
</style>
