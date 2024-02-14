<script setup lang="ts">
defineProps({
    data: String
});
</script>

<template>
    <div class="card" style="background-color:transparent">
        <img :src="data">
    </div>
</template>
<style scoped>
img {
    border-radius: 2vh;
    width: 100%;
    height: auto;
}
</style>