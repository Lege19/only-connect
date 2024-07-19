<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
    <div>
        <span>
            <RouterLink to="/play"><p>Play</p></RouterLink>
        </span>
        <span>
            <RouterLink to="/create"><p>Create</p></RouterLink>
        </span>
    </div>
</template>

<style scoped>
div {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    background-color: var(--ui-color);
}
span {
    background-color: var(--ui-color);
    transition: background-color 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}
span:hover {
    background-color: var(--ui-accent-color);
}
p {
    text-align: center;
    padding: 1em;
}
</style>