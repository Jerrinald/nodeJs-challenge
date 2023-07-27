<script setup>
import Login from "../views/auth/Login.vue"
import logo from "../assets/logo1.png"
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const store = useStore();

// Utilisez une propriété calculée pour récupérer l'état de l'utilisateur depuis le store Vuex
const user = computed(() => store.state.user);
</script>

<template>
    <div class="header">
        <nav class="navbar container flex aic jcsb">
            <a href="#" class="logo-content flex aic gap-10"><img :src="logo" alt="Description de l'image"><span>Stripetify</span></a>
            <!-- <a href="#">Stripetify</a> -->
            <div class="flex gap-50">
                <a href="#">Produits</a>
                <a href="#">Solutions</a>
                <a href="#">Tarifs</a>
                <a v-if="user && user.role === 'admin'" href="/dashboard">Dashboard</a>
            </div>
            <Login />
        </nav>
    </div>
</template>

<style scoped>
.header {
    background-color: #000000;
    height: auto;
    top: 0;
    position: sticky;
    z-index: 99;
}

.navbar {
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.5);
    background-color: #000000;
}

.header nav div a {
    padding: 10px 0;
    border-bottom: 1px solid transparent;
}

.header nav div a:hover {
    color: #FFFFFF;
    border-bottom: 1px solid #FFF;
}

.logo-content img{
    height: 25px;
    width: 20px;
}
</style>