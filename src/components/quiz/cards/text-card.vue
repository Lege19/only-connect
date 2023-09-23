<script setup lang="ts">
const props = defineProps({
    data: String
});
</script>

<template>
    <div class="card">
        <p class="card-text">{{ props.data }}</p>
    </div>
</template>

<style scoped>
p {
    text-align: center;
    font-size: 1.5em;
}
</style>