<script setup>
import { ref, onMounted } from 'vue';
import Button from './Button.vue';
import IconClose from './icons/IconClose.vue'
import cart from '../assets/images/carte.jpg'

const openModal = ref(false);

const props = defineProps({
  totalPrice: {
    type: Number
  }
})

console.log(props.totalPrice)
</script>
<template>
  <slot name="activator" :openModal="() => openModal = true"><button @click="openModal = true"
      class="btn btn-primary">Valider mon panier</button></slot>
  <div v-show="openModal" class="modal">
    <div class="backdrop" @click.self="openModal = false"></div>
    <div class="modal-box">
      <div>
        <div class="modal-title">
          <slot name="title">Paiement par carte bancaire</slot>
        </div>
        <div class="modal-content text-center"><img :src="cart" alt="" srcset=""></div>
        <h3 class="text-center">Total à payer: <strong>{{ props.totalPrice }} €</strong></h3>
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
          <input type="text">
        </div>
        
        <div>
          <label for="">Numéro de la carte</label>
          <input type="text">
        </div>
        <div class="flex jcsb gap-20">
          <div>
            <label for="">Date d'expiration</label>
            <input type="text" placeholder="MM / AA">
          </div>
          <div>
            <div class="cryptogramme">
              <label for="">Cryptograme</label>
              <input type="text" placeholder="XXX">
            </div>
          </div>
        </div>
        <div class="flex jce btn-container">
          <button class="btn btn-primary">Valider</button>
        </div>
      </form>
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

form .cryptogramme{
  /* width: 100px; */
}

strong{
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