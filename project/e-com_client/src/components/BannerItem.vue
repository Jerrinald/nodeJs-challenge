<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import adidas from '../assets/images/adidas.avif'
import { useStore } from 'vuex'; 

const store = useStore()

const products = ref([]);
const cartItems = ref([]);
let token = null; // Declare the token variable

const apiEcomUrl = ref(import.meta.env.VITE_API_ECOM);

const fallbackProducts = [
  {
    id: 1,
    name: 'Chaussure adidas Grand Court x LEGO',
    image: 'path/to/image1.jpg',
    price: 53.99,
  },
  {
    id: 2,
    name: 'Chaussure adidas Grand Court x LEGO',
    image: 'path/to/image1.jpg',
    price: 53.99,
  },
  {
    id: 3,
    name: 'Chaussure adidas Grand Court x LEGO',
    image: 'path/to/image1.jpg',
    price: 53.99,
  },
  {
    id: 4,
    name: 'Chaussure adidas Grand Court x LEGO',
    image: 'path/to/image1.jpg',
    price: 53.99,
  },
]

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

// Save cartItems to the Vuex store
function saveCartToStore() {
  store.state.cartItems = cartItems.value;
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
    <div v-for="product in products" :key="product.id" class="product-item">
        <a href="#" class="banner-item">
            <img :src="product.image ? apiEcomUrl + '/' + product.image : adidas" style="min-height: 350px; min-width: 350px;">
            <p :title="product.name" class="product-name">{{ product.name }}</p>
            <strong>{{ product.price }} €</strong>
            
            <button class="btn-primary add-prod-to-cart"  @click="() => addToCart(product)">Ajouter au panier</button>
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

.add-prod-to-cart{
  display: flex;
}

.last-article{
    color: red;
}
</style>