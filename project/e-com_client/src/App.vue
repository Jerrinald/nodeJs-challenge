<script setup>
import { ref, reactive } from 'vue';

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
