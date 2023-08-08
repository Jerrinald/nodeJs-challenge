<template>
  <div class="page dashboard flex">
    <Aside />
    <div class="block-container flex fdc gap-20">
      <div class="flex jcsb">
        <input type="search" placeholder="Rechercher...">
        <div class="flex aic gap-10">
          <a href="#">Déconnexion</a>
        </div>
      </div>

      <div class="marchant-container">
        <h1>Bienvenue {{ marchand.lastname + " " + marchand.firstname }}</h1>
        <h2 class="title">Mon profil</h2>

        <div class="merchant-info">
          <p><strong>Nom:</strong> {{ marchand.firstname }}</p>
          <p><strong>Prénom:</strong> {{ marchand.lastname }}</p>
          <p><strong>Company:</strong> {{ marchand.companyName }}</p>
          <p><strong>Email:</strong> {{ marchand.email }}</p>
          <p><strong>KBIS:</strong> {{ marchand.KBIS }}</p>
          <p><strong>Numéro:</strong> {{ marchand.numero }}</p>
          <p><strong>Devise:</strong> {{ marchand.devise }}</p>
          <p><strong>URL Confirmation:</strong> {{ marchand.url_confirmation }}</p>
          <p><strong>URL Annulation:</strong> {{ marchand.url_annulation }}</p>
        </div>
        <section class="flex fdc aic jcc">
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
      <div class="block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit fugiat placeat rerum
        sapiente amet, quaerat beatae modi illum officia nam quis? Ea alias, iste doloribus quas temporibus ratione
        quasi animi?</div>
    </div>

  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import store from "../../store";
import Aside from '../../components/Aside.vue';

const token = localStorage.getItem('token');

const transactions = ref([]);
const marchand = store.state.user


// Fetch merchants from the API
async function fetchTransactionsByIdmarchand() {


  try {
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions/marchand/${marchand.id}`, {
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

// Call the fetchMerchants function on component mount
onMounted(() => {
  fetchTransactionsByIdmarchand();
});
</script>
  
<style scoped>
/* Your styles CSS here */

/* .page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
} */

.title {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}

/* .page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
} */

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

.dashboard {
    background-color: #9094A2;
}

.block-container {
    padding: 20px;
}

input {
    width: 300px;
}

.block-container .block {
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 350px;
    color: #9094A2;
    padding: 20px;
}
</style>
  