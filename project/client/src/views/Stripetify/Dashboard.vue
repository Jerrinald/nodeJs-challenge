<template>
    <div class="dashboard flex">
        <Aside />
        <div class="block-container flex fdc gap-20">
            <div class="flex jcsb">
                <input type="search" placeholder="Rechercher...">
                <div class="flex aic gap-10">
                    <a href="#">Déconnexion</a>
                </div>
            </div>
            <div v-if="store.state.user.role === 'admin'" class="marchant-container">
                <h2>Marchands</h2>
                    <Dashboard />
            </div>

            <div v-else class="marchant-container">
                <h2>Marchands</h2>
                    <Profile />
            </div>
            <div class="block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit fugiat placeat rerum
                sapiente amet, quaerat beatae modi illum officia nam quis? Ea alias, iste doloribus quas temporibus ratione
                quasi animi?</div>
        </div>
    </div>
</template>
<script setup>
import Aside from '../../components/Aside.vue'
import Dashboard from '../front/Dashboard.vue';
import Profile from '../front/Profile.vue';
import store from "../../store";
</script>
<style scoped>
.dashboard {
    background-color: #9094A2;
}

.block-container {
    padding: 20px;
}

input {
    width: 300px;
}

.block-container .block {
    background-color: #FFFFFF;
    border-radius: 5px;
    height: 350px;
    color: #9094A2;
    padding: 20px;
}
</style>