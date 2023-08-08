<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import adidas from '../assets/images/adidas.avif'
import { useStore } from 'vuex'; 

const store = useStore();

const products = ref([
  {
    id: 1,
    name: 'Chaussure adidas Grand Court x LEGO',
    image: 'path/to/image1.jpg',
    price: 53.99,
  },
]);

const cartItems = ref([]);
let token = null; // Declare the token variable


// Utiliser cette méthode pour ajouter ou retirer des éléments du panier
function updateCartAndLocalStorage(operation, item) {
  operation(item); // Ajouter ou retirer du panier
   // Mettre à jour le localStorage
//   cartChannel.postMessage(cartItems.value); // Diffuser le panier
}

// Modifier les fonctions addToCart et removeFromCart pour utiliser la méthode updateCartAndLocalStorage
function addToCart(product) {
  
    // Ajouter un ID de produit par défaut si numeroProduit est null
    const numeroProduit = product.numeroProduit ?? product.id;

    cartItems.value.push({
      ...product,
      quantity: 1,
      numeroProduit: numeroProduit,
      prixProduit: product.price,
    });
  updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value);
  saveCartToLocalStorage(); // Mettre à jour le localStorage après chaque ajout au panier
  saveCartToStore();
}

// Ajouter cette fonction pour sauvegarder le panier dans le localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}

// Save cartItems to the Vuex store
function saveCartToStore() {
  store.state.cartItems = cartItems.value;
}


onMounted(() => {
    // loadCartFromLocalStorage();
});

// Ajouter cet événement pour sauvegarder le panier avant de décharger la page (changement d'onglet)
window.addEventListener('beforeunload', () => {
//   saveCartToLocalStorage();
});
</script>

<template>
    <div v-for="product in products" :key="product.id" class="product-item">
        <a href="#" class="banner-item">
            <img :src="adidas" alt="" srcset="">
            <p :title="product.name" class="product-name">{{ product.name }}</p>
            <strong>{{ product.price }} €</strong>
            <p><s>83.99€</s></p>
            <div class="last-article">9 articles restants</div>
            <button class="btn-primary"  @click="() => addToCart(product)">Ajouter au panier</button>
        </a>
    </div>
</template>

<style scoped>

.banner-item{
    color: #000000;
}

.banner-item:hover{
    color: #F6931C;
}
s {
    color: rgb(156, 164, 172);
}

.last-article{
    color: red;
}
</style>