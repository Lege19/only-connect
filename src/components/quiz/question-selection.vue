<script setup lang="ts">
import QuestionCard from "./question-card.vue";
import { bindKeys } from "@/utils";
defineProps<{
    questionsDone: boolean[]
}>();
const emit = defineEmits<{
    (e: 'cardClicked', index: number): void,
    (e: 'back'): void
}>();
bindKeys(() => {}, () => emit("back"));
</script>

<template>
    <div class="container">
        <QuestionCard v-for="[index, done] in questionsDone.entries()" 
            :index="index" 
            :used="done" 
            @click="if (!done) $emit('cardClicked', index);"
        ></QuestionCard>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
    width: 80%;
    gap: 1em;
    justify-content: center;
}
</style>