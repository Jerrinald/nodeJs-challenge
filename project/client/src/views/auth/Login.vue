<template>
  <slot name="activator" :openModal="toggleModal">
    <div @click="toggleModal">
      <BtnConnect />
    </div>
  </slot>
  <div v-show="openModal" class="modal">
    <div class="backdrop" @click.self="toggleModal"></div>
    <div class="modal-box">
      <div class="modal-title">
        Connexion<slot name="close-icon" :closeModal="toggleModal"></slot>
      </div>
      <div class="modal-content">
        <div class="login-form">
          <div v-if="loginError" class="login-error-message">
            Login failed, please try again.
          </div>
          <div class="unauthorized-march" v-show="marchandUnauthorized">
            <p>Votre compte est en attente d'activation</p>
          </div>
          <form @submit.prevent="loginUser" class="flex fdc gap-15">
            <h2>Connectez vous en tant que marchand</h2>
            <div>
              <div>
                <label for="email">Email:</label>
              </div>
              <input type="email" id="email" v-model="user.email" required>
            </div>
            <div>
              <div>
                <label for="password">Password:</label>
              </div>
              <input type="password" id="password" v-model="user.password" required>
            </div>
            <div class="flex jce">
              <button class="btn-primary" type="submit">Connecter</button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-actions">
        <slot name="actions" :closeModal="toggleModal">
          <div class="close-modal" @click="toggleModal">
            <IconClose />
          </div>
        </slot>
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

const loginError = ref(false); // or ref('') for a message string


let user = reactive({
  email: '',
  password: ''
});

let userSimple = reactive({
  email: '',
  password: ''
});

const openModal = ref(false);

const marchandUnauthorized = ref(false);

function toggleModal() {
  openModal.value = !openModal.value;
}

async function loginUser() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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
      store.dispatch('login', data.marchand);

      router.push('/dashboard');
    } else {
      
      // Gérer la réponse de l'API en fonction de vos besoins
      console.log(response.status);
      console.error('Login failed');
      loginError.value = true; // or set to a custom error message string

      if (response.status == 401) {
        marchandUnauthorized.value = true;
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    loginError.value = true; // or set to a custom error message string

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

.unauthorized-march{
  position: absolute;
  top: -30px;
  background-color: red;
}

</style>
