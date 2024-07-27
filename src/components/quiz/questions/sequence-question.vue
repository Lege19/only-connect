<script setup lang="ts">
import { type Group } from "@/quizTypes";

import GenericCard from "../generic-card.vue";
import GroupCation from "../group-caption.vue";

import { ref, type Ref, watch } from "vue";

defineProps<{
    question: Group
}>();
const emit = defineEmits<{
    (e: 'questionFinished'): void,
    (e: "questionCanceled"): void,
}>()
const cardsShown: Ref<number> = ref(1);
const showCaption: Ref<boolean> = ref(false);
function forward() {
    if (cardsShown.value < 3) {
        cardsShown.value++;
    } else if (cardsShown.value === 3) {
        cardsShown.value = 4;
        showCaption.value = true;
    } else {
        emit('questionFinished');
    }
}
function back() {
    if (showCaption.value) {
        showCaption.value = false;
        cardsShown.value = 3;
    } else if (cardsShown.value === 1) {
        emit("questionCanceled");
    } else {
        cardsShown.value--;
    }
}
</script>

<template>
    <div
        class="question-container" 
        @click="forward" 
        @keydown.arrow-right="forward" 
        @keydown.space="forward" 
        @keydown.arrow-left="back"
    >
        <TransitionGroup tag="div" class="card-group" name="card">
            <GenericCard 
                v-for="[index, card] in question.cards.slice(0, cardsShown).entries()" 
                class="card-in-group" 
                :key="index" 
                :card="card"
                :type="question.type"
                ></GenericCard>
        </TransitionGroup>
        <Transition name="caption">
            <GroupCation v-if="showCaption">{{ question.name }}</GroupCation>
        </Transition>
    </div>
</template>