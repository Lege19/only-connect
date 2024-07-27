<script setup lang="ts">
import EditorGroup from "./editor-group.vue";
import WallQuestion from "./editor-wall-question.vue";
import VowelQuestion from "./editor-vowel-question.vue";
import { type Ref, computed } from "vue";
import { type Question, RoundType } from "@/quizTypes";
const model: Ref<Question|undefined> = defineModel();
const props = defineProps<{
    roundType: RoundType
}>();
defineEmits<{
    (e: "delete"): void
}>();

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

<template>
    <component :is="component" v-model="model" @delete="$emit('delete')"></component>
</template>
