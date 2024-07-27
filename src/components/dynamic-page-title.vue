<script setup lang="ts">
const props = defineProps<{
    title: string
}>();

document.title = props.title;
</script>

<template></template>