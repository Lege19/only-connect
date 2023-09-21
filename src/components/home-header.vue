<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<template>
    <div>
        <span>
            <RouterLink to="/host"><p>Host</p></RouterLink>
        </span>
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
    grid-template-columns: repeat(3, 1fr);
    column-gap: 6px;
    padding: 6px;
}
span {
    background-color: var(--ui-color);
    transition: background-color 0.2s;
    border-radius: 6px;
    height: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
}
span:hover {
    background-color: var(--ui-accent-color);
}
p {
    text-align: center;
}
</style>