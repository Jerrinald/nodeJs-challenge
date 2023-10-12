<script setup>
defineProps({
    user: {
        type: Object,
        required: true
    },
})

defineEmits(['delete', "select"])
</script>

<template>
    <li @click.self="$emit('select', user)">{{ user.id }} {{ user.email }} <span @click.self="$emit('delete', user)">X</span></li>
</template>