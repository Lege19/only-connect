<script setup lang="ts">
import PlaySidebar from "@/components/play-sidebar.vue";
import QuizPlayer from "@/components/quiz-player.vue";
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
</script>

<template>
    <PlaySidebar></PlaySidebar>
    <QuizPlayer v-if="quiz.json" :quiz="quiz.json"></QuizPlayer>
</template>