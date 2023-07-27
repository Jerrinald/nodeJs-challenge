<template>
    <div class="dashboard flex">
        <Aside />
        <div class="block-container flex fdc gap-20">
            <div class="flex jcsb">
                <input type="search" placeholder="Rechercher...">
                <div class="flex aic gap-10">
                    <div>user</div>
                    <div>lorem</div>
                    <div>lorem</div>
                    <div>lorem</div>
                </div>
            </div>
            <div class="flex aic gap-20">
                <div class="block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit fugiat placeat rerum sapiente amet, quaerat beatae modi illum officia nam quis? Ea alias, iste doloribus quas temporibus ratione quasi animi?</div>
                <div class="block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit fugiat placeat rerum sapiente amet, quaerat beatae modi illum officia nam quis? Ea alias, iste doloribus quas temporibus ratione quasi animi?</div>
            </div>
            <div class="block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit fugiat placeat rerum sapiente amet, quaerat beatae modi illum officia nam quis? Ea alias, iste doloribus quas temporibus ratione quasi animi?</div>
        </div>
    </div>
</template>
<script setup>
import Aside from '../../components/Aside.vue'
</script>
<style scoped>
    .dashboard{
        background-color: #9094A2;
        height: 100%;
    }

    .block-container{
        padding: 20px;
    }

    input{
        width: 300px;
    }

    .block-container .block{
        background-color: #FFFFFF;
        border-radius: 5px;
        height: 350px;
        color: #9094A2;
        padding: 20px;
    }
</style>