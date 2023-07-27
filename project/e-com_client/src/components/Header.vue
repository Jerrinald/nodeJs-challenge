<script setup>
import Login from "../views/auth/Login.vue"
import logo from "../assets/logo.png"
import IconPanel from "./icons/IconPanel.vue"
import IconUser from "./icons/IconUser.vue"
</script>

<template>
    <div class="header">
        <nav class="navbar container flex aic jcsb">
            <a href="/" class="logo-content flex aic gap-10"><img :src="logo" alt="Description de l'image"></a>
            <div class="flex gap-20">
                <a href="/products">Produits</a>
                <a href="/dashboard">Mon espace</a>
                <a href="/panier" class="panel"><div>2</div><IconPanel /></a>
                <a href="/login" class="flex aic gap-5"><IconUser /><span>Connexion</span></a>
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

.logo-content img{
    height: 65px;
    width: 300px;
}

.panel{
    position: relative;
}

.panel div{
    position: absolute;
    top: 0;
    right: -10px;
    color: #FFFFFF;
    background-color: #f5941e;
    border-radius: 50px;
    height: 20px;
    width: 20px;
    text-align: center;
}
</style>