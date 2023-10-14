  <template>
    <div class="page">
      
      <h1>Bienvenue {{ marchand.lastname + " " + marchand.firstname }}</h1>
      <h2 class="title">Mon profil</h2>

      <div v-if="!marchand.length" class="merchant-info">
        <p><strong>Nom:</strong> {{ marchand.firstname }}</p>
        <p><strong>Prénom:</strong> {{ marchand.lastname }}</p>
        <p><strong>Company:</strong> {{ marchand.companyName }}</p>
        <p><strong>Email:</strong> {{ marchand.email }}</p>
        <p><strong>KBIS:</strong> {{ marchand.KBIS }}</p>
        <p><strong>Numéro:</strong> {{ marchand.numero }}</p>
        <p><strong>Devise:</strong> {{ marchand.devise }}</p>
        <p><strong>URL Confirmation:</strong> {{ marchand.url_confirmation }}</p>
        <p><strong>URL Annulation:</strong> {{ marchand.url_annulation }}</p>
        <p><strong>jeton ID:</strong> {{ marchand.clientID }}</p>
        <p><strong>jeton secret:</strong> {{ marchand.clientSecret }}</p>
        <button @click="handleActivateMerchant">Regénérer Token</button>
      </div>
      <button @click="openEditForm" class="edit-button">Edit Profile</button>
      <div v-if="showEditForm" class="showEditForm"> <!-- Ici, utilisez la classe CSS pour le formulaire -->
      <form @submit.prevent="submitEditForm">
        <!-- Champs du formulaire -->
        <p><strong>Nom:</strong></p><input v-model="editedMerchant.firstname" placeholder="Entrez le prénom" />
        <p><strong>Prénom:</strong></p><input v-model="editedMerchant.lastname" placeholder="Entrez le nom de famille" />
        <p><strong>Numéro:</strong></p><input v-model="editedMerchant.numero" placeholder="Entrez le numéro" />
        <p><strong>Devise:</strong></p><input v-model="editedMerchant.devise" placeholder="Entrez la devise" />
        <p><strong>URL Confirmation:</strong></p><input v-model="editedMerchant.url_confirmation" placeholder="Entrez l'URL de confirmation" />
        <p><strong>URL Annulation:</strong></p><input v-model="editedMerchant.url_annulation" placeholder="Entrez l'URL d'annulation" />

        <!-- Bouton de soumission -->
        <button type="submit" class="submit-button">Sauvegarder</button>
      </form>
    </div>
    </div>
  </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';

    import store from "../../store";
    
    const token = localStorage.getItem('token');

    // Data properties for the edit form
    const showEditForm = ref(false); // Initially hidden
    const editedMerchant = ref({}); // Initialize as an empty object

    const transactions = ref([]);
    const marchand = ref(store.state.user); // Initialize as null

    const openEditForm = () => {
      editedMerchant.value = { ...marchand.value }; // Copy the current merchant data
      showEditForm.value = !showEditForm.value; // Show the edit form
    };

    async function activateMerchant(merchant) {
    try {
      const randomClient = generateRandomClient();

      // Prepare the data for the PATCH request
      const newData = {
        clientID: randomClient.clientId,
        clientSecret: randomClient.clientSecret,
      };

      const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/marchands/${merchant.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // Return the updated merchant data
        return {
          ...merchant, // Include existing merchant data
          clientID: newData.clientID,
          clientSecret: newData.clientSecret,
        };
      } else {
        throw new Error('Failed to activate merchant');
      }
    } catch (error) {
      throw new Error('An error occurred:', error);
    }
  }

  const submitEditForm = async () => {
      try {
        // Send a request to update the merchant's data
        const response = await fetch(
          `${import.meta.env.VITE_API_PAIEMENT}/marchands/${marchand.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editedMerchant.value),
          }
        );

        if (response.ok) {
          // Update the local marchand object with the new values
          marchand.value = { ...editedMerchant.value };
          showEditForm.value = false; // Hide the edit form
        } else {
          console.error('Failed to update merchant data');
          // Handle the error or show a message to the user
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error or show a message to the user
      }
    };

  const handleActivateMerchant = async () => {
    try {
      if (marchand.value) {
        const updatedMerchant = await activateMerchant(marchand.value);

        // Update the local marchand object with the new values
        marchand.value.clientID = updatedMerchant.clientID;
        marchand.value.clientSecret = updatedMerchant.clientSecret;
      }
    } catch (error) {
      console.error('An error occurred during activation:', error);
      // Handle the error or show a message to the user
    }
  };

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString
  }

  function generateRandomClient() {
    const clientIdLength = 16; // Longueur du client ID souhaitéej
    const clientSecretLength = 32; // Longueur du client secret souhaitée

    const clientId = generateRandomString(clientIdLength);
    const clientSecret = generateRandomString(clientSecretLength);

    return {
      clientId: clientId,
      clientSecret: clientSecret
    };
  }

  onMounted(() => {  
    fetchTransactionsByIdmarchand();
  });
    
    
    // Fetch merchants from the API
    async function fetchTransactionsByIdmarchand() {

      try {
        const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/transactions/marchand/${marchand.value.id}`, {
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
    
    </script>
    
    <style scoped>
    /* Vos styles CSS ici */
    
    .page {
      color: #333; /* Changement de couleur pour une meilleure visibilité du texte */
      background-color: #f5f5f5; /* Couleur de fond claire pour la page */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start; /* Alignement du contenu en haut */
      padding: 20px; /* Ajout d'un rembourrage autour des éléments */
      min-height: 100vh; /* Hauteur minimale pour remplir le viewport */
    }
    
    .title, h1 {
      margin-bottom: 20px;
      font-size: 28px;
      font-weight: bold;
    }
    
    .merchant-info, .transaction-item {
      background-color: white; /* Fond blanc pour les informations du marchand et les transactions */
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%; /* Largeur maximale */
      max-width: 800px; /* Largeur maximale pour les grands écrans */
      margin-bottom: 20px; /* Espace entre les éléments */
    }
    
    .showEditForm {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* aligne les éléments du formulaire à gauche */
  width: 100%;
  max-width: 800px; /* ou toute autre largeur spécifique de votre choix */
  background-color: #ffffff; /* couleur de fond blanche pour le formulaire */
  border: 1px solid #dedede; /* ajoute une bordure autour du formulaire pour le démarquer */
  padding: 20px; /* espace à l'intérieur du formulaire */
  margin-top: 20px; /* espace au-dessus du formulaire */
  border-radius: 5px; /* coins légèrement arrondis */
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); /* ombre légère pour le démarquage */
}

/* Styles pour les champs de saisie dans le formulaire */
.showEditForm input {
  width: 100%; /* rend les champs de saisie pleine largeur */
  padding: 10px; /* rend les champs de saisie plus grands et plus faciles à lire */
  margin-bottom: 10px; /* espace entre les champs de saisie */
  border-radius: 5px; /* coins légèrement arrondis pour les champs de saisie */
  border: 1px solid #dedede; /* bordure pour les champs de saisie */
  color: black;
}

.showEditForm button {
  /* Styles pour votre bouton, si vous souhaitez également les modifier */
}

    
    .page-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    
    .transaction-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .transaction-item {
      margin-top: 10px;
    }
    
    .transaction-info p {
      margin: 5px 0;
      font-weight: bold;
    }
    
    button {
      background-color: #007bff; /* Couleur du bouton */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    button:hover {
      background-color: #0056b3; /* Couleur du bouton au survol */
    }
    
    </style>
    
    
    