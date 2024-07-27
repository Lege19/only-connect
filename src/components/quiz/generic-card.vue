<script setup lang="ts">
import TextCard from "./cards/text-card.vue";
import ImgCard from "./cards/img-card.vue";
import { GroupType, GroupColor } from "@/quizTypes";

import { computed } from "vue";

const props = defineProps<{
    card: string,
    type: GroupType
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
    switch (props.type) {
        case GroupType.Text:
            return TextCard;
        case GroupType.Image:
            return ImgCard;
    }
}
</script>

<template>
    <component 
        :is="getCardType()" 
        :data="props.card" 
        :style="styleOverride" 
        :class="{'highlight': highlight}"
    ></component>
</template>