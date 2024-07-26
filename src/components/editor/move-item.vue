<script setup lang="ts">
import { type Ref } from "vue";
const model: Ref<any[]|undefined> = defineModel();
const props = defineProps<{
    index: number
}>();
function moveUp() {
    if (!model.value) return;
    if (props.index === 0) return;
    [model.value[props.index], model.value[props.index - 1]] = [model.value[props.index - 1], model.value[props.index]];
}
function moveDown() {
    if (!model.value) return;
    if (props.index === model.value.length - 1) return;
    [model.value[props.index], model.value[props.index + 1]] = [model.value[props.index + 1], model.value[props.index]];
}
</script>

<template>
    <div>
        <img src="@/assets/images/up.svg" @click="moveUp">
        <img src="@/assets/images/up.svg" @click="moveDown" style="transform: scaleY(-1)">
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
}
</style>