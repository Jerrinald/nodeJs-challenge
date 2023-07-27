<script setup>
import ProductItem from './ProductItem.vue'
</script>

<template>
    <section class="featured-products">
        <!-- Produits vedettes ou en promotion -->
        <h2>Tous nos articles</h2>
        <div class="product-grid flex fww gap-20 jcsb">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </div>

    </section>
</template>

<style scoped>

h2{
    margin-bottom: 20px;
}
</style>