<template>
    <div class="transactions">
        <h2>Toutes les transactions</h2>
        <table>
            <thead>
                <tr>
                    <th>ID de Transaction</th>
                    <th>ID de Commande</th>
                    <th>ID de Marchand</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Date de Création</th>
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
                </tr>
            </tbody>
        </table>

        <h2>Rechercher une transaction</h2>
        <form @submit.prevent="searchTransactions">
            <label for="searchQuery">Recherche:</label>
            <input type="text" id="searchQuery" v-model="searchQuery">
            <button type="submit">Rechercher</button>
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
        const response = await fetch("http://localhost:3000/transactions", {
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

h2 {
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

form {
    margin-top: 20px;
}

label {
    margin-right: 5px;
}

input[type="text"] {
    padding: 5px;
}

button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
  