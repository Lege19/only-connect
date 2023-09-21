<script setup lang="ts">

</script>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-flow: row wrap;
    width: 80%;
    gap: 1em;
    justify-content: center;
}
</style>