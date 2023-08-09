<script setup>
import IconUser from './icons/IconUser.vue'
</script>
<template>
    <button class="flex aic gap-10">
        <span>Deconnexion</span>
    </button>
</template>
<style scoped>
    button{
        padding: 5px 15px;
        border: none;
        background-color: #063836;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s ease-in-out;
    }
    button:hover{
        background-color: #499291;
    }
</style>