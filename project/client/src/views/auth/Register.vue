<template>
  <slot name="activator" :openModal="toggleModal">
    <div @click="toggleModal">
      <BtnSuscribe />
    </div>
  </slot>
  <div v-show="openModal" class="modal">
    <div class="backdrop" @click.self="toggleModal"></div>
    <div class="modal-box">
      <div class="modal-content">
        <div class="modal-title">
          Inscription<slot name="close-icon" :closeModal="toggleModal"></slot>
        </div>
        <div v-if="!registeredSuccessfully" class="register">
          <form @submit.prevent="registerUser">
            <div class="flex gap-10 jcc">
              <div>
                <div>
                  <label for="firstname">Firstname:</label>
                </div>
                <input type="text" id="firstname" v-model="user.firstname" required>
              </div>
              <div>
                <div>

                  <label for="lastname">Lastname:</label>
                </div>
                <input type="text" id="lastname" v-model="user.lastname" required>
              </div>
            </div>
            <div class="flex gap-10 jcc">
              <div>
                <div>

                  <label for="email">Email:</label>
                </div>
                <input type="email" id="email" v-model="user.email" required>
              </div>
              <div>
                <div>
                  <label for="companyName">Company Name:</label>
                </div>
                <input type="text" id="companyName" v-model="user.companyName" required>
              </div>
            </div>
            <div class="flex gap-10 jcc">
              <div>
                <div>
                  <label for="KBIS">KBIS:</label>
                </div>
                <input type="text" id="KBIS" v-model="user.KBIS" required>
              </div>

            </div>

            <div class="flex gap-10 jcc">
              <div>
                <div>
                  <label for="numero">Numero1:</label>
                </div>
                <input type="text" id="numero" v-model="user.numero" required>
              </div>
              <div>
                <div>
                  <label for="url_confirmation">URL Confirmation:</label>
                </div>
                <input type="text" id="url_confirmation" v-model="user.url_confirmation" required>
              </div>
            </div>

            <div class="flex gap-10 jcc">
              <div>
                <div>
                  <label for="url_annulation">URL Annulation:</label>
                </div>
                <input type="text" id="url_annulation" v-model="user.url_annulation" required>
              </div>
              <div>
                <div>
                  <label for="devise">Devise:</label>
                </div>
                <input type="text" id="devise" v-model="user.devise" required>
              </div>
            </div>

            <div class="flex gap-10 jcc">
              <div>
                <div>
                  <label for="password">Password:</label>
                </div>
                <input type="password" id="password" v-model="user.password" required>
              </div>
            </div>

            <div class="flex jcc">
              <button class="btn-primary" type="submit">Valider</button>
            </div>
            <div v-if="registerErrors" class="error">
              <ul>
                <li v-for="error in registerErrors" :key="error.field">
                  {{ error.message }}
                </li>
              </ul>
            </div>
          </form>
        </div>
        <!-- Show a success message when registeredSuccessfully is true -->
        <div v-else class="success-message">
          Utilisateur enregistré avec succès!
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
import BtnSuscribe from "../../components/BtnSuscribe.vue"
import IconClose from "../../components/icons/IconClose.vue"
import router from "../../router";

const openModal = ref(false);

let registeredSuccessfully = ref(false);

function toggleModal() {
  openModal.value = !openModal.value;

  // Reset registeredSuccessfully when the modal is closed
  if (!openModal.value) {
    registeredSuccessfully.value = false;
  }
}

let user = reactive({
  username: '',
  email: '',
  password: ''
});

let registerErrors = ref(null);

async function registerUser() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_PAIEMENT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      const errorData = await response.json();
      registerErrors.value = errorData.errors;
    } else {
      // L'utilisateur est enregistré avec succès
      // Vous pouvez rediriger vers une autre page ici si nécessaire
      registeredSuccessfully.value = true;
      console.log('Utilisateur enregistré avec succès!');
      // Reset the user object to null
      user = [];
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error.message);
  }
}
</script>

<style scoped>
.register {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register form {
  display: flex;
  flex-direction: column;
}

.register form div {
  margin-bottom: 10px;
}

.register .error {
  color: red;
  margin-top: 10px;
}

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
  max-width: 550px;
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
</style>
