<script setup>
import montre from '../assets/images/montre.jpg'
</script>

<template>
    <a href="#" class="product-item">
        <img :src="montre" alt="montre">
        <p class="product-name">Maserati Montre pour hommes Competizione</p>
        <p>455.00€</p>
        <button class="btn-primary">Ajouter au panier</button>
    </a>
</template>

<style scoped>
.product-item {
    /* border: 1px solid rgba(0, 0, 0, 0.5); */
    border-radius: 5px;
    padding: 10px;
    width: 265px;
    color: #000000;
    border: 1px solid transparent;
}

.product-item:hover {
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #F6931C;
}
</style>