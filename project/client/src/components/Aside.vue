<script setup>
import logo from "../assets/logo1.png"
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits();
const selectedMenu = ref('Marchands'); // Valeur par défaut

function handleMenuClick(menu) {
  selectedMenu.value = menu;
  emit('menuClick', menu); // Émettre un événement vers le parent
}

</script>


<style scoped>
    .aside-container{
        width: 300px;
        padding: 20px;
        color: #000000;
    }

    .aside-link-container{
        margin-top: 20px;
    }

    .aside-link-container a{
        color: #000000;
        font-weight: bold;
    }

    .logo-content span{
        font-weight: bold;
        font-size: 1.3rem;
    }
.logo-content img{
    border-radius: 50px;
    height: 35px;
    width: 35px;
}
</style>