<template>
    <div class="dashboard flex">
      <!-- Sidebar -->
      <div class="sidebar space-between">
        <!-- Sidebar content here -->
      </div>
  
      <!-- Content -->
      <div class="content">
      <button @click="toggleForm">Add New Transaction</button>
      <!-- Add transaction form -->
          <form v-if="showForm" @submit.prevent="addTransaction">


            <label for="country">Country:</label>
            <input type="text" id="country" v-model="newTransaction.country" required>

            <button type="submit">Add Transaction</button>
          </form>
        <h1>Liste des transactions</h1>
        <div>

          <table>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Country</th>
            </tr>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.status }}</td>
              <td>{{ transaction.country }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from 'vue';
  
  const transactions = ref([]);

  let newTransaction = reactive({
    country: ''
  });

  const showForm = ref(false); // Initially hidden
  
  async function fetchTransactions() {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers, like authorization if required
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        transactions.value = data;
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async function addTransaction() {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        const data = await response.json();
        // Gérer la réponse de l'API en fonction de vos besoins
        console.log(data);
        newTransaction.value = { country: '' };
        fetchTransactions();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  function toggleForm() {
    showForm.value = !showForm.value; // Toggle the form visibility
  }
  
  onMounted(() => {
    fetchTransactions();
  });
  </script>
  
  <style scoped>
  /* Your CSS styles here */
  </style>
  