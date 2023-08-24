<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import ModalPay from '../../components/ModalPay.vue'
import IconDelete from '../../components/icons/IconDelete.vue'
import { ref, onMounted, onBeforeUnmount, provide } from 'vue';

// Replace 'moulinex' import with actual images if needed

const apiEcomUrl = ref(import.meta.env.VITE_API_ECOM);

const successfulTransactionIds = []; // Array to store successful transaction IDs
const successfulOrdersIds = []; // Array to store successful transaction IDs

const cartItems = ref([]);
let token = localStorage.getItem('token');
console.log("token", token);
let user = localStorage.getItem('user');
console.log(user);

  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart);
      console.log(cartItems.value);
    }
  }

  onMounted(() => {
    loadCartFromLocalStorage();
  });

function updateCartAndLocalStorage(operation, item) {
  operation(item);
  saveCartToLocalStorage();
}

function removeFromCart(item) {
  const index = cartItems.value.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity--;
    } else {
      cartItems.value.splice(index, 1);
    }
    saveCartToLocalStorage();
  }
}

function addArticle(product) {
  const existingItem = cartItems.value.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  }
  saveCartToLocalStorage();
}

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


async function validateCart() {
  if (cartItems.value.length === 0) {
    console.log('Cart is empty. Add items to the cart before validating.');
    return;
  }

  const orderNumber = generateOrderNumber();

  const orderItems = cartItems.value.map((item) => ({
    idClient: user.id,
    numeroCommande: orderNumber,
    numeroProduit: item.numeroProduit,
    prixProduit: item.prixProduit,
    quantiteProduit: item.quantity,
    statut: 'En cours',
  }));

  for (const orderItem of orderItems) {
    console.log('Order send:', orderItem);
    const orderResponse = await fetch(`${import.meta.env.VITE_API_ECOM}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderItem),
    });

    if (!orderResponse.ok) {
      console.error('Failed to create the order.');
      return;
    }else{
        const orderData = await orderResponse.json(); // Await here
        console.log('Order successful!', orderData);
        successfulOrdersIds.push(orderData.id); // Store the transaction ID in the array
    }
  }

  const transactionItems = cartItems.value.map((item) => ({
    orderId: orderNumber,
    marchandId: localStorage.getItem('userId'),
    clientId: user.id,
    clientName: user.nom,
    amount: item.prixProduit * item.quantity,
    status: "En cours",

  }));

  for (const transactionItem of transactionItems) {
    const transactionResponse = await fetch(`${import.meta.env.VITE_API_ECOM}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(transactionItem),

    });

    if (transactionResponse.ok) {
      const transactionData = await transactionResponse.json(); // Await here
      console.log('Cart validated. Transaction successful!', transactionData);
      successfulTransactionIds.push(transactionData.id); // Store the transaction ID in the array
      console.log('Client id', user.id);
    } else {
      console.error('Failed to validate the cart.');
    }
  }

}

const handleFormSubmitted = async (formData) => {


    console.log('Form data submitted:', formData);
    console.log(successfulTransactionIds);
    console.log(successfulOrdersIds)

    const bodyOperations = {
      MarchandId: 123, // Replace with the actual merchant ID
      NatureOp: 'purchase',
      transactionIdArr: successfulTransactionIds, // Replace with a unique transaction ID
      Montant: calculateTotalAmount(), // Replace with the calculated total amount
      status: 'pending',
      orderIdArr: successfulOrdersIds, // Replace with the actual order ID
      creditCardNumber: '**** **** **** 1234', // Replace with a masked credit card number
      creditCardExpdate: '12/24', // Replace with a credit card expiration date
      creditCardCvc: '123', // Replace with a credit card CVV
      creditCardName: 'John Doe', // Replace with the cardholder's name
      clientName: 'John' // Use the name from the form data
    };

    const operationResponse = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/operations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bodyOperations),

    });

    if (operationResponse.ok) {
      const operationData = await operationResponse.json();
      console.log('Operation successful!', operationData);
    } else {
      console.error('Failed to perform the operation.');
    }

    

    // Clear the cart after successful validation
    cartItems.value = [];
    saveCartToLocalStorage();
    

  };
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
          <tr v-for="card in cartItems" :key="card.id">
            <td>
              <div class="flex aic gap-20">
                <div><img :src="apiEcomUrl + '/' + card.image" :alt="card.name" srcset=""></div>
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
              <div class="btn-delete" @click="removeFromCart(card)">
                <IconDelete />
              </div>
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
        <div @click="validateCart" v-if="user && cartItems.length ">
          <ModalPay :data="cartItems" :total="calculateTotalAmount()" @formSubmitted="handleFormSubmitted" />
        </div>
      </div>
    </main>
    <Footer />
  </div>
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
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: calc(2em * 1.2);
  max-width: 500px;
}

img {
  width: 50px;
  height: 50px;
}

main {
  height: calc(100vh - 96px);
}
</style>
