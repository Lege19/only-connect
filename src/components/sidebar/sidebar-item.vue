<script setup lang="ts">
const emit = defineEmits([
    "click"
]);
function onclick(event: Event) {
    emit("click", event);
}
</script>

<template>
    <div class="menu-item" @click="onclick($event)">
        <p class="menu-item-text">
            <slot></slot>
            <div class="menu-icon">
                <slot name="icon"></slot>
            </div>
        </p>
    </div>
</template>

<style>
.menu-item {
    padding: 1em;
    transition: background-color 0.2s;
    background-color: var(--ui-color);
}
.menu-item:hover {
    background-color: var(--ui-accent-color);
}
.menu-item-text {
    margin: 0;
    text-align: left;
}
.menu-icon {
    height: 1em;
    transition: transform 0.2s;
    float: right;
}
.menu-icon:hover {
    transform: scale(1.2);
}
</style>