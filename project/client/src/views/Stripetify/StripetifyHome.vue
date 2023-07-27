<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import secure from '../../assets/secure.jpg'
import freelance from '../../assets/freelance.png'
import website from '../../assets/website.png'
import Register from "../auth/Register.vue"
import man from "../../assets/man.png"

</script>

<template>
    <div class="stripetify">
      <Header />
      <div class="suscribe-block flex fdc jcsb aic gap-50">
        <div class="container flex aic jcsb gap-50">
          <img class="man-secure" :src="man" alt="" srcset="">
          <h1>Gérez votre site marchand en toute simplicité, des paiements en ligne sécurisés et fluides.</h1>
        </div>
        <Register />
      </div>
        <div class="stripetify-container">
            <div class="flex jcsb gap-20">
                <img :src="freelance" alt="Paiements sécurisés">
                <div class="container">
                    <h2>Solutions e-commerce pour le succès</h2>
                    <p>Découvrez notre plateforme intégrée et performante qui augmente les ventes et facilite la gestion des
                        commandes en ligne</p>
                </div>
            </div>
        </div>
        <div class="stripetify-container paiement">
            <div class="flex jcsb gap-20">
                <div class="container">
                    <h2>Paiements sécurisés pour votre tranquillité</h2>
                    <p>Donnez la possibilité à vos clients d'effectuez leurs achats sur votre site en toute confiance grâce à notre système de paiement certifié et sécurisé,
                        garantissant la protection de leurs données.</p>
                </div>
                <img :src="secure" alt="Paiements sécurisés">
            </div>
        </div>
        <div class="stripetify-container">
            <div class="flex jcsb gap-20">
                <img :src="website" alt="Paiements sécurisés">
                <div class="container">
                    <h2>Optimisation web pour des paiements fluides</h2>
                    <p>Améliorez la vitesse et l'efficacité de vos transactions en ligne avec notre expertise en optimisation, pour une expérience de paiement inégalée</p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped>

h2{
    color: #FFFFFF;
    margin-bottom: 15px;
}
.stripetify-container {
    background-color: #222733;
    /* padding: 50px 0; */
}

.stripetify .paiement {
    background-color: #000000;
}
img{
    width: 40%;
}

.stripetify-container .container{
    max-width: 400px;
}

h1{
    color: #FFF;
    font-size: 40px;
    line-height: 50px;
}

.suscribe-block{
    padding: 50px 0;
    background-color: #000000;
}

.man-secure{
    width: 250px;
    height: 250px;
}
</style>