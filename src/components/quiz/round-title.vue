<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();
</script>

<template v-if="quizProgress.playing">
    <div @click="quizProgress.startRound">
        <h1>{{ quiz.json?.rounds[quizProgress.round!].name }}</h1>
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