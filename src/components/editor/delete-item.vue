<script setup lang="ts">
defineProps<{
    del: () => void
}>()
</script>

<template>
    <img @click="del" src="@/assets/images/cross.svg">
</template>