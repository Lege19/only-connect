<script setup lang="ts">
import GenericCard from "@/components/quiz/generic-card.vue";
import GroupCation from "@/components/quiz/group-caption.vue";
import { computed, ref, type Ref} from "vue";
import { GroupType, type Group, type WallQuestion } from "@/quizTypes";

const props = defineProps<{
    question: WallQuestion
}>();
const emit = defineEmits<{
    (e: "questionFinished"): void
    (e: "questionCanceled"): void
}>();

type WallCard = {
    card: string,
    group: number
};

type WallState = {
    selectedCards: number[],
    groupsFound: number[],
    cardOrder: number[],
};
enum WallPhase {
    FindingGroups,
    BonusPoints,// all groups found but before captions are revealed
    Captions
}
type WallQuestionProgress = {phase: WallPhase.FindingGroups | WallPhase.BonusPoints} |
    {phase: WallPhase.Captions, captionIdx: number};
const progress: Ref<WallQuestionProgress> = ref({phase: WallPhase.FindingGroups});
const wallState: Ref<WallState> = ref({
    selectedCards: [], 
    groupsFound: [], 
    cardOrder: Array.from(Array(16).keys())
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
});

const cards: WallCard[] = Array.from(props.question.entries())
    .map(
        ([index, group]: [number, Group]) => group.cards.map(
            card => ({card, group: index})
        )
    ).flat();
const cardColours = computed(() => {
    let colours = Array(16);
    for (let i = 0; i < wallState.value.groupsFound.length; i++) {
        for (let j = 0; j < 4; j++) {
            colours[wallState.value.groupsFound[i]*4+j] = i;
        }
    }
    const nextGroupColor = wallState.value.groupsFound.length
    for (const card of wallState.value.selectedCards) {
        colours[card] = nextGroupColor;
    }
    return colours;
});

function cardClicked(index: number) {
    if (wallState.value.groupsFound.includes(Math.floor(index/4))) return;

    const indexOfIndex = wallState.value.selectedCards.indexOf(index);
    if (indexOfIndex != -1) {
        wallState.value.selectedCards.splice(indexOfIndex, 1);
        return;
    }
    wallState.value.selectedCards.push(index);
    if (wallState.value.selectedCards.length == 4) {
        checkGroup()
        wallState.value.selectedCards = [];
    }
}
function checkGroup() {
    if (wallState.value.selectedCards.length !== 4) return;
    const cardGroups = wallState.value.selectedCards.map(idx => cards[idx].group);
    if (!cardGroups.every(groupIdx => groupIdx === cardGroups[0])) return;
    //if code reaches here then the selected cards DID form a group
    for (const card of wallState.value.selectedCards) {
        wallState.value.cardOrder.splice(wallState.value.cardOrder.indexOf(card), 1);
        wallState.value.cardOrder.splice(wallState.value.groupsFound.length * 4, 0, card)
    }
    wallState.value.groupsFound.push(cardGroups[0]);

    if (wallState.value.groupsFound.length !== 3) return;
    
    const sumOfAllGroups = 6;// 0 + 1 + 2 + 3
    const groupsFoundSum = wallState.value.groupsFound.reduce((partialSum, a) => a + partialSum, 0);
    const missingGroup = sumOfAllGroups - groupsFoundSum;
    wallState.value.groupsFound.push(missingGroup);
    progress.value.phase = WallPhase.BonusPoints;
}

function forward() {
    if (progress.value.phase === WallPhase.BonusPoints) {
        progress.value = {phase: WallPhase.Captions, captionIdx: 0};
    } else if (progress.value.phase !== WallPhase.Captions) return;
    else if (progress.value.captionIdx < 3) {
        progress.value.captionIdx++;
    } else {
        emit("questionFinished");
    }
}
function back() {
    if (progress.value.phase === WallPhase.Captions) {
        if (progress.value.captionIdx === 0) {
            progress.value = {phase: WallPhase.BonusPoints};
        } else {
            progress.value.captionIdx--;
        }
    } else if (progress.value.phase === WallPhase.BonusPoints) {
        progress.value.phase = WallPhase.FindingGroups;
        wallState.value.groupsFound.pop();
    } else if (wallState.value.groupsFound.length === 0) {
        emit("questionCanceled");
    } else {
        wallState.value.groupsFound.pop();
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
        <TransitionGroup
            tag="div" 
            class="wall-container" 
            :class="{'wall-container-end': progress.phase === WallPhase.Captions}" 
            name="wall" 
        >
            <GenericCard 
                v-for="cardIndex in wallState.cardOrder" 
                :type="GroupType.Text"
                :key="cardIndex" 
                :card="cards[cardIndex].card" 
                @click="cardClicked(cardIndex)"
                :group="cardColours[cardIndex]" 
                class="wall-card" 
                :highlight="progress.phase === WallPhase.Captions && 
                    cards[cardIndex].group === wallState.groupsFound[progress.captionIdx]"
            >
            </GenericCard>
        </TransitionGroup>
        <Transition mode="out-in" name="caption">
                <GroupCation v-if="progress.phase === WallPhase.Captions" :key="progress.captionIdx">
                    {{ question[wallState.groupsFound[progress.captionIdx]].name }}
                </GroupCation>
        </Transition>
    </div>
</template>

<style scoped>
.wall-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}
.wall-container-end {
    transition: transform 1s ease;
    transform: translate(0, -70px) scale(0.8, 0.8);
}
</style>