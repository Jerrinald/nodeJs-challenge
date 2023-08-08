<template>
    <div class="operations">
        <h2>Toutes les opérations</h2>
        <table class="operations-table">
            <thead>
                <tr>
                    <th>ID d'Opération</th>
                    <th>ID de Marchand</th>
                    <th>Nature de l'Opération</th>
                    <th>ID de Transaction</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>ID de Commande</th>
                    <th>Nom de la Carte</th>
                    <th>Nom du Client</th>
                    <th>Date de Création</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="operation in displayedOperations" :key="operation.id">
                    <td>{{ operation.id }}</td>
                    <td>{{ operation.MarchandId }}</td>
                    <td>
                        <select v-model="operation.NatureOp" @change="updateNature(operation)">
                            <option value="capture">Capture</option>
                            <option value="refund">Refund</option>
                        </select>
                    </td>
                    <td>{{ operation.TransactionId }}</td>
                    <td>{{ operation.Montant }}</td>
                    <td>{{ operation.status }}</td>
                    <td>{{ operation.orderId }}</td>
                    <td>{{ operation.creditCardName }}</td>
                    <td>{{ operation.clientName }}</td>
                    <td>{{ formatDate(operation.createdAt) }}</td>
                    <td>
                        <button @click="updateStatus(operation, 'annuler')"
                            :disabled="operation.status === 'annuler'">Annuler</button>
                        <button @click="updateStatus(operation, 'confirmer')"
                            :disabled="operation.status === 'confirmer'">Confirmer</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>Rechercher une opération</h2>
        <form @submit.prevent="searchOperations" class="search-form">
            <label for="searchQuery">Recherche:</label>
            <input type="text" id="searchQuery" v-model="searchQuery">
            <button type="submit">Rechercher</button>
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';

const operations = ref([]);
const searchQuery = ref('');

const getAllOperations = async () => {
    try {
        const response = await fetch("http://localhost:3000/operations", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            operations.value = data;
        } else {
            console.error('Erreur lors de la récupération des opérations:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des opérations:', error);
    }
};

const updateStatus = async (operation, newStatus) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

        // Check if the token exists
        /*if (!token) {
            console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
            return;
        }*/

        const response = await fetch(`http://localhost:3000/operations/${operation.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`, // Add JWT token to the request header
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            operation.status = newStatus; // Update the status in the local data
        } else {
            console.error('Erreur lors de la mise à jour du statut:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
    }
};

const updateNature = async (operation) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

        // Check if the token exists
        /*if (!token) {
            console.error('Token non trouvé dans le local storage. Veuillez vous connecter.');
            return;
        }*/

        const response = await fetch(`http://localhost:3000/operations/${operation.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`, // Add JWT token to the request header
            },
            body: JSON.stringify({ NatureOp: operation.NatureOp }),
        });

        if (response.ok) {
            console.log(`Nature of operation ${operation.id} updated to: ${operation.NatureOp}`);
        } else {
            console.error('Erreur lors de la mise à jour de la nature de l\'opération:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la nature de l\'opération:', error);
    }
};

const filteredOperations = computed(() => {
    if (!searchQuery.value) {
        return operations.value;
    }

    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return operations.value.filter(operation => {
        for (const prop in operation) {
            if (String(operation[prop]).toLowerCase().includes(lowerCaseQuery)) {
                return true;
            }
        }
        return false;
    });
});

const displayedOperations = computed(() => {
    return searchQuery.value ? filteredOperations.value : operations.value;
});

const searchOperations = () => {
    // Perform search actions here if needed
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

onMounted(() => {
    getAllOperations();
});
</script>
  
<style scoped>
.operations {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.operations h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.operations-table {
    width: 100%;
    border-collapse: collapse;
}

.operations-table th,
.operations-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.operations-table th {
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
  