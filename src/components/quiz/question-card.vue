<script setup lang="ts">
import { ref } from "vue";

const hieroglyphs = ["𓇌", "𓃭", "𓎛", "𓆑", "𓈗", "𓂀"];
const props = defineProps<{
    text?: string,
    index: number,
    used: boolean
}>();
const title = ref(props.text ?? hieroglyphs[props.index]);
</script>

<template>
    <div 
     class="question-card card" 
     :class="{'used-card': used}" 
    >
        <h2 style="font-size: 2cm">{{ title }}</h2>
    </div>
</template>
