<template>
  <!-- <h2>Marchands</h2> -->
  <div v-if="!merchants.length">Aucun marchand</div>
  <div v-else class="merchant-grid">
    <!-- Merchant List Section -->
    <div v-if="showMerchantList">
      <div v-for="merchant in merchants" :key="merchant.id" class="merchant-item"
        @click="showMerchantTransactions(merchant)">
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
    <!-- Transaction List Section -->
    <div v-if="showTransactionList">
      <h2>Transactions de {{ selectedMerchant.firstname }} {{ selectedMerchant.lastname }}</h2>
      <div v-if="!transactions.length">Aucune transaction</div>
      <div v-else class="transaction-grid">
        <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
          <div class="transaction-info">
            <p><strong>Numéro commande:</strong> {{ transaction.value.numeroCommande }}</p>
            <p><strong>Numéro produit:</strong> {{ transaction.value.numeroProduit }}</p>
            <p><strong>Montant:</strong> {{ transaction.amount }}</p>
            <p><strong>Statut:</strong> {{ transaction.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const transactions = ref([]);

const showMerchantList = ref(true); // Initially show the merchant list
const showTransactionList = ref(false); // Initially hide the transaction list

const selectedMerchant = ref(null);

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

    const randomClient = generateRandomClient();
    console.log('Client ID:', randomClient.clientId);
    console.log('Client Secret:', randomClient.clientSecret);

    // Prepare the data for the PATCH request
    const newData = {
      active: true, // Set the 'active' field to true to activate the account
      clientID: randomClient.clientId,
      clientSecret: randomClient.clientSecret,
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

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function generateRandomClient() {
  const clientIdLength = 16; // Longueur du client ID souhaitée
  const clientSecretLength = 32; // Longueur du client secret souhaitée

  const clientId = generateRandomString(clientIdLength);
  const clientSecret = generateRandomString(clientSecretLength);

  return {
    clientId: clientId,
    clientSecret: clientSecret
  };
}

async function showMerchantTransactions(merchant) {
  try {
    selectedMerchant.value = merchant;
    showMerchantList.value = false; // Hide the merchant list
    showTransactionList.value = true; // Show the transaction list

    // Fetch transactions for the selected merchant
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions/marchand/${merchant.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Update transactions for the selected merchant
      transactions.value = data;
      for (const transaction of transactions.value) {
        console.log(transaction);
        fetchOrderInfo(transaction);
        console.log(transaction);
      }
    } else {
      console.error('Failed to fetch transactions');
      // Handle the error or show a message to the user
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error or show a message to the user
  }
}

async function fetchOrderInfo(transacArray) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/orders/${transacArray.orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the token in the headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      transacArray.value = data;
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
.merchant-grid div {
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

p {
  color: #000000;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
