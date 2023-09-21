<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

function clicked() {
    if (quizProgress.completed) return;
    quizProgress.start();
}
</script>

<template>
    <div @click="clicked">
        <h1>{{ quiz.json?.name }}</h1>
    </div>
</template>

<style scoped>
div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>