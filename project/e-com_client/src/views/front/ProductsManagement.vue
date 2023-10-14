<template>
  <section>
    <h2>Ajouter un produit</h2>
    <form @submit.prevent="addProduct">
      <div>
        <label for="productName">Nom du produit:</label>
        <input type="text" id="productName" v-model="newProduct.name" required>
      </div>
      <div>
        <label for="productPrice">Prix du produit (€):</label>
        <input type="float" id="productPrice" v-model="newProduct.price" required>
      </div>
      <div>
        <label for="productImage">Ajout de l'image:</label>
        <input type="file" id="productImage" name="uploaded_file" @change="onImageChange" accept="image/*" required>
      </div>
      <button type="submit">Ajouter</button>
    </form>

    <h2>Produits</h2>
    <p v-if="!products.length">Aucun produit</p>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image ? apiEcomUrl + '/' + product.image : adidas" :alt="product.name" style="max-height: 100px; max-width: 100px;">
        <h3>{{ product.name }}</h3>
        <p>Prix : {{ product.price }} €</p>
        <button @click="removeProduct(product.id)">Supprimer</button>
        <button @click="editProduct(product)">Modifier</button>
      </div>
    </div>
    

    <!-- Formulaire d'édition du produit -->
    <form v-if="editingProduct" @submit.prevent="updateProduct">
      <div>
        <label for="editProductName">Nom du produit:</label>
        <input type="text" id="editProductName" v-model="editingProduct.name" required>
      </div>
      <div>
        <label for="editProductPrice">Prix du produit (€):</label>
        <input type="float" id="editProductPrice" v-model="editingProduct.price" required>
      </div>
      <div>
        <label for="editProductImage">Image actuelle:</label>
        <img :src="apiEcomUrl + '/' + editingProduct.image" :alt="editingProduct.name" style="max-height: 100px;">
      </div>
      <div>
        <label for="newImage">Nouvelle image:</label>
        <input type="file" id="newImage" name="newImage" @change="onImageChange" accept="image/*">
      </div>
      <button type="submit">Mettre à jour</button>
      <button type="button" @click="cancelEditing">Annuler</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import adidas from '../../assets/images/adidas.avif'

const apiEcomUrl = ref(import.meta.env.VITE_API_ECOM);

const products = ref([]);
const cartItems = ref([]);
let newImageFile = ref(null);
let newProduct = reactive({
  name: '',
  price: 0.0,
  image: null,
});
const fallbackProducts = [
  // Vos produits de test
];



const editingProduct = ref(null);

const cartChannel = new BroadcastChannel('cartChannel');

cartChannel.onmessage = (event) => {
  if (event.data) {
    cartItems.value = event.data;
  }
};


  async function fetchProducts() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers, like authorization if required
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (response.ok) {
        products.value = await response.json(); // Update products as an array
        
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
    

  async function addProduct() {

    let newProd = {
      name: newProduct.name,
      price: newProduct.price,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // get token from localstorage
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
        body: JSON.stringify(newProd)
      });

      if (response.ok) {
        const data = await response.json();
        // Gérer la réponse de l'API en fonction de vos besoins
        console.log(data);
        newProduct.value = { name: '', price: '' };
        //fetchProducts()
        updateImageProduct(data.id, newProduct.image)
      } else {
    
        console.error('product failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  // j'en fait un post sur l'api /products

  async function updateImageProduct(productId, image) {
    const formData = new FormData();
    formData.append('uploaded_file', image);

    // Check the FormData content before sending the request
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
      try {
        const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products/${productId}`, {
          method: 'PATCH',
          headers: {
            // get token from localstorage
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newProduct.image = null
          console.log(data);
          fetchProducts()
        } else {
          console.error('Failed to update product');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
  }
  
  // si ok, je vide le formulaire

  async function removeProduct(productId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // get token from localstorage
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Remove the product from the products array on the client-side
        products.value = products.value.filter((product) => product.id !== productId);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }



  function editProduct(product) {
    editingProduct.value = { ...product };
  }

function cancelEditing() {
  editingProduct.value = null;
}

async function updateProduct() {
  const index = products.value.findIndex((product) => product.id === editingProduct.value.id);
    let updatedProduct = {};
    if (index !== -1) {
      updatedProduct = {
        id: editingProduct.value.id,
        name: editingProduct.value.name,
        price: parseFloat(editingProduct.value.price),
      };
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_ECOM}/products/${editingProduct.value.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // get token from localstorage
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
      if (newProduct.image !== null) {
        updateImageProduct(editingProduct.value.id, newProduct.image)
        products.value[index] = updatedProduct;
      }else{
        fetchProducts()
      }
      editingProduct.value = null;
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
}

function onImageChange(event) {
  const file = event.target.files[0];
  newProduct.image = file;
}

function onNewImageChange(event) {
  // Handle the new image change event
  const file = event.target.files[0];
  if (file) {
    newImageFile.value = file;
  }
}

// ... Le reste du code existant ...

onMounted(() => {
    fetchProducts();
  });

</script>

<style scoped>
/* Vos styles CSS ici */
</style>
