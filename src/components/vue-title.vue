<script setup lang="ts">
const props = defineProps({title: String})
document.title = props.title ?? "Only Connect";
</script>

<template></template>