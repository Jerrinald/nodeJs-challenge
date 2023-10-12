<script setup>
import IconUser from './icons/IconUser.vue'
</script>
<template>
    <button class="flex aic gap-10">
        <IconUser />
        <span>Connexion</span>
    </button>
</template>
<style scoped>
    button{
        padding: 5px 15px;
        border: none;
        background-color: #1d817e;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s ease-in-out;
    }
    button:hover{
        background-color: #32CEC9;
    }
</style>