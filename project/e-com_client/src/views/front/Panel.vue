<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import ModalPay from '../../components/ModalPay.vue'
import IconDelete from '../../components/icons/IconDelete.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import moulinex from '../../assets/images/moulinex.jpg'


const cartItems = ref([]);
let token = null; // Declare the token variable

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
    console.log(cartItems.value)
  }
}

const cartItemsLength = ref([]);
onMounted(() => {
  loadCartFromLocalStorage();
  cartItemsLength.value = cartItems.value;
  console.log(cartItemsLength.value)
});

// Utiliser cette méthode pour ajouter ou retirer des éléments du panier
function updateCartAndLocalStorage(operation, item) {
  operation(item); // Ajouter ou retirer du panier
  saveCartToLocalStorage(); // Mettre à jour le localStorage
  // cartChannel.postMessage(cartItems.value); // Diffuser le panier
}


function removeFromCart(item) {
  const index = cartItems.value.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity--;
    } else {
      cartItems.value.splice(index, 1);
    }
    // updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value);
    saveCartToLocalStorage(); // Mettre à jour le localStorage après chaque retrait du panier
  }
}

function addArticle(product){

  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  }
  else{
    console.log("Pas d'article")
  }

    // updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value);
  saveCartToLocalStorage(); // Mettre à jour le localStorage après chaque ajout au panier
}

// Ajouter cette fonction pour sauvegarder le panier dans le localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}

function calculateTotalAmount() {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
}

function generateOrderNumber() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `CMD${currentDate}${randomNumber}`;
}

// Ajouter cette fonction pour générer un ID de commande aléatoire
function generateOrderId() {
  return Math.floor(Math.random() * 1000000);
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

    // post item in orderItems one by one
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
        console.log('Order created successfully.');
      } else {
        console.error('Failed to create the order.');
        return;
      }
    }

    // Now validate the cart
    const transactionResponse = await fetch('http://127.0.0.1:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
      body: JSON.stringify(cartItems.value),
    });

    if (transactionResponse.ok) {
      console.log('Cart validated. Transaction successful!');
      // Clear the cart after successful validation
      cartItems.value = [];
      updateCartAndLocalStorage((cart) => (cartItems.value = cart.map((item) => ({ ...item }))), cartItems.value); // Mettre à jour le localStorage après avoir vidé le panier
    } else {
      console.error('Failed to validate the cart.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

</script>

<template>
  <div>
    <Header />
    <main class="container">
      <table>
        <thead>
          <tr>
            <th colSpan="5">Mon panier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="card in cartItemsLength" :key="card.id">
            <td>
              <div class="flex aic gap-20">
                <div><img :src="moulinex" alt="" srcset=""></div>
                <div class="product-name">{{ card.name }}</div>
              </div>
            </td>
            <td><span>Prix: </span><strong>{{ card.price * card.quantity }} €</strong></td>
            <td>
              <div class="btn-group flex gap-10 aic">
                <button @click="removeFromCart(card)" class="btn btn-danger">-</button>
                <strong>{{ card.quantity }}</strong>
                <button @click="addArticle(card)" class="btn btn-primary">+</button>
              </div>
            </td>
            <td>
              <div class="btn-delete"><IconDelete /></div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <div class="flex jce">
                <div class="flex gap-10">
                <p>Total:</p>
                <strong>{{ calculateTotalAmount() }} €</strong>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="flex jce">
        <!-- <button class="btn-primary">Valider mon panier</button> -->
        <div @click="() => validateCart()" v-if="cartItems.length">
          <ModalPay :data="cartItemsLength"  />
        </div>
      </div>
    </main>
    <Footer />
  </div>
  <section>
    <!-- <div v-if="!cartItems.length">Votre panier est vide</div>
        <ul v-else>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - {{ item.price }} € - Quantité: {{ item.quantity }}
            <button @click="removeFromCart(item)">Retirer du panier</button>
          </li>
        </ul>
        <button @click="validateCart" v-if="cartItems.length">Valider le panier</button> -->
  </section>
</template>

<style scoped>
.banner-item {
  color: #000000;
}

strong {
  font-weight: bold;
}

.banner-item:hover {
  color: #F6931C;
}

s {
  color: rgb(156, 164, 172);
}

.last-article {
  color: red;
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

  max-width: 500px;
}
img{
  width: 50px;
  height: 50px;
}

main {
  height: calc(100vh - 96px);
}
</style>