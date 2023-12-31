<template>
==
    <div class="modal">
      <div class="backdrop" ></div>
      <div class="modal-box">
        <div class="modal-title">
          Connexion <slot name="close-icon" :closeModal="toggleModal"></slot>
        </div>
        <div class="modal-content">
  
          <div class="login-form">
            <form @submit.prevent="loginUserSimple" class="flex fdc gap-25">
              <h2>Connectez vous en tant qu'utilisateur</h2>
              <div v-if="loginError" class="error-message">
                {{ loginError }}
              </div>
              <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="userSimple.email" required>
              </div>
              <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="userSimple.password" required>
              </div>
              <div class="flex jce">
                <button type="submit" class="btn btn-primary">Connexion</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import store from "../../store";
  import router from "../../router";
  import BtnConnect from "../../components/BtnConnect.vue"
  import IconClose from "../../components/icons/IconClose.vue"
  
  let userSimple = reactive({
    email: '',
    password: ''
  });

  const loginError = ref(''); // Reactive reference for login error message

  
  const openModal = ref(false);
  
  function toggleModal() {
    openModal.value = !openModal.value;
  }
  
  async function loginUserSimple() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSimple)
      });
  
      if (response.ok) {
        const data = await response.json();
        // Gérer la réponse de l'API en fonction de vos besoins
        console.log(data);
        const tokenExpiration = Date.now() + 3600 * 1000; // La durée doit correspondre à celle que vous avez définie côté serveur (ici 1 heure)
  
        // on rajoute le token dans le localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpiration', tokenExpiration);
  
        // on redirige vers la page d'accueil
        store.dispatch('login', data.user);
  
        router.push('/dashboard');
      } 
      else if (response.status === 401) {
        loginError.value = 'Email ou mot de passe incorrect.'; // Set error message for incorrect credentials
      } else {
        loginError.value = 'Une erreur s’est produite. Veuillez réessayer.'; // Set error message for other errors
      }
    } catch (error) {
      console.error('An error occurred:', error);
      loginError.value = 'Problème de connexion au serveur. Veuillez vérifier votre connexion.';

    }
  }
  </script>
  
  <style scoped>
  /* Vos styles CSS ici */
  .modal {
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1002;
    width: 100%;
    max-width: 350px;
    background-color: #000000;
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(50, 206, 201, 0.5);
    padding: 1rem;
  }
  
  .modal-title {
    text-align: center;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .login-form {
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  
  .form-selection {
    display: flex;
    gap: 10px;
  }
  
  .form-selection-btn {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    background-color: #f2f2f2;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .form-selection-btn.active {
    background-color: #50cea3;
    color: #fff;
  }
  
  .form-selection-btn.marchand {
    border-radius: 5px 0 0 5px;
  }
  
  .form-selection-btn.simple-user {
    border-radius: 0 5px 5px 0;
  }
  </style>
  