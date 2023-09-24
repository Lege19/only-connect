<script setup lang="ts">
import TextCard from "./cards/text-card.vue";
import ImgCard from "./cards/img-card.vue";
import { type Card, CardType, GroupColor } from "@/quizJson";

import { computed } from "vue";

const props = defineProps<{
    card: Card,
    group?: number
}>();
const colorOverride = computed(() => {
    if (props.group === undefined || !(props.group in GroupColor)) return "";
    return `background-color: ${GroupColor[props.group]}`;
});
function getCardType() {
    switch (props.card.type) {
        case CardType.Text:
            return TextCard;
        case CardType.Image:
            return ImgCard;
        default:
            return TextCard;
    }
}
</script>

<template>
    <component :is="getCardType()" :data="props.card.data" :style="colorOverride"></component>
</template>

<style>
.card {
    background-color: var(--card-color);
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background-color 0.2s;
}
</style>