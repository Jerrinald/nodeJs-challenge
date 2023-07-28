<script setup>
import ProductItem from './ProductItem.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import moulinex from '../assets/images/moulinex.jpg'
import trotinette from '../assets/images/trotinette.jpg'


const products = ref([]);
const cartItems = ref([]);
let token = null; // Declare the token variable


const fallbackProducts = [
    {
        id: 1,
        name: 'Blender force moulinex lm420510 - 600 w - rouge',
        image: moulinex,
        price: 53.33,
    },
    {
        id: 2,
        name: 'CAMTOP Trotinette Electrique Adulte Puissante Trottinettes électriques Adultes Double Moteur Freins à Disque Capacité de Chargement 400kg',
        image: trotinette,
        price: 15,
    },
    // Add more test products as needed
];

// Utiliser cette méthode pour ajouter ou retirer des éléments du panier
function updateCartAndLocalStorage(operation, item) {
  operation(item); // Ajouter ou retirer du panier
  saveCartToLocalStorage(); // Mettre à jour le localStorage
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
}

// Ajouter cette fonction pour sauvegarder le panier dans le localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}


async function fetchProducts() {
    try {
        token = localStorage.getItem('token'); // Get token from localStorage
        const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products`, {
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

onMounted(() => {
    fetchProducts();
    // loadCartFromLocalStorage();
});

// Ajouter cet événement pour sauvegarder le panier avant de décharger la page (changement d'onglet)
window.addEventListener('beforeunload', () => {
//   saveCartToLocalStorage();
});


</script>

<template>
    <section class="featured-products">
        <!-- Produits vedettes ou en promotion -->
        <h2>Tous nos articles</h2>
        <div class="product-grid flex fww gap-20 jcsb">
            <div v-for="product in products" :key="product.id" class="product-item">
                <img :src="`http://localhost:3100/${product.image}`" :alt="product.name">
                <p :title="product.name" class="product-name">{{ product.name }}</p>
                <p>{{ product.price }} €</p>
                <button class="btn-primary" @click="() => addToCart(product)">Ajouter au panier</button>
            </div>
        </div>

    </section>
</template>

<style scoped>
h2 {
    margin-bottom: 20px;
}

.product-item {
    /* border: 1px solid rgba(0, 0, 0, 0.5); */
    border-radius: 5px;
    padding: 10px;
    width: 265px;
    height: 360px;
    color: #000000;
    border: 1px solid transparent;
    cursor: pointer;
    transition: .2s ease-in-out;
}

img {
    height: 243px;
}

.product-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    /* Ajouter "..." si le texte déborde */
    overflow: hidden;
    text-overflow: ellipsis;

    /* Hauteur maximale pour deux lignes */
    max-height: calc(2em * 1.2);
}

.product-item:hover {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #F6931C;
}
</style>