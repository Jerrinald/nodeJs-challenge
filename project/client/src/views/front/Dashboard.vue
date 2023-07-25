<template>
    <div class="dashboard flex">
      <!-- Sidebar -->
      <div class="sidebar space-between">
        <!-- Sidebar content here -->
      </div>
  
      <!-- Content -->
      <div class="content">
        <h1>Products list</h1>
        <div>
          <table>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Payment status</th>
              <th>Payment date</th>
            </tr>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.paymentStatus }}</td>
              <td>{{ transaction.paymentDate }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const transactions = ref([]);
  
  async function fetchTransactions() {
    try {
      const response = await fetch('http://127.0.0.1:3000/transactions', {
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
  
  onMounted(() => {
    fetchTransactions();
  });
  </script>
  
  <style scoped>
  /* Your CSS styles here */
  </style>
  