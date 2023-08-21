<template>
  <div class="transactions">
    <h2>Toutes les transactions</h2>
    <table class="transactions-table">
      <thead>
      <tr>
        <th>ID de Transaction</th>
        <th>ID de Commande</th>
        <th>ID de Marchand</th>
        <th>Montant</th>
        <th>Statut</th>
        <th>Date de Création</th>
        <th>Nom du Client</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in displayedTransactions" :key="transaction.id">
        <td>{{ transaction.id }}</td>
        <td>{{ transaction.orderId }}</td>
        <td>{{ transaction.marchandId }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.status }}</td>
        <td>{{ formatDate(transaction.createdAt) }}</td>
        <td>{{ transaction.clientName }}</td>
        <td>
          <button
              @click="updateStatus(transaction, 'annuler')"
              :disabled="transaction.status === 'annuler'"
              class="action-button annuler-button"
          >
            Annuler
          </button>
          <button
              @click="updateStatus(transaction, 'confirmer')"
              :disabled="transaction.status === 'confirmer'"
              class="action-button confirmer-button"
          >
            Confirmer
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <h2>Rechercher une transaction</h2>
    <form @submit.prevent="searchTransactions" class="search-form">
      <label for="searchQuery">Recherche:</label>
      <input type="text" id="searchQuery" v-model="searchQuery" class="search-input">
      <button type="submit" class="search-button">Rechercher</button>
    </form>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

// Define a reactive property to store all transactions
const transactions = ref([]);

// Define a reactive property for search query
const searchQuery = ref('');

// Function to fetch all transactions from the API
const getAllTransactions = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            transactions.value = data;
        } else {
            console.error('Erreur lors de la récupération des transactions:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des transactions:', error);
    }
};

// Function to update the status of a transaction
const updateStatus = async (transaction, newStatus) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

        // Check if the token exists
        /*if (!token) {
            console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
            return;
        }*/

        const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions/${transaction.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add JWT token to the request header
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            transaction.status = newStatus; // Update the status in the local data
        } else {
            console.error('Erreur lors de la mise à jour du statut:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
    }
};

// Function to filter transactions based on the search query
const filteredTransactions = computed(() => {
    if (!searchQuery.value) {
        return transactions.value;
    }

    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return transactions.value.filter(transaction => {
        for (const prop in transaction) {
            if (String(transaction[prop]).toLowerCase().includes(lowerCaseQuery)) {
                return true;
            }
        }
        return false;
    });
});

// Define a computed property for displayed transactions
const displayedTransactions = computed(() => {
    return searchQuery.value ? filteredTransactions.value : transactions.value;
});

// Function to perform the search
const searchTransactions = () => {
    // You can perform additional actions here if needed
};

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

// Fetch all transactions when the component mounts
onMounted(() => {
    getAllTransactions();
});

</script>

<style scoped>
.transactions {
  margin: 20px;
}

.transactions h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.transactions-table th,
.transactions-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.transactions-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.transactions-table tbody tr:nth-child(odd) {
  background-color: #fff;
}

.transactions-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
}

.annuler-button {
  background-color: #f44336;
  color: white;
}

.confirmer-button {
  background-color: #4caf50;
  color: white;
}

.search-form {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.search-label {
  font-size: 14px;
  margin-right: 10px;
}

.search-input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.search-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>

  