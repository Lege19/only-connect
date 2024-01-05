<script setup lang="ts">
import { ref, type Ref, onMounted } from "vue";
const model: Ref<string|undefined> = defineModel();
const textarea: Ref<HTMLTextAreaElement|undefined> = ref(undefined);
function resizeTextarea() {
    if (!textarea.value) return;
    textarea.value.style.height = "";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
}
onMounted(resizeTextarea);
</script>

<template>
    <div>
        <textarea rows="1" @input="resizeTextarea" ref="textarea" v-model="model"></textarea>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    background-color: var(--ui-color);
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
}
textarea {
    background-color: transparent;
    border: 2px none;
    outline: none;
    resize: none;
    color: white;
    font-size: 1em;
    font-family: arial;
    padding: 0;
    margin: 0;
}
</style>