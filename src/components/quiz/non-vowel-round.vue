<script setup lang="ts">
import RoundTitle from "./round-title.vue";
import QuestionSelection from "./question-selection.vue";
import ConnectionQuestion from "./questions/connection-question.vue";
import SequenceQuestion from "./questions/sequence-question.vue";
import WallQuestion from "./questions/wall-question.vue";

import { RoundType, type ConnectionRound, type SequenceRound, type WallRound } from "@/quizTypes";
import {ref, type Component, type Ref } from "vue";

const props = defineProps<{
    round: ConnectionRound|SequenceRound|WallRound
}>();
const emit = defineEmits<{
    (e: "nextRound"): void
}>();

type NonVowelRoundProgress = {started: false} |
    {started: true, pickQuestion: true} |
    {started: true, pickQuestion: false, questionIdx: number};

const progress: Ref<NonVowelRoundProgress> = ref({started: false});
const questionsDone: Ref<boolean[]> = ref(Array(props.round.questions.length).fill(false));


function forward() {
    if (!progress.value.started) {
        progress.value = {started: true, pickQuestion: true};
    }
}
function back() {
    if (progress.value.started) {
        progress.value = {started: false};
    }
}
function cardClicked(index: number) {
    progress.value = {started: true, pickQuestion: false, questionIdx: index}
}
function questionFinished() {
    if (!progress.value.started || progress.value.pickQuestion) return;
    questionsDone.value[progress.value.questionIdx] = true;
    progress.value = {started: true, pickQuestion: true};
    if (questionsDone.value.every(x=>x)) {
        emit("nextRound");
    }
}
function questionCanceled() {
    progress.value = {started: true, pickQuestion: true};
}
</script>

<template>
    <Transition name="fade" mode="out-in">
        <RoundTitle 
            v-if="!progress.started" 
            @click="forward" 
            @keydown.arrow-right="forward"
            @keydown.space="forward"
        >{{ round.name }}</RoundTitle>
        <QuestionSelection 
            v-else-if="progress.pickQuestion" 
            :questions-done="questionsDone"
            @card-clicked="cardClicked"
            @keydown.arrow-left="back"
        ></QuestionSelection>
        <ConnectionQuestion 
            v-else-if="round.type === RoundType.Connection" 
            :question="round.questions[progress.questionIdx]"
            @question-finished="questionFinished"
            @question-canceled="questionCanceled"
        ></ConnectionQuestion>
        <SequenceQuestion
            v-else-if="round.type === RoundType.Sequence"
            :question="round.questions[progress.questionIdx]"
            @question-finished="questionFinished"
            @question-canceled="questionCanceled"
        ></SequenceQuestion>
        <WallQuestion
            v-else-if="round.type === RoundType.Wall"
            :question="round.questions[progress.questionIdx]"
            @question-finished="questionFinished"
            @question-canceled="questionCanceled"
        ></WallQuestion>
    </Transition>
</template>