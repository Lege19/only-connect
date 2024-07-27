<script setup lang="ts">
import { bindKeys } from '@/utils';
const emit = defineEmits<{
    (e: "forward"): void,
    (e: "back"): void
}>();

bindKeys(() => emit("forward"), () => emit("back"));
</script>

<template>
    <div @click="emit('forward')">
        <h1><slot></slot></h1>
    </div>
</template>

<style scoped>
div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>