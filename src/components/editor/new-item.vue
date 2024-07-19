<script setup lang="ts">
defineProps<{
    func: () => void
}>();
</script>

<template>
    <div class="dashed-outline" @click="func">
        <img src="@/assets/images/add.svg">
    </div>
</template>

<style scoped>
.dashed-outline {
    border: 3px gray dashed;
    border-radius: 10px;
    height: 2em;
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>