<script setup lang="ts">
import { type Group } from "@/quizJson";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import GenericCard from "../generic-card.vue";
import GroupCation from "../group-caption.vue";

import { computed } from "vue";

quizProgress.questionProgress = 0;
const question = computed(() => {
    const round = quiz.json!.rounds[quizProgress.round!];
    return round.questions[quizProgress.question!];
});
const cards = computed(() => {
    return (question.value as unknown as Group).cards.slice(0, Math.min(quizProgress.questionProgress! + 1, 4));
});

function next() {
    quizProgress.questionProgress!++;
    if (quizProgress.questionProgress == 5) {
        quizProgress.questionsCompleted![quizProgress.question!] = true;
        quizProgress.question = null;
        quizProgress.questionProgress = undefined;
    }
}
</script>

<template>
    <div class="container">
        <TransitionGroup tag="div" id="card-group" @click="next">
            <GenericCard v-for="[index, card] in cards.entries()" class="card" :key="index" :card="card"></GenericCard>
        </TransitionGroup>
        <Transition name="caption">
            <GroupCation v-if="quizProgress.questionProgress == 4">{{ (question as Group).name }}</GroupCation>
        </Transition>
    </div>
        
</template>

<style scoped>
#card-group {
    display: flex;
    gap: 2.6666666%;
    width: 100%;
}
.card {
    flex-basis: 23%
}
.container {
    width: 80%;
}


</style>