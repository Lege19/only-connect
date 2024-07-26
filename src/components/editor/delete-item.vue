<script setup lang="ts">
defineEmits<{
    (e: "delete"): void
}>();
</script>

<template>
    <img @click="$emit('delete')" src="@/assets/images/cross.svg">
</template>