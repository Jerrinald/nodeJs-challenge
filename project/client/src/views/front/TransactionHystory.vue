<template>
    <div class="transactions-history">

        <h2>Rechercher l'historique des transactions pour un OrderId</h2>
        <form @submit.prevent="searchTransactions" class="search-form">
            <label for="searchQuery">Order ID:</label>
            <input type="text" id="searchQuery" v-model="searchOrderId" required>
            <button type="submit">Rechercher</button>
        </form>


        <h2>Historique des transactions pour la commande {{ selectedOrderId }}</h2>
        <table class="transactions-history-table">
            <thead>
                <tr>
                    <th>ID de Transaction</th>
                    <th>ID de Commande</th>
                    <th>ID de Marchand</th>
                    <th>ID de Client</th>
                    <th>Nom du Client</th>
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
                    <td>{{ transaction.clientId }}</td>
                    <td>{{ transaction.clientName }}</td>
                    <td>{{ transaction.amount }}</td>
                    <td>{{ transaction.status }}</td>
                    <td>{{ formatDate(transaction.createdAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';

const transactionsHistory = ref([]);
const searchOrderId = ref('');
const selectedOrderId = ref('');

const updateTransactionsHistory = async () => {
    selectedOrderId.value = searchOrderId.value;
    try {
        const response = await fetch(`http://localhost:3000/operations/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            transactionsHistory.value = data;
        } else {
            console.error('Erreur lors de la récupération de l\'historique des transactions:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des transactions:', error);
    }
};

const filteredTransactions = computed(() => {
    if (!searchOrderId.value) {
        return transactionsHistory.value;
    }

    return transactionsHistory.value.filter(transaction => transaction.orderId === searchOrderId.value);
});

const displayedTransactions = computed(() => {
    return searchOrderId.value ? filteredTransactions.value : transactionsHistory.value;
});

const searchTransactions = () => {
    updateTransactionsHistory();
};

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
</script>
  
<style scoped>
.transactions-history {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.transactions-history h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.transactions-history-table {
    width: 100%;
    border-collapse: collapse;
}

.transactions-history-table th,
.transactions-history-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.transactions-history-table th {
    background-color: #f2f2f2;
}

.search-form {
    margin-top: 20px;
}

.search-form label,
.search-form button {
    margin-right: 10px;
}
</style>
  