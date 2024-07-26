<script setup lang="ts">
import PlaySidebar from "@/components/play-sidebar.vue";
import QuizPlayer from "@/components/quiz-player.vue";
import { ref, type Ref } from "vue";
import type { Quiz } from "@/quizTypes";
import { router } from "@/router/index";
import { loadQuiz } from "@/saveManager";

import { useRoute } from "vue-router";
const route = useRoute();

import useQuiz from "@/stores/quiz";
const quizStore = useQuiz();

const quizPlayer: Ref<null|typeof QuizPlayer> = ref(null);

type State = {loaded: false} |
{loaded: true, quiz: Quiz};
const state: Ref<State> = ref({loaded: false});

async function init() {
    if (route.params.id === "") {
        if (quizStore.json) {
            state.value = {loaded: true, quiz: quizStore.json};
            router.replace("/create/" + state.value.quiz.id);
        } else {
            router.replace("/");
        }
        
    } else {
        state.value = {loaded: true, quiz: await loadQuiz(route.params.id as string)}
    }
}
init();
</script>

<template>
    <PlaySidebar 
        @reset-quiz="quizPlayer?.resetQuiz" 
        @next-round="quizPlayer?.nextRound" 
        @prev-round="quizPlayer?.prevRound"
    ></PlaySidebar>
    <QuizPlayer v-if="state.loaded" :quiz="state.quiz" ref="quizPlayer"></QuizPlayer>
</template>