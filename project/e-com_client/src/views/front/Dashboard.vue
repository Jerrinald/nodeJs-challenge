<template>
    <div>
        <Header />
        <main class="container">

            <h1>Espace personnel</h1>
            <div>
                <ul>
                    <li><a href="/products_management">Product Management </a></li>
                    <li><a href="/Commandes_management">Commandes </a></li>
                    <li><a href="/products_management">historiques </a></li>
                </ul>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
</script>

<style scoped>
main {
    height: calc(100vh - 96px);
}
</style>