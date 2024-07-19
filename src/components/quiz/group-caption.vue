<script setup lang="ts">

</script>

<template>
    <div class="item">
        <h1><slot></slot></h1>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/base';
.item {
    background-color: base.$card-color;
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    width: 80%;
    position: fixed;
    bottom: 0;
}
h1 {
    margin: 1em;
}
</style>