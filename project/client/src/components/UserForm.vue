<script setup>
const defaultValue = {
  lastname: '',
  firstname: '',
  email: '',
  password: ''
};
import { reactive, ref } from 'vue';
const { initialValues, errors } = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      lastname: '',
      firstname: '',
      email: '',
      password: ''
    })
  },
  errors: {
    type: Object,
    default: () => ({})
  }
});

console.log(errors);

//defineEmits(['submit']);
const emit = defineEmits({
  submit: (event) => {
    if(event.email === "") {
      throw new Error("Email is required");
    }
    if(event.password === "") {
      throw new Error("Password is required");
    }
  }
})

const formData = reactive({ ...initialValues });

function handleSubmit() {
  emit('submit', formData)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="lastname">Lastname</label>
    <input
      :value="formData.lastname"
      @input="formData.lastname = $event.target.value"
      type="text"
      id="lastname"
    />
    <p v-if="errors.lastname">{{ errors.lastname.join('\n') }}</p>
    <label for="firstname">Firstname</label>
    <input v-model.lazy="formData.firstname" type="text" id="firstname" />
    <p v-if="errors.firstname">{{ errors.firstname.join('\n') }}</p>
    <label for="email">Email</label>
    <input v-model.trim="formData.email" type="email" id="email" />
    <p v-if="errors.email">{{ errors.email.join('\n') }}</p>
    <label for="password">Password</label>
    <input v-model.number="formData.password" type="password" id="password" />
    <p v-if="errors.password">{{ errors.password.join('\n') }}</p>
    <button type="submit">Submit</button>
  </form>
  {{ formData }}
</template>
