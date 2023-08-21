<script setup>
import logo from "../assets/logo1.png"
import { ref } from 'vue';

const emit = defineEmits();
const selectedMenu = ref('Marchands'); // Valeur par défaut

function handleMenuClick(menu) {
  selectedMenu.value = menu;
  emit('menuClick', menu); // Émettre un événement vers le parent
}

</script>

<template>
    <div class="aside-container">
        <a href="#" class="logo-content flex aic gap-10"><img :src="logo" alt="Description de l'image"><span>Stripetify</span></a>
        <div class="flex aside-link-container fdc gap-20">
          <a href="#" @click="handleMenuClick('Accueil')">Accueil</a>
          <a href="#" @click="handleMenuClick('Transactions')">Transactions</a>
          <a href="#" @click="handleMenuClick('Opérations')">Opérations</a>
          <a href="#" @click="handleMenuClick('Balance')">Balance</a>
          <a href="#" @click="handleMenuClick('Marchands')">Marchands</a>
        </div>
    </div>
</template>

<style scoped>
    .aside-container{
        width: 300px;
        padding: 20px;
        color: #000000;
    }

    .aside-link-container{
        margin-top: 20px;
    }

    .aside-link-container a{
        color: #000000;
        font-weight: bold;
    }

    .logo-content span{
        font-weight: bold;
        font-size: 1.3rem;
    }
.logo-content img{
    border-radius: 50px;
    height: 35px;
    width: 35px;
}
</style>