<script setup>
import logo from "../assets/logo1.png"

</script>

<template>
    <div class="aside-container">
        <a href="#" class="logo-content flex aic gap-10"><img :src="logo" alt="Description de l'image"><span>Stripetify</span></a>
        <div class="flex aside-link-container fdc gap-20">
            <a href="#">Accueil</a>
            <a href="#">Paiements</a>
            <a href="#">Balance</a>
            <a href="#">Customers</a>
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