<script setup lang="ts">
defineProps<{
    del: () => void
}>()
</script>

<template>
    <img @click="del" src="@/assets/cross.svg">
</template>