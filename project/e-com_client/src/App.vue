<script setup>
import Button from './components/Button.vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import { ref, reactive } from 'vue';
import UserForm from './components/UserForm.vue';
import LoginForm from './components/LoginForm.vue';
import UserList from './views/UserList.vue';
import jwtDecode from 'jwt-decode';
import Modal from './components/Modal.vue';
import ThemeProvider from './contexts/ThemeProvider.vue';
import AuthProvider from './contexts/AuthProvider.vue';
import UserProfile from './views/UserProfile.vue';
import PostList from './views/PostList.vue';

// Vue2
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// export default {
//   components: {
//     HelloWorld,
//     TheWelcome
//   }
// }
function handleClick1() {
  alert('You clicked me 1!');
}
function handleClick2() {
  isYellow.value = !isYellow.value;
}
function handleClick3() {
  theme.main.backgroundColor = theme.main.backgroundColor === 'red' ? 'cyan' : 'red';
  theme.main.color = theme.main.color === 'white' ? 'black' : 'white';
}
const arrayButtons = [
  {
    title: 'Click Me 1',
    variant: 'default',
    onClick: handleClick1
  },
  {
    title: 'Click Me 2',
    variant: 'square',
    onClick: handleClick2
  },
  {
    title: 'Click Me 3',
    variant: 'round',
    onClick: handleClick3,
    disabled: true
  },
  {
    title: 'Click Me 4',
    variant: 'default'
  },
  {
    title: 'Click Me 5',
    variant: 'coucou'
  }
];
const objButtons = {
  button1: {
    title: 'Click Me 1',
    variant: 'default',
    onClick: handleClick1,
    disabled: false
  },
  button2: {
    title: 'ToggleModal',
    variant: 'square',
    onClick: () => (openModal.value = !openModal.value),
    disabled: false
  },
  button3: {
    title: 'Click Me 3',
    variant: 'round',
    onClick: handleClick3,
    disabled: true
  }
};

const showWelcome = true;
const addWelcome = true;
const isYellow = ref(false);

let registerErrors = ref({});
async function registerUser(_user) {
  const response = await fetch(`http://localhost:3000/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(_user)
  });
  if (response.status === 422) {
    registerErrors.value = await response.json();
    return;
  } else if (response.ok) {
    return Promise.resolve(await response.json());
  }
  throw new Error('Fetch failed');
}
</script>

<template>
<!--  <ThemeProvider #default="{ theme }">-->
<!--    <AuthProvider #default="{ user, login }">-->
<!--      <header :style="{ backgroundColor: isYellow ? 'yellow' : 'inherit' }">-->
<!--        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--        <div class="wrapper">-->
<!--          <HelloWorld msg="You did it!" v-if="addWelcome" />-->
<!--          <HelloWorld msg="You did it 2!" v-show="showWelcome" />-->
<!--          <button @click="isYellow = !isYellow">toggle yellow</button>-->
<!--          <Button title="Click Me 2" variant="square" v-bind:onClick="handleClick2" />-->
<!--          <Button title="Click Me 3" variant="round" :onClick="handleClick3" />-->
<!--          <Button-->
<!--            v-for="(button, index) in arrayButtons"-->
<!--            :key="index"-->
<!--            :title="button.title"-->
<!--            :variant="button.variant"-->
<!--            :onClick="button.onClick"-->
<!--          />-->
<!--          <template v-for="(button, key, index) in objButtons" :key="key">-->
<!--            <Button-->
<!--              :title="button.title + ' ' + key + ' ' + index"-->
<!--              :variant="button.variant"-->
<!--              :onClick="button.onClick"-->
<!--              v-if="!button.disabled"-->
<!--            />-->
<!--          </template>-->
<!--        </div>-->
<!--        <Modal>-->
<!--          <template #activator="{ openModal }">-->
<!--            <button v-on:click="openModal">Open Modal from App</button>-->
<!--          </template>-->
<!--          <template #actions="{ closeModal }">-->
<!--            <button @click="closeModal">Close from App</button>-->
<!--          </template>-->
<!--          <template v-slot:title>-->
<!--            <h1>Coucou from App</h1>-->
<!--          </template>-->
<!--          <h1>Body from App</h1>-->
<!--        </Modal>-->
<!--      </header>-->

<!--      <main :style="theme.main">-->
<!--        <TheWelcome />-->
<!--        <template v-if="user == null">-->
<!--          <h2>Login Form</h2>-->
<!--          <LoginForm :onSubmit="login" />-->
<!--          <h2>Register Form</h2>-->
<!--          <UserForm @submit="registerUser" :errors="registerErrors" />-->
<!--        </template>-->
<!--        <template v-if="user">-->
<!--          <UserProfile />-->
<!--          <h2>User List</h2>-->
<!--          <UserList />-->
<!--        </template>-->
<!--        <h2>Post List</h2>-->
<!--        <PostList />-->
<!--      </main>-->
<!--    </AuthProvider>-->
<!--  </ThemeProvider>-->
  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
