<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
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
      <div>
        <button type="submit">Register</button>
      </div>
      <div v-if="registerErrors" class="error">
        <ul>
          <li v-for="error in registerErrors" :key="error.field">
            {{ error.message }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

let user = reactive({
  username: '',
  email: '',
  password: ''
});

let registerErrors = ref(null);

async function registerUser() {
  try {
    const response = await fetch('http://localhost:3000/register', {
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
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register form {
  display: flex;
  flex-direction: column;
}

.register form div {
  margin-bottom: 10px;
}

.register label {
  font-weight: bold;
}

.register input {
  padding: 5px;
}

.register button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register .error {
  color: red;
  margin-top: 10px;
}
</style>
