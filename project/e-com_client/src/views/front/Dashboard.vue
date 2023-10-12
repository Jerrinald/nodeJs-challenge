<template>
    <div>
        <Header />
        <main class="container">
            <h1>Dashboard</h1>
            <div>
                <ol class="flex fdc gap-20">
                    <li><a href="/products_management">Product Management </a></li>
                    <li><a href="/commandes-management">Commandes </a></li>
                    <li><a href="/products_management">historiques </a></li>
                    <li><a href="/credentials">Credentials </a></li>
                </ol>
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

h1{
    margin: 20px 0;
}

</style>