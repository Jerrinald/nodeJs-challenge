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
        Connectez-vous<slot name="close-icon" :closeModal="toggleModal"></slot>
      </div>
      <div class="modal-content">
        <div class="login-form">
          <form @submit.prevent="loginUser" class="flex fdc gap-15">
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
import router from "../../router";
import BtnConnect from "../../components/BtnConnect.vue"
import IconClose from "../../components/icons/IconClose.vue"

let user = reactive({
  email: '',
  password: ''
});

const openModal = ref(false);

function toggleModal() {
  openModal.value = !openModal.value;
}

async function loginUser() {
  try {
    const response = await fetch('http://localhost:3000/login', {
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
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
</script>

<style scoped>
/* Vos styles CSS ici */
.modal {
  color: #FFFFFF;
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
}</style>
