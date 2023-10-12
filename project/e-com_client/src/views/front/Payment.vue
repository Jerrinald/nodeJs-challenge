<template>
<div>
<Header />
    <main class="container">
        <div v-for="cart in cartItemsLength">
            <div>{{ cart.name }}</div>
        </div>
        <div>
            <strong>Prix total: {{ calculateTotalAmount() }}€</strong>
        </div>
    </main>
<Footer />
</div>
</template>

<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import {onMounted, ref} from 'vue'

const cartItems = ref([]);

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
    console.log(cartItems.value)
  }
}

function calculateTotalAmount() {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
}

const cartItemsLength = ref([]);
onMounted(() => {
  loadCartFromLocalStorage();
  cartItemsLength.value = cartItems.value;
  console.log(cartItemsLength.value)
});
</script>

<style scoped></style>