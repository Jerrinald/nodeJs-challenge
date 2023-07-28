<template>
    <!-- <h2>Marchands</h2> -->
    <div v-if="!merchants.length">Aucun marchand</div>
    <div v-else class="merchant-grid">
      <div v-for="merchant in merchants" :key="merchant.id" class="merchant-item">
        <div class="merchant-info">
          <p><strong>Nom:</strong> {{ merchant.firstname }}</p>
          <p><strong>Prénom:</strong> {{ merchant.lastname }}</p>
          <p><strong>Email:</strong> {{ merchant.email }}</p>
          <p><strong>KBIS:</strong> {{ merchant.KBIS }}</p>
          <p><strong>Numéro:</strong> {{ merchant.numero }}</p>
          <p><strong>Devise:</strong> {{ merchant.devise }}</p>
          <p><strong>URL Confirmation:</strong> {{ merchant.url_confirmation }}</p>
          <p><strong>URL Annulation:</strong> {{ merchant.url_annulation }}</p>
          <p><strong>Actif:</strong> {{ merchant.active ? 'Oui' : 'Non' }}</p>
        </div>
        <div class="merchant-actions">
          <button class="btn btn-primary" @click="editMerchant(merchant)">Modifier</button>
          <button class="btn" v-if="!merchant.active" @click="activateMerchant(merchant)">Activer</button>
        </div>
      </div>
    </div>
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
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/marchands`, {
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

// Function to activate a merchant's account
async function activateMerchant(merchant) {
  try {
    // Prepare the data for the PATCH request
    const newData = {
      active: true, // Set the 'active' field to true to activate the account
    };

    // Call the API endpoint to activate the merchant's account
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/marchands/${merchant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
      body: JSON.stringify(newData), // Convert the data to JSON and include it in the request body
    });

    if (response.ok) {
      // Update the local merchants data to reflect the activation status
      merchant.active = true;
    } else {
      console.error('Failed to activate merchant');
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
.merchant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.merchant-item {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.merchant-item h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.merchant-info {
  margin-top: 10px;
  font-size: 14px;
}

.merchant-info p {
  margin: 5px 0;
}

.merchant-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

button:nth-child(2) {
  background-color: #FFFFFF;
  color: #000000;
}

button:hover {
  opacity: 0.9;
}

button:active {
  opacity: 0.8;
}

</style>
