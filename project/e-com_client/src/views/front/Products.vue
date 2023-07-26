<template>
  <div>
    <Header />

    <main class="container">
  
      <section>
        <h2>Produits</h2>
        <p v-if="!products.length">Aucun produit</p>
        <div class="product-grid">
          <div v-for="product in products" :key="product.id" class="product-item">
            <img :src="product.image" :alt="product.name">
            <h3>{{ product.name }}</h3>
            <p>Prix : {{ product.price }} €</p>
            <button @click="addToCart(product)">Ajouter au panier</button>
          </div>
        </div>
      </section>
    
      <section>
        <h2>Panier</h2>
        <div v-if="!cartItems.length">Votre panier est vide</div>
        <ul v-else>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - {{ item.price }} € - Quantité: {{ item.quantity }}
            <button @click="removeFromCart(item)">Retirer du panier</button>
          </li>
        </ul>
        <button @click="validateCart" v-if="cartItems.length">Valider le panier</button>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue';

const products = ref([]);
const cartItems = ref([]);

// Fallback test products in case of API failure
const fallbackProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    image: 'test_product1.jpg',
    price: 10,
  },
  {
    id: 2,
    name: 'Test Product 2',
    image: 'test_product2.jpg',
    price: 15,
  },
  // Add more test products as needed
];

// Créer un canal de diffusion pour la synchronisation du panier
const cartChannel = new BroadcastChannel('cartChannel');

// Écouter les messages provenant des autres onglets pour synchroniser le panier
cartChannel.onmessage = (event) => {
  if (event.data) {
    cartItems.value = event.data;
  }
};

// Utiliser cette méthode pour ajouter ou retirer des éléments du panier
function updateCartAndLocalStorage(operation, item) {
  operation(item); // Ajouter ou retirer du panier
  saveCartToLocalStorage(); // Mettre à jour le localStorage
  cartChannel.postMessage(cartItems.value); // Diffuser le panier
}

// Modifier les fonctions addToCart et removeFromCart pour utiliser la méthode updateCartAndLocalStorage
function addToCart(product) {
  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
  updateCartAndLocalStorage((cart) => (cartItems.value = cart), cartItems.value);
  saveCartToLocalStorage(); // Mettre à jour le localStorage après chaque ajout au panier
}

function removeFromCart(item) {
  const index = cartItems.value.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity--;
    } else {
      cartItems.value.splice(index, 1);
    }
    updateCartAndLocalStorage((cart) => (cartItems.value = cart), cartItems.value);
    saveCartToLocalStorage(); // Mettre à jour le localStorage après chaque retrait du panier
  }
}

// Ajouter cette fonction pour sauvegarder le panier dans le localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}

// Ajouter cette fonction pour charger le panier depuis le localStorage (appelée au démarrage)
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  }
}

async function fetchProducts() {
  try {
    const response = await fetch('http://127.0.0.1:3100/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary headers, like authorization if required
      },
    });

    if (response.ok) {
      const data = await response.json();
      products.value = data;
    } else {
      console.error('Failed to fetch products');
      // Use the fallback test products
      products.value = fallbackProducts;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Use the fallback test products
    products.value = fallbackProducts;
  }
}

async function validateCart() {
  try {
    if (cartItems.value.length === 0) {
      console.log('Cart is empty. Add items to the cart before validating.');
      return;
    }

    const response = await fetch('http://127.0.0.1:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary headers, like authorization if required
      },
      body: JSON.stringify(cartItems.value),
    });

    if (response.ok) {
      console.log('Cart validated. Transaction successful!');
      // Clear the cart after successful validation
      cartItems.value = [];
      updateCartAndLocalStorage((cart) => (cartItems.value = cart)); // Mettre à jour le localStorage après avoir vidé le panier
    } else {
      console.error('Failed to validate the cart.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

onMounted(() => {
  fetchProducts();
  loadCartFromLocalStorage();
});

// Ajouter cet événement pour sauvegarder le panier avant de décharger la page (changement d'onglet)
window.addEventListener('beforeunload', () => {
  saveCartToLocalStorage();
});

onBeforeUnmount(() => {
  // Avant de décharger l'application, supprimer l'écouteur de message
  cartChannel.close();
});
</script>

<style scoped>
/* Vos styles CSS ici */
main{
  height: calc(100vh - 96px);
}
</style>
