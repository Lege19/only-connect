<script setup lang="ts">
import QuizTitle from "./quiz/quiz-title.vue";
import GenericRound from "./quiz/generic-round.vue";
import DynamicPageTitle from "./dynamic-page-title.vue";

import { ref, type Ref } from "vue";
import { type Quiz } from "@/quizTypes";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const props = defineProps<{
    quiz: Quiz
}>();

enum QuizPhase {
    TitleScreen,
    Rounds,
    ExitScreen
}
type QuizProgress = {phase: QuizPhase.TitleScreen|QuizPhase.ExitScreen} | 
    {phase: QuizPhase.Rounds, roundIdx: number};
const progress: Ref<QuizProgress> = ref({phase: QuizPhase.TitleScreen});

if (props.quiz.rounds.length === 0) {
    alert("Quiz has no rounds");
    router.go(-1);
}

function forward() {
    if (progress.value.phase === QuizPhase.TitleScreen) {
        progress.value = {phase: QuizPhase.Rounds, roundIdx: 0};
    }
    else if (progress.value.phase !== QuizPhase.Rounds) return;
    else if (progress.value.roundIdx + 1 < props.quiz.rounds.length) {
        progress.value.roundIdx++;
    } else {
        progress.value = {phase: QuizPhase.ExitScreen};
    }
}
function back() {
    if (progress.value.phase === QuizPhase.ExitScreen) {
        progress.value = {
            phase: QuizPhase.Rounds,
            roundIdx: props.quiz.rounds.length - 1
        };
    } else if (progress.value.phase !== QuizPhase.Rounds) return;
    else if (progress.value.roundIdx === 0) {
        progress.value = {phase: QuizPhase.TitleScreen};
    } else {
        progress.value.roundIdx--;
    }
}
function resetQuiz() {
    progress.value = {phase: QuizPhase.TitleScreen};
}
defineExpose({ resetQuiz, prevRound: back, nextRound: forward });
</script>

<template>
    <DynamicPageTitle :title="quiz.name + ' - Playing'"></DynamicPageTitle>
    <div id="quiz-player">
        <transition mode="out-in" name="fade">
            <QuizTitle 
                v-if="progress.phase !== QuizPhase.Rounds" 
                @click="forward" 
                @keydown.arrow-right="forward" 
                @keydown.space="forward"
                @keydown.arrow-left="back"
            >{{ quiz.name }}</QuizTitle>
            <GenericRound 
                v-else 
                :round="quiz.rounds[progress.roundIdx]" 
                @next-round="forward" 
                @prev-round="back"
                :key="progress.roundIdx"
            ></GenericRound>
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