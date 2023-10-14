<script setup>
import { ref, onMounted, toRefs, getCurrentInstance  } from 'vue';
import Button from './Button.vue';
import IconClose from './icons/IconClose.vue'
import cart from '../assets/images/carte.jpg'

const openModal = ref(false);

const cardNumber = ref("");
const formattedCardNumber = ref("");

const expiryDate = ref("");
const formattedExpiryDate = ref("");

const cvv = ref("");

const props = defineProps({
  total: {
    type: Number
  }
})

const formData = ref({
  totalPrice: props.total,
  name: "",
  cardNumber: "",
  expiryDate: "",
  cvv: ""
});


const formatCardNumber = () => {
  let numbers = formData.value.cardNumber.replace(/\D/g, "").substring(0, 16);
  const chunks = [];
  for (let i = 0; i < numbers.length; i += 4) {
    chunks.push(numbers.substring(i, i + 4));
  }
  formData.value.cardNumber = chunks.join(" ");
};

const formatExpiryDate = () => {
  let numbers = formData.value.expiryDate.replace(/\D/g, "").substring(0, 4);
  formData.value.expiryDate = numbers.length > 2 ? numbers.substring(0, 2) + '/' + numbers.substring(2) : numbers;
};

const formatCVV = () => {
  formData.value.cvv = formData.value.cvv.replace(/\D/g, "").substring(0, 3);
};

const instance = getCurrentInstance();
const emit = instance.emit;

const submitForm = () => {

  emit('formSubmitted', formData); // Emit the event with the form data
};

const closeModal = () => {
  openModal.value = false;
}


</script>
<template>
 
  <div class="modal">
    <div class="backdrop" @click.self="openModal = false"></div>
    <div class="modal-box">
      <div>
        <div class="modal-title">
          <slot name="title">Paiement par carte bancaire</slot>
        </div>
        <div class="modal-content text-center"><img :src="cart" alt="" srcset=""></div>
        <div class="text-center">Total à payer: <strong>{{ props.total }} €</strong></div>
      </div>
      <div class="modal-actions">
        <slot name="actions" :closeModal="() => openModal = false">
          <div class="close-modal" @click="openModal = false">
            <IconClose />
          </div>
        </slot>
      </div>
      <form action="" class="flex fdc aic gap-10">
        <div>
          <label for="">Nom et prénom du propriétaire de la carte</label>
          <input v-model="formData.name" type="text" placeholder="Nom et Prénom">
        </div>
        <div>
          <label for="">Date d'expiration</label>
          <input v-model="formData.expiryDate" @input="formatExpiryDate" type="text" maxlength="5" placeholder="MM/AA" />
        </div>
        <div>
          <label for="">Numéro de la carte</label>
          <input v-model="formData.cardNumber" @input="formatCardNumber" type="text" maxlength="19"
            placeholder="0000 0000 0000 0000" />
        </div>
        <div>
          <div class="cryptogramme">
            <label for="">Cryptograme</label>
            <input v-model="formData.cvv" @input="formatCVV" type="text" maxlength="4" placeholder="CVV" />
          </div>
        </div>
      </form>
      <div class="flex jce btn-container">
        <button @click="submitForm" class="btn btn-primary">Valider</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  color: #000000;
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
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-box {
  position: absolute;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;

  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-title {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.btn-container {
  padding: 1rem;
}

.modal-content {
  padding: 1rem;
  border-top: 1px solid #ccc;
}

form>div {
  width: 500px;
}

form input {
  width: 100%;
}

form .cryptogramme {
  width: 100px;
}

strong {
  font-weight: bold;
}

.modal-actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}

img {
  width: 20%;
}
</style>