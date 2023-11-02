<script setup lang="ts">
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import GenericCard from "../generic-card.vue";
import GroupCaption from "../group-caption.vue";
import { computed, watch, type Ref, ref } from "vue";
import { type Group } from "@/quizJson";

watch(() => quizProgress.questionProgress, (current, prev) => {
    if (current == 9) {
        quizProgress.completeQuestion();
    }
});

let groupsFound: Ref<Array<number>> = ref([]);//contains the indexes of the groups that have been found in order
let selectedCards: Ref<Array<number>> = ref([]);//indexes of cards currently selected
let order: Ref<Array<number>> = ref(Array.from(Array(16).keys()).sort(() => (Math.random() - 0.5)));

const cards = computed(() => {//ordered
    return (quizProgress.questionObj as [Group, Group, Group, Group]).map(x => x.cards).flat();
});
const colourIndexes = computed(() => {
    return Array.from(Array(16).keys()).map(index => {
        let group = Math.floor(index/4);

        let groupIndex = groupsFound.value.indexOf(group);
        if (groupIndex != -1) {
            return groupIndex;
        }
        if (!selectedCards.value.includes(index)) return undefined;
        return groupsFound.value.length;
    });
});

function cardClicked(index: number) {
    if (groupsFound.value.includes(getGroup(index))) return;
    if (selectedCards.value.includes(index)) {
        selectedCards.value.splice(selectedCards.value.indexOf(index), 1);
        return;
    }

    selectedCards.value.push(index);
    if (selectedCards.value.length < 4) return;
    let group = getGroup(index);
    let cardsInSameGroup = true;
    for (let i = 0; i < 3; i++) {
        cardsInSameGroup = cardsInSameGroup && (group === getGroup(selectedCards.value[i]));
    }
    if (cardsInSameGroup) {
        for (let i = 3; i >= 0; i--) {
            pullCardToFront(selectedCards.value[i]);
        }
        groupsFound.value.push(group);
        quizProgress.questionProgress!++;
    }
    if (groupsFound.value.length === 3) {
        let remainingGroup = Array.from(Array(4).keys()).filter(x => !groupsFound.value.includes(x))[0];
        groupsFound.value.push(remainingGroup);
        quizProgress.questionProgress!++;
    }
    selectedCards.value = [];
}

function getGroup(index: number) {
    return Math.floor(index/4);
}
function pullCardToFront(index: number) {
    let position = order.value.indexOf(index);
    if (position == -1) return;
    order.value.splice(position, 1);
    order.value.splice(groupsFound.value.length * 4, 0, index);
}
</script>

<template>
    <div class="question-container">
        <TransitionGroup tag="div" name="wall" class="wall-container">
            <template v-for="index in order" :key="index">
                <GenericCard
                    :card="cards[index]"
                    @click="cardClicked(index)" :group="colourIndexes[index]"
                ></GenericCard>
            </template>
        </TransitionGroup>
        <Transition name="caption">
            <GroupCaption v-if="quizProgress.questionProgress! > 4" :key="quizProgress.questionProgress">
                {{ (quizProgress.questionObj! as unknown as [Group, Group, Group, Group])[quizProgress.questionProgress! - 5].name }}
            </GroupCaption>
        </Transition>
    </div>
</template>