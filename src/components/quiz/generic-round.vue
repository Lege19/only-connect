<script setup lang="ts">
import RoundTitle from "./round-title.vue";
import VowelRound from "./vowel-round.vue";
import QuestionSelection from "./question-selection.vue";

import ConnectionQuestion from "./questions/connection-question.vue";
import SequenceQuestion from "./questions/sequence-question.vue";
import WallQuestion from "./questions/wall-question.vue";

import { computed, } from "vue";

import { RoundType } from "@/quizJson";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

const round = computed(() => {
    if (!quiz.loaded) return;
    if (!quizProgress.playing) return;
    return quiz.json!.rounds[quizProgress.round!];
});
const mainComponent = computed(() => {
    if (!quizProgress.roundStarted) return RoundTitle;
    if (round.value?.type == RoundType.Vowel) return VowelRound;
    if (quizProgress.question === null) return QuestionSelection;
    switch (round.value?.type) {
        case RoundType.Connection:
            return ConnectionQuestion;
        case RoundType.Sequence:
            return SequenceQuestion;
        case RoundType.Wall:
            return WallQuestion;
        default:
            return "div";
    }
});
</script>

<template v-if="quiz.loaded && quizProgress.playing">
    <Transition mode="out-in">
        <component :is="mainComponent"></component>
    </Transition>
</template>