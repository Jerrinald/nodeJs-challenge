<script setup>
import BtnConnect from "./BtnConnect.vue"
import logo from "../assets/logo1.svg"
import man from "../assets/man.png"
import suscribeBtn from "./suscribeBtn.vue"
</script>

<template>
    <div class="header">
        <nav class="navbar container flex aic jcsb">
            <!-- <a href="#"><img :src="logo" alt="Description de l'image"> Stripetify</a> -->
            <a href="#">Stripetify</a>
            <div class="flex gap-50">
                <a href="#">Produits</a>
                <a href="#">Solutions</a>
                <a href="#">Tarifs</a>
            </div>
            <BtnConnect />
        </nav>
        <div class="container flex fdc jcsb aic gap-50">
            <div class="flex aic jcsb gap-50">
                <img class="man-secure" :src="man" alt="" srcset="">
                <h1>Gérez votre site marchand en toute simplicité, des paiements en ligne sécurisés et fluides.</h1>
            </div>
            <suscribeBtn />
        </div>
    </div>
</template>

<style scoped>
.header {
    background-color: #000000;
    height: auto;
}

.navbar {
    border-bottom: 0.1px solid rgba(255, 255, 255, 0.5);
}

.header nav div a {
    padding: 10px 0;
    border-bottom: 1px solid transparent;
}

.header nav div a:hover {
    color: #FFFFFF;
    border-bottom: 1px solid #FFF;
}

h1{
    color: #FFF;
    font-size: 40px;
    line-height: 50px;
}

.container.gap-50{
    padding: 50px 0;
}

.man-secure{
    width: 250px;
    height: 250px;
}
</style>