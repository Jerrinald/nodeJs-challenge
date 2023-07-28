<template>
  <div class="page">
    <h1 class="title">Mon profil</h1>
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

  const transactions = ref([]);
  const marchand = store.state.user
  
  
  // Fetch merchants from the API
  async function fetchTransactionsByIdmarchand() {


    try {
      const response = await fetch(`http://localhost:3000/transactions/marchand/${marchand.id}`, {
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
      const response = await fetch(`http://localhost:3100/orders/${transacArray.orderId}`, {
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
  
  // Call the fetchMerchants function on component mount
  onMounted(() => {
    fetchTransactionsByIdmarchand();
  });
  </script>
  
  <style scoped>
  /* Your styles CSS here */

  .page {
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
  