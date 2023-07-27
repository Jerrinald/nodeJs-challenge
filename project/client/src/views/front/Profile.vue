<template>
    <section>
        <h2>Transactions</h2>
        <div v-if="!transactions.length">Aucune transaction</div>
        <div v-else class="transaction-grid">
            <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
                <div class="transaction-info">
                <p><strong>Order ID:</strong> {{ transaction.orderId }}</p>
                <p><strong>Montant:</strong> {{ transaction.amount }}</p>
                <p><strong>Statut:</strong> {{ transaction.status }}</p>
                </div>
        </div>
        </div>
    </section>
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
    let march = {
      marchandId: marchand.id,
    };

    try {
      const response = await fetch(`http://localhost:3000/marchands/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token in the headers
        },
        body: JSON.stringify(march)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        transactions.value = data;
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

.transaction-item h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.transaction-info {
  margin-top: 10px;
  font-size: 14px;
}

.transaction-info p {
  margin: 5px 0;
}
  </style>
  