<template>
    <div class="dashboard flex">
      <!-- Sidebar -->
      <div class="sidebar space-between">
        <!-- Sidebar content here -->
      </div>
  
      <!-- Content -->
      <div class="content">
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

  
  onMounted(() => {
    fetchTransactions();
  });
  </script>
  
  <style scoped>
  /* Your CSS styles here */
  </style>
  