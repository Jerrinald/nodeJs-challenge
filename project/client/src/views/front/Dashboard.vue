<template>
  <section>
    <h2>Marchands</h2>
    <div v-if="!merchants.length">Aucun marchand</div>
    <div class="merchant-grid">
      <div v-for="merchant in merchants" :key="merchant.id" class="merchant-item">
        <h3>{{ merchant.companyName }}</h3>
        <p>KBIS: {{ merchant.KBIS }}</p>
        <p>Numéro: {{ merchant.numero }}</p>
        <p>Devise: {{ merchant.devise }}</p>
        <p>URL Confirmation: {{ merchant.url_confirmation }}</p>
        <p>URL Annulation: {{ merchant.url_annulation }}</p>
        <button @click="editMerchant(merchant)">Modifier</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const merchants = ref([]);
const token = localStorage.getItem('token');


// Fetch merchants from the API
async function fetchMerchants() {
  try {
    console.log('Fetching merchants...', token);
    const response = await fetch('http://localhost:3000/marchands', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      merchants.value = data;
    } else {
      console.error('Failed to fetch merchants');
      // Handle the error or show a message to the user
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error or show a message to the user
  }
}

// Function to edit a merchant (implement this function according to your requirements)
function editMerchant(merchant) {
  console.log('Edit merchant:', merchant);
  // Implement the logic to edit the merchant's information
}

// Call the fetchMerchants function on component mount
onMounted(() => {
  fetchMerchants();
});
</script>

<style scoped>
/* Your styles CSS here */
</style>
