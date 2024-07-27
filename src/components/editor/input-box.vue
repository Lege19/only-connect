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
defineProps<{
    placeholder?: string
}>();
</script>

<template>
    <div class="input-box">
        <textarea rows="1" @input="resizeTextarea" ref="textarea" v-model="model" :placeholder="placeholder"></textarea>
        <div class="icons">
            <slot></slot>
        </div>
    </div>
</template>
