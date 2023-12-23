<script setup lang="ts">
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

import GenericCard from "@/components/quiz/generic-card.vue";
import GroupCation from "@/components/quiz/group-caption.vue";
import { computed, ref , watch} from "vue";
import { type Group } from "@/quizJson";

const cardIndicies = ref(quizProgress.wallProgress?.cardOrder??[]);
const wallQuestion = computed(() => quizProgress.questionObj! as [Group, Group, Group, Group])
const cards = computed(() => {
    return wallQuestion.value.map(group => group.cards).flat();
});
const caption = computed(() => {
    if (quizProgress.questionProgress! < 2 ) { 
        return undefined;
    }
    return wallQuestion.value[quizProgress.questionProgress! - 2].name;
});
const cardColours = computed(() => {
    let colours = Array(16);
    for (let i = 0; i < quizProgress.wallProgress!.groupsFound.length; i++) {
        for (let j = 0; j < 4; j++) {
            colours[quizProgress.wallProgress!.groupsFound[i]*4+j] = i;
        }
    }
    for (let i = 0; i < quizProgress.wallProgress!.selectedCards.length; i++) {
        colours[quizProgress.wallProgress!.selectedCards[i]] = quizProgress.wallProgress!.groupsFound.length
    }
    return colours;
})

function cardClicked(index: number) {
    if (quizProgress.wallProgress!.groupsFound.includes(Math.floor(index/4))) return;

    const indexOfIndex = quizProgress.wallProgress!.selectedCards.indexOf(index);
    if (indexOfIndex != -1) {
        quizProgress.wallProgress!.selectedCards.splice(indexOfIndex, 1);
        return;
    }
    quizProgress.wallProgress!.selectedCards.push(index);
    if (quizProgress.wallProgress!.selectedCards.length == 4) {
        checkGroup()
        quizProgress.wallProgress!.selectedCards = [];
    }
}
function checkGroup() {
    if (quizProgress.wallProgress!.selectedCards.length !== 4) return;
    let sortedCards = quizProgress.wallProgress!.selectedCards.sort((a, b) => a - b);
    if (sortedCards[0] % 4 !== 0) return;
    for (let i = 0 ; i < 3; i++) {
        if (sortedCards[i+1] - sortedCards[i] !== 1) return;
    }
    //if code reaches here then the selected cards DID form a group
    for (const card of sortedCards) {
        quizProgress.wallProgress!.cardOrder.splice(quizProgress.wallProgress!.cardOrder.indexOf(card), 1);
    }
    quizProgress.wallProgress!.cardOrder.splice(quizProgress.wallProgress!.groupsFound.length * 4, 0, ...sortedCards);
    quizProgress.wallProgress!.groupsFound.push(sortedCards[0]/4);

    if (quizProgress.wallProgress!.groupsFound.length !== 3) return;
    
    let groupsNotFound = [0, 1, 2, 3];
    for (const group of quizProgress.wallProgress!.groupsFound) {
        groupsNotFound.splice(groupsNotFound.indexOf(group), 1);
    }
    quizProgress.wallProgress!.groupsFound.push(groupsNotFound[0]);
    quizProgress.wallProgress!.foundAllGroups = true;
}
watch(() => quizProgress.questionProgress, (current, prev) => {
    if (current! >= 6) {
        quizProgress.completeQuestion();
    }
});
</script>

<template>
    <div class="question-container" @click="if (quizProgress.wallProgress?.foundAllGroups) quizProgress.forward();">
        <TransitionGroup tag="div" class="wall-container" name="wall">
            <GenericCard v-for="cardIndex in cardIndicies" :key="cardIndex" 
                :card="cards[cardIndex]" @click="cardClicked(cardIndex)"
                :group="cardColours[cardIndex]" class="wall-card">
            </GenericCard>
        </TransitionGroup>
        <Transition mode="out-in" name="caption">
            <GroupCation v-if="caption" :key="quizProgress.questionProgress">{{ caption }}</GroupCation>
        </Transition>
    </div>
</template>

<style scoped>
/*.wall-card is more specific than the TransitionGroup which cuases the colour transition to override the move transition
I avoid this by using :where()*/
:where(.wall-card) {
    transition: background-color 0.25s;
}
.wall-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}
</style>