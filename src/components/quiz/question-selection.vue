<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import { computed } from "vue";

import QuestionCardContainer from "./question-card-container.vue";
import QuestionCard from "./question-card.vue";

const questions = computed(() => {
    if (!quiz.loaded) return;
    if (!quizProgress.playing) return;
    return quiz.json!.rounds[quizProgress.round!].questions;
});
const usedMap = computed(() => {
    if (!quiz.loaded) return;
    if (!quizProgress.playing) return;
    return quizProgress.questionsCompleted;
})
</script>

<template v-if="quiz.loaded&&quizProgress.playing">
    <QuestionCardContainer>
        <QuestionCard v-for="index in questions?.keys()" :index="index" :used="usedMap![index]"></QuestionCard>
    </QuestionCardContainer>
</template>