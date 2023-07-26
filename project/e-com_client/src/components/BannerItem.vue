<script setup>
import adidas from '../assets/images/adidas.avif'
</script>

<template>
    <a href="#" class="banner-item">
        <img :src="adidas" alt="" srcset="">
        <p>Chaussure adidas Grand Court x LEGO</p>
        <strong>53.99€</strong>
        <p><s>83.99€</s></p>
        <div class="last-article">9 articles restants</div>
        <button class="btn-primary">Ajouter au panier</button>
    </a>
</template>

<style scoped>

.banner-item{
    color: #000000;
}

.banner-item:hover{
    color: #F6931C;
}
s {
    color: rgb(156, 164, 172);
}

.last-article{
    color: red;
}
</style>