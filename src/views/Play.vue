<script setup lang="ts">
import PlaySidebar from "@/components/play-sidebar.vue";
import QuizPlayer from "@/components/quiz-player.vue";
import useQuiz from "@/stores/quiz";
import { ref, type Ref } from "vue";
const quiz = useQuiz();
const quizPlayer: Ref<null|typeof QuizPlayer> = ref(null);
</script>

<template>
    <PlaySidebar 
        @reset-quiz="quizPlayer?.resetQuiz" 
        @next-round="quizPlayer?.nextRound" 
        @prev-round="quizPlayer?.prevRound"
    ></PlaySidebar>
    <QuizPlayer v-if="quiz.json" :quiz="quiz.json" ref="quizPlayer"></QuizPlayer>
</template>