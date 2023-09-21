<script setup lang="ts">

</script>

<template>
    <div class="flex">
        <div class="item">
            <h1><slot></slot></h1>
        </div>
    </div>
</template>

<style scoped>
.flex {
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: center;
    width: 100%;
    left: 0;
}
.item {
    background-color: var(--card-color);
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    width: 80%;
}
h1 {
    margin: 1em;
}
</style>