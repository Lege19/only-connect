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
    <textarea rows="1" @input="resizeTextarea" ref="textarea" v-model="model"></textarea>
</template>

<style scoped>
textarea {
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    color: white;
    font-size: 1em;
    font-family: arial;
}
</style>