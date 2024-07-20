<script setup lang="ts">
const emit = defineEmits([
    "click"
]);
function onclick(event: Event) {
    emit("click", event);
}
</script>

<template>
    <div class="item" @click="onclick($event)">
        <p class="text">
            <slot></slot>
            <div class="icon">
                <slot name="icon"></slot>
            </div>
        </p>
    </div>
</template>
