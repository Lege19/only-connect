<script setup lang="ts">
import WallQUestion from "./questions/wall-question.vue";
import VowelQuestion from "./questions/vowel-question.vue";
import EditorGroup from "./editor-group.vue";
import { computed } from "vue";
import { RoundType, type Question } from "@/quizJson";
const props = defineProps<{
    data: Question
    roundType: RoundType
}>();
const component = computed(() => {
    switch (props.roundType) {
        case RoundType.Connection:
        case RoundType.Sequence:
            return EditorGroup;
        case RoundType.Wall:
            return WallQUestion;
        case RoundType.Vowel:
            return VowelQuestion;
    }
})
</script>

<template>
    <component :is="component" :data="data"></component>
</template>