<script setup lang="ts">
import VowelRound from "./editor-vowel-round.vue";
import WallRound from "./editor-wall-round.vue";
import GroupRound from "./editor-group-round.vue";

import { type Ref } from "vue";
import { RoundType, type Round } from "@/quizTypes";

const model: Ref<Round|undefined> = defineModel();

defineEmits<{
    (e: "delete"): void,
    (e: "moveUp"): void,
    (e: "moveDown"): void
}>();

function getRoundComponent() {
    if (!model.value) return;
    switch (model.value.type) {
        case RoundType.Connection:
        case RoundType.Sequence:
            return GroupRound;
        case RoundType.Vowel:
            return VowelRound;
        case RoundType.Wall:
            return WallRound;
    }
}
</script>

<template>
    <component
        :is="getRoundComponent()" 
        @delete="$emit('delete')" 
        @move-up="$emit('moveUp')" 
        @move-down="$emit('moveDown')"
        v-model="model"
    ></component>
</template>
