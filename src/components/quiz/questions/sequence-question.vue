<script setup lang="ts">
import { type Group } from "@/quizJson";

import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import GenericCard from "../generic-card.vue";
import GroupCation from "../group-caption.vue";

import { computed, watch } from "vue";

const cards = computed(() => {
    return (quizProgress.questionObj as Group).cards.slice(0, Math.min(quizProgress.questionProgress! + 1, 4));
});


watch(() => quizProgress.questionProgress, (current, prev) => {
    if (current! >= 4) {
        quizProgress.completeQuestion();
    }
});
</script>

<template>
    <div class="question-container" @click="quizProgress.forward">
        <TransitionGroup tag="div" class="card-group" name="card">
            <GenericCard v-for="[index, card] in cards.entries()" class="card-in-group" :key="index" :card="card"></GenericCard>
        </TransitionGroup>
        <Transition name="caption">
            <GroupCation v-if="quizProgress.questionProgress == 3">{{ (quizProgress.questionObj! as Group).name }}</GroupCation>
        </Transition>
    </div>
</template>