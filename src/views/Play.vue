<script setup lang="ts">
import QuizPlayer from "@/components/quiz-player.vue";
import PlayMenu from "@/components/menus/play-menu.vue";

import { ref, type Ref } from "vue";
import { loadQuiz } from "@/saveManager";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

const quizPlayer: Ref<null|typeof QuizPlayer> = ref(null);

async function init() {
    if (route.params.id === "") {
        if (!quiz.json) {
            router.replace("/");
            return;
        }
        router.replace("/play/" + quiz.json.id);
        
    } else {
        quiz.open(await loadQuiz(route.params.id as string));
    }
}
init();
</script>

<template>
    <PlayMenu 
        @reset-quiz="quizPlayer?.resetQuiz" 
        @next-round="quizPlayer?.nextRound" 
        @prev-round="quizPlayer?.prevRound"
    ></PlayMenu>
    <QuizPlayer v-if="quiz.json" :quiz="quiz.json" ref="quizPlayer"></QuizPlayer>
</template>