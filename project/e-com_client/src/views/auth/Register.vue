<template>
  <div>
    <Header />
    <main class="container register flex aic jcsa">
      <div>
        <img :src="minilogo" alt="" srcset="">
      </div>
      <form @submit.prevent="registerUser" class="flex fdc gap-20">
        <h2>Register</h2>
        <div>
          <label for="firstname">Firstname:</label>
          <input type="text" id="firstname" v-model="user.firstname" required>
        </div>
        <div>
          <label for="lastname">Lastname:</label>
          <input type="text" id="lastname" v-model="user.lastname" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <div class="flex jce">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
        <div v-if="registerErrors" class="error">
          <ul>
            <li v-for="error in registerErrors" :key="error.field">
              {{ error.message }}
            </li>
          </ul>
        </div>
      </form>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import minilogo from '../../assets/images/minilogo.png'

let user = reactive({
  username: '',
  email: '',
  password: ''
});

let registerErrors = ref(null);

async function registerUser() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ECOM}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      const errorData = await response.json();
      registerErrors.value = errorData.errors;
    } else {
      // L'utilisateur est enregistré avec succès
      // Vous pouvez rediriger vers une autre page ici si nécessaire
      console.log('Utilisateur enregistré avec succès!');

    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error.message);
  }
}
</script>

<style scoped>
main{
  height: calc(100vh - 96px);
}
.register .error {
  color: red;
  margin-top: 10px;
}
</style>
