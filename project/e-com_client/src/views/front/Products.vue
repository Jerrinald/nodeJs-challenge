<template>
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
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const { MongoClient } = require('mongodb');

const uri = 'mongodb://root:password@mongo:27017/app';
const client = new MongoClient(uri);

const products = ref([]);
const cartItems = ref([]);
let token = null; // Declare the token variable

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
    // Ajouter un ID de produit par défaut si numeroProduit est null
    const numeroProduit = product.numeroProduit ?? product.id;

    cartItems.value.push({
      ...product,
      quantity: 1,
      numeroProduit: numeroProduit,
      prixProduit: product.price,
    });
  }
  updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value);
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
    updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value);
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

// Ajouter cette fonction pour générer un numéro de commande aléatoire
function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `CMD${currentDate}${randomNumber}`;
}

// Ajouter cette fonction pour générer un ID de commande aléatoire
function generateOrderId() {
  return Math.floor(Math.random() * 1000000);
}

async function fetchProducts() {
  try {
    token = localStorage.getItem('token'); // Get token from localStorage
    const response = await fetch('http://127.0.0.1:3100/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
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

async function insertOrdersToMongoDB(orderItems) {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(); // Utilisez le nom de votre base de données ici.

    for (let i = 0; i < orderItems.length; i++) {
      const order = orderItems[i];
      console.log('Order to insert:', order);

      const result = await db.collection('orders').insertOne(order);

      if (result.insertedCount === 1) {
        console.log('Order inserted successfully.');
      } else {
        console.error('Failed to insert the order.');
      }
    }
  } catch (err) {
    console.error('Error inserting orders to MongoDB:', err);
  } finally {
    // Assurez-vous de fermer la connexion après l'insertion des commandes.
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

async function validateCart() {
  try {
    if (cartItems.value.length === 0) {
      console.log('Cart is empty. Add items to the cart before validating.');
      return;
    }

    // Generate order data
    const orderNumber = generateOrderNumber();
    const orderId = generateOrderId();

    // Create an array to store order items
    const orderItems = cartItems.value.map((item) => ({
      idClient: 1,
      numeroCommande: orderNumber,
      numeroProduit: item.numeroProduit,
      prixProduit: item.prixProduit,
      quantiteProduit: item.quantity,
      statut: 'En cours',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Post item in orderItems one by one
    for (let i = 0; i < orderItems.length; i++) {
      console.log('Order send:', orderItems[i]);
      const orderResponse = await fetch('http://localhost:3100/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token in the headers
        },
        body: JSON.stringify(orderItems[i]),
      });
      if (orderResponse.ok) {
        insertOrdersToMongoDB(orderItems);

        console.log('Order created successfully.');
      } else {
        console.error('Failed to create the order.');
        return;
      }
    }

    // Now validate the cart
    const transactionData = {
      orderId: orderId,
      amount: calculateTotalAmount(),
      status: 'new',
    };

    const transactionResponse = await fetch('http://127.0.0.1:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
      body: JSON.stringify(transactionData),
    });

    if (transactionResponse.ok) {
      const responseData = await transactionResponse.json();
      const linkPayment = responseData.link_payment;
      console.log('Cart validated. Transaction successful!');
      // Clear the cart after successful validation
      cartItems.value = [];
      updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value); // Mettre à jour le localStorage après avoir vidé le panier
      redirectToPaymentLink(linkPayment); // Redirect to the payment link
    } else {
      console.error('Failed to validate the cart.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Helper function to calculate the total amount of items in the cart
function calculateTotalAmount() {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to redirect to the payment link using the router
function redirectToPaymentLink(link) {
  const router = useRouter();
  console.log('Redirecting to:', link); // Debugging log
  router.push(link);
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
/* Your styles CSS here */
</style>
