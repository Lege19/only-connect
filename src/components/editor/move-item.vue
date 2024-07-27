<script setup lang="ts">
defineEmits<{
    (e: "moveUp"): void,
    (e: "moveDown"): void
}>();
</script>

<template>
    <div class="move-item">
        <img src="@/assets/images/up.svg" @click="$emit('moveUp')">
        <img src="@/assets/images/up.svg" @click="$emit('moveDown')" style="transform: scaleY(-1)">
    </div>
</template>

<style scoped>
.move-item {
    display: flex;
    flex-direction: column;
}
</style>