<script setup lang="ts">
import OutlinedDiv from "./outlined-div.vue";
import { type Ref, ref, onMounted } from "vue";
const model: Ref<string|undefined> = defineModel();
const textarea: Ref<HTMLTextAreaElement|undefined> = ref(undefined);
function resizeTextarea() {
    if (!textarea.value) return;
    textarea.value.style.height = "";
    textarea.value.style.height = textarea.value.scrollHeight.toString() + "px";
}
onMounted(resizeTextarea);
</script>

<template>
    <OutlinedDiv>
        <textarea v-model="model" ref="textarea" @input="resizeTextarea" rows="1"></textarea>
    </OutlinedDiv>
</template>

<style scoped>
textarea {
    background-color: transparent;
    font-size: 1em;
    max-width: 200px;
    resize: none;
    outline: none;
    border: none;
    overflow: hidden;
}
</style>