<script setup>
import { reactive, onMounted, ref } from 'vue';
import UserItem from '../components/Users/UserItem.vue';
import UserForm from '../components/UserForm.vue';

const users = reactive([]);
const isLoading = ref(true);

onMounted(async () => {
  const response = await fetch(`http://localhost:3000/users`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
  if (response.ok) {
    users.push(...(await response.json()));
    isLoading.value = false;
  } else {
    alert('Error while fetching');
  }
});

async function deleteUser(user) {
  const response = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });
  if (response.status === 204) {
    users.splice(users.indexOf(user), 1);
  } else {
    alert('Error while deleting');
  }
}

async function updateUser(user) {
  const response = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(user)
  });
  if (response.ok) {
    const data = await response.json();
    const index = users.indexOf(user);
    users.splice(index, 1, data);
    userSelected.value = null;
  } else {
    alert('Error while updating');
  }
}
const userSelected = ref(null);
</script>

<template>
  <ul v-if="!isLoading">
    <UserItem v-if="users.length" v-for="user in users" :user="user" @delete="deleteUser" @select="userSelected = $event;"/>
    <li v-if="users.length === 0">No users</li>
    <UserForm v-if="userSelected" :initialValues="userSelected" @submit="updateUser"/>
  </ul>
  <h2 v-if="isLoading">Loading ...</h2>
</template>
