<script setup>
import { inject } from 'vue';
import Button from '../components/Button.vue';
import { userKey, logoutKey } from '../contexts/AuthProviderKeys';

const user = inject(userKey);
const logout = inject(logoutKey);
</script>
<template>
    <h2>
        User Profile
    </h2>
    <p>
        <strong>First Name:</strong> {{ user.firstname }}
    </p>
    <p>
        <strong>Last Name:</strong> {{ user.lastname }}
    </p>
    <p>
        <strong>Email:</strong> {{ user.email }}
    </p>
    <Button :title="'Logout'" :variant="'danger'" :onClick="logout" />
</template>