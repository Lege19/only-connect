<script setup lang="ts">
import TextCard from "./cards/text-card.vue";
import ImgCard from "./cards/img-card.vue";
import { type Card, CardType, GroupColor } from "@/quizTypes";

import { computed } from "vue";

const props = defineProps<{
    card: Card,
    group?: number,
    highlight?: boolean
}>();
const styleOverride = computed(() => {
    let style = "";
    if (props.group !== undefined && props.group in GroupColor) {
        style = style + `background-color: ${GroupColor[props.group]};`
    }
    return style;
});
function getCardType() {
    switch (props.card.type) {
        case CardType.Text:
            return TextCard;
        case CardType.Image:
            return ImgCard;
    }
}
</script>

<template>
    <component 
        :is="getCardType()" 
        :data="props.card.data" 
        :style="styleOverride" 
        :class="{'highlight': highlight}"
    ></component>
</template>