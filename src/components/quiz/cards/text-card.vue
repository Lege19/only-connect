<script setup lang="ts">
defineProps({
    data: String
});
</script>

<template>
    <div class="card">
        <p class="card-text">{{ data }}</p>
    </div>
</template>

<style scoped>
p {
    text-align: center;
    font-size: 2em;
}
</style>