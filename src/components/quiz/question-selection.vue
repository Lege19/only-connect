<script setup lang="ts">
import QuestionCard from "./question-card.vue";

defineProps<{
    questionsDone: boolean[]
}>();
defineEmits<{
    (e: 'cardClicked', index: number): void
}>();
</script>

<template>
    <div class=".container">
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