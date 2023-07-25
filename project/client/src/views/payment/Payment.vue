<template>
  <div class="login-form">
    <h2>Paiement</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="numCarte">Numéro de carte:</label>
        <input type="numCarte" id="numCarte"  required>
      </div>
      <div>
        <label for="expireDate">Date d'expiration:</label>
        <input type="date" id="expireDate"  required>
      </div>
      <div>
        <label for="cvc">CVC:</label>
        <input type="cvc" id="cvc"  required>
      </div>
      <button type="submit">Confirmer</button>
      
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

let user = reactive({
  email: '',
  password: ''
});


async function loginUser() {
  try {
    const response = await fetch('http://localhost:3000/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      // Gérer la réponse de l'API en fonction de vos besoins
      console.log(data);
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
</script>

<style scoped>
/* Vos styles CSS ici */
</style>