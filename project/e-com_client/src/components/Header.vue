<script setup>
import Login from "../views/auth/Login.vue"
import logo from "../assets/logo.png"
import IconPanel from "./icons/IconPanel.vue"
import IconUser from "./icons/IconUser.vue"
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref, onMounted, onBeforeUnmount } from 'vue';


const store = useStore();


// Utilisez une propriété calculée pour récupérer l'état de l'utilisateur depuis le store Vuex
const user = computed(() => store.state.user);


// Use the cartItemsLength getter from the Vuex store
const cartItemsLength = computed(() => store.getters.cartItemsLength);


// Use the cartItemsLength getter from the Vuex store

</script>

<template>
    <div class="header">
        <nav class="navbar container flex aic jcsb">
            <a href="/" class="logo-content flex aic gap-10"><img :src="logo" alt="Description de l'image"></a>
            <div class="flex gap-20">
                <a v-if="user && user.role === 'admin'" href="/dashboard">Dashboard</a>
                <a href="/panier" class="panel">
                    <div>{{ cartItemsLength !== undefined ? cartItemsLength : 0 }}</div>
                    <IconPanel />
                </a>
                <a href="/profile" v-if="user">
                    Profil
                </a>
                <a href="/logout" v-if="user">
                    Déconnexion
                </a>
                <div v-else class="flex aic gap-20">
                    <a href="/register">S'inscrire</a>
                    <a href="/login"  class="flex aic gap-5">
                        <IconUser /><span>Connexion</span>
                    </a>
                </div>
                <!-- Si l'utilisateur n'est pas connecté, afficher uniquement le lien de connexion -->
            </div>
            <!-- <Login /> -->
        </nav>
    </div>
</template>

<style scoped>
.header {
    background-color: #FFFFFF;
    height: auto;
    top: 0;
    position: sticky;
    z-index: 99;
}

.navbar {
    border-bottom: 0.1px solid rgba(0, 0, 0, 0.5);
    background-color: #FFFFFF;
}

.header nav div a {
    padding: 10px 0;
}

.header nav div a:hover {
    color: #db8113;
}

.logo-content img {
    height: 65px;
    width: 300px;
}

.panel {
    position: relative;
}

.panel div {
    position: absolute;
    top: 0;
    right: -10px;
    color: #FFFFFF;
    background-color: #f5941e;
    border-radius: 50px;
    height: 20px;
    width: 20px;
    text-align: center;
}</style>