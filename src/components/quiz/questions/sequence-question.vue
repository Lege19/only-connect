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
    if (current == 4) {
        quizProgress.completeQuestion();
    }
});
</script>

<template>
    <div class="container" @click="quizProgress.forward">
        <TransitionGroup tag="div" id="card-group">
            <GenericCard v-for="[index, card] in cards.entries()" class="card" :key="index" :card="card"></GenericCard>
        </TransitionGroup>
        <Transition name="caption">
            <GroupCation v-if="quizProgress.questionProgress == 3">{{ (quizProgress.questionObj! as Group).name }}</GroupCation>
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>