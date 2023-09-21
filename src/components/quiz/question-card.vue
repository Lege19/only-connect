<script setup lang="ts">
import { computed } from "vue";

import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

const hieroglyphs = ["𓇌", "𓃭", "𓎛", "𓆑", "𓈗", "𓂀"];
const props = defineProps<{
    text?: string,
    index: number,
    offset?: [number, number],
    used: boolean
}>();
const title = computed(() => {
    if (props.text) return props.text;
    if (props.index === undefined) return "Place holder"
    return hieroglyphs[props.index];
});
const offset = computed(() => `x:${props.offset??[0, 0][0]};y:${props.offset??[0, 0][1]}`);

function clicked() {
    if (props.used) return;
    quizProgress.question = props.index;
}
</script>

<template>
    <div 
     class="card" 
     :style="offset" 
     :class="{usedCard: props.used}" 
     @click="clicked"
    >
        <h2 style="font-size: 2cm">{{ title }}</h2>
    </div>
</template>

<style scoped>
.card {
    background-color: var(--card-color);
    width: 20vw;
    aspect-ratio: 16/9;
    border-radius: 9%/16%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    flex-basis: 25%;
}
.usedCard {
    background-color: var(--used-card-color)
}
</style>