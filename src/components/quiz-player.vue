<script setup lang="ts">
import QuizTitle from "./quiz/quiz-title.vue";
import GenericRound from "./quiz/generic-round.vue";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import { computed, watch } from "vue";

const mainComponent = computed(() => {
    if (!quiz.loaded) return "";
    if (quizProgress.playing) return GenericRound;
    return QuizTitle;
});

document.onkeydown = (e) => {
    if ((e as KeyboardEvent).key == "ArrowLeft") {
        quizProgress.back();
    } else if ((e as KeyboardEvent).key == "ArrowRight") {
        quizProgress.forward();
    }
};

watch(() => quizProgress.roundCompleted, (current, old) => {
    if (current) quizProgress.nextRound();
});
</script>

<template v-if="quiz.loaded">
    <div id="quiz-player">
        <transition mode="out-in">
            <component v-if="mainComponent" :is="mainComponent"></component>
        </transition>
    </div>
</template>

<style scoped>
#quiz-player {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>