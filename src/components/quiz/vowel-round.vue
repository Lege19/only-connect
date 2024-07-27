<script setup lang="ts">
import VowelQuestion from "./questions/vowel-question.vue";
import FullPageTitle from "./full-page-title.vue";
import type { VowelRound } from "@/quizTypes";
import { ref, type Ref } from 'vue';

const props = defineProps<{
    round: VowelRound
}>();

const emit = defineEmits<{
    (e: "nextRound"): void,
    (e: "prevRound"): void
}>();

type VowelRoundProgress = {started: false} |
{started: true, currentQuestion: number};
const progress: Ref<VowelRoundProgress> = ref({started: false});

function forward() {
    if (!progress.value.started) {
        progress.value = {started: true, currentQuestion: 0};
    } else if (progress.value.currentQuestion + 1 < props.round.questions.length){
        progress.value.currentQuestion++;
    } else {
        emit("nextRound");
    }
}
function back() {
    if (!progress.value.started) {
        emit("prevRound")
    } else if (progress.value.currentQuestion === 0) {
        progress.value = {started: false};
    } else {
        progress.value.currentQuestion--;
    }
}
</script>

<template>
    <Transition mode="out-in" name="fade">
        <FullPageTitle 
            v-if="!progress.started" 
            @click="forward" 
            @forward="forward"
            @back="back"
        >{{ round.name }}</FullPageTitle>
        <VowelQuestion 
            v-else="progress.started"
            :question="round.questions[progress.currentQuestion]"
            :key="progress.currentQuestion"
            @next-question="forward"
            @prev-question="back"
        ></VowelQuestion>
    </Transition>
</template>