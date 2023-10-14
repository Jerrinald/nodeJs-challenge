<template>
  <div class="page">
    
    <h1>Bienvenue {{ marchand.lastname + " " + marchand.firstname }}</h1>
    <h2 class="title">Mon profil</h2>

    <div v-if="!marchand.length" class="merchant-info">
      <p><strong>Nom:</strong> {{ marchand.firstname }}</p>
      <p><strong>Prénom:</strong> {{ marchand.lastname }}</p>
      <p><strong>Company:</strong> {{ marchand.companyName }}</p>
      <p><strong>Email:</strong> {{ marchand.email }}</p>
      <p><strong>KBIS:</strong> {{ marchand.KBIS }}</p>
      <p><strong>Numéro:</strong> {{ marchand.numero }}</p>
      <p><strong>Devise:</strong> {{ marchand.devise }}</p>
      <p><strong>URL Confirmation:</strong> {{ marchand.url_confirmation }}</p>
      <p><strong>URL Annulation:</strong> {{ marchand.url_annulation }}</p>
      <p><strong>jeton ID:</strong> {{ marchand.clientID }}</p>
      <p><strong>jeton secret:</strong> {{ marchand.clientSecret }}</p>
      <button @click="handleActivateMerchant">Regénérer Token</button>
    </div>
    <button @click="openEditForm">Edit Profile</button>
    <div v-if="showEditForm">
      <!-- Your edit form here -->
      <form @submit="submitEditForm">
        <!-- Input fields to edit the merchant's data -->
        <p><strong>Nom:</strong></p><input v-model="editedMerchant.firstname" />
        <p><strong>Prénom:</strong></p><input v-model="editedMerchant.lastname" />
        <p><strong>Numéro:</strong></p><input v-model="editedMerchant.numero" />
        <p><strong>Devise:</strong></p><input v-model="editedMerchant.devise" />
        <p><strong>URL Confirmation:</strong></p><input v-model="editedMerchant.url_confirmation" />
        <p><strong>URL Annulation:</strong></p><input v-model="editedMerchant.url_annulation" />

        <!-- Add other fields for editing other data as needed -->
        <button type="submit">Sauvegarder</button>
      </form>
    </div>

  <section class="page-container">
    <h2>Mes transactions</h2>
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
  </section>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import store from "../../store";
  
  const token = localStorage.getItem('token');

  // Data properties for the edit form
  const showEditForm = ref(false); // Initially hidden
  const editedMerchant = ref({}); // Initialize as an empty object

  const transactions = ref([]);
  const marchand = ref(store.state.user); // Initialize as null

  const openEditForm = () => {
    editedMerchant.value = { ...marchand.value }; // Copy the current merchant data
    showEditForm.value = !showEditForm.value; // Show the edit form
  };

  async function activateMerchant(merchant) {
  try {
    const randomClient = generateRandomClient();

    // Prepare the data for the PATCH request
    const newData = {
      clientID: randomClient.clientId,
      clientSecret: randomClient.clientSecret,
    };

    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/marchands/${merchant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      // Return the updated merchant data
      return {
        ...merchant, // Include existing merchant data
        clientID: newData.clientID,
        clientSecret: newData.clientSecret,
      };
    } else {
      throw new Error('Failed to activate merchant');
    }
  } catch (error) {
    throw new Error('An error occurred:', error);
  }
}

const submitEditForm = async () => {
    try {
      // Send a request to update the merchant's data
      const response = await fetch(
        `${import.meta.env.VITE_API_PAIEMENT}/marchands/${marchand.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(editedMerchant.value),
        }
      );

      if (response.ok) {
        // Update the local marchand object with the new values
        marchand.value = { ...editedMerchant.value };
        showEditForm.value = false; // Hide the edit form
      } else {
        console.error('Failed to update merchant data');
        // Handle the error or show a message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error or show a message to the user
    }
  };

const handleActivateMerchant = async () => {
  try {
    if (marchand.value) {
      const updatedMerchant = await activateMerchant(marchand.value);

      // Update the local marchand object with the new values
      marchand.value.clientID = updatedMerchant.clientID;
      marchand.value.clientSecret = updatedMerchant.clientSecret;
    }
  } catch (error) {
    console.error('An error occurred during activation:', error);
    // Handle the error or show a message to the user
  }
};

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString
}

function generateRandomClient() {
  const clientIdLength = 16; // Longueur du client ID souhaitéej
  const clientSecretLength = 32; // Longueur du client secret souhaitée

  const clientId = generateRandomString(clientIdLength);
  const clientSecret = generateRandomString(clientSecretLength);

  return {
    clientId: clientId,
    clientSecret: clientSecret
  };
}

onMounted(() => {  
  fetchTransactionsByIdmarchand();
});
  
  
  // Fetch merchants from the API
  async function fetchTransactionsByIdmarchand() {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions/marchand/${marchand.value.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token in the headers
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        transactions.value = data;
        for (const transaction of transactions.value) {
          console.log(transaction)
          fetchOrderInfo(transaction) 
          console.log(transaction)
        }
        //fetchOrderInfo(data.orderId)
      } else {
        console.error('Failed to fetch merchants');
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
  
  </script>
  
  <style scoped>
  /* Your styles CSS here */

  .page {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Optionally set the height to 100vh to make the container fill the entire viewport */
}

.title {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}
  .page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Optionally set the height to 100vh to make the container fill the entire viewport */
}

.transaction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.transaction-item {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.transaction-info {
  margin-top: 10px;
  font-size: 14px;
}

.transaction-info p {
  margin: 5px 0;
  font-weight: bold;
}
  </style>
  