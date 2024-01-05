<script setup lang="ts">
import EditorGroup from "./editor-group.vue";
import WallQuestion from "./wall-question.vue";
import VowelQuestion from "./vowel-question.vue";
import { type Ref, computed } from "vue";
import { type Question, RoundType } from "@/quizJson";
const model: Ref<Question|undefined> = defineModel();
const props = defineProps<{
    roundType: RoundType,
    del: () => void
}>()
const component = computed(() => {
    switch (props.roundType) {
        case RoundType.Connection:
        case RoundType.Sequence:
            return EditorGroup;
        case RoundType.Wall:
            return WallQuestion;
        case RoundType.Vowel:
            return VowelQuestion;
    }
});
</script>

<template v-if="model">
    <component :is="component" v-model="model" :del="del"></component>
</template>