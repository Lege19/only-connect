<script setup lang="ts">
import type { VowelQuestion } from "@/quizTypes";
import { ref, type Ref, computed, type ComputedRef } from "vue";
const vowels = ["A", "E", "I", "O", "U", " "];

const props = defineProps<{
    question: VowelQuestion
}>();
const emit = defineEmits<{
    (e: 'nextQuestion'): void,
    (e: 'prevQuestion'): void
}>();

type Letter = {
    char: string,
    key: number
};
type VowelQuestionProgress = 
    {started: false} | 
    {started: true, phraseIdx: number, showVowels: boolean, withVowels: Letter[], withoutVowels: Letter[]};
const progress: Ref<VowelQuestionProgress> = ref({started: false});

function addRandomSpace(text: Letter[]): Letter[] {
    const thirdOfLength = text.length/3;
    const position = Math.floor(thirdOfLength + Math.random() * thirdOfLength);
    return text.splice(position, 0, {char: " ", key: -1});
}

function getStrings(phraseIdx: number): {withVowels: Letter[], withoutVowels: Letter[]}{
    const srcText = Array.from(props.question.phrases[phraseIdx].toUpperCase())
    const withVowels = Array.from(srcText.entries()).map(([key, char]: [number, string]) => ({char: char, key: key}))
    const withoutVowels = addRandomSpace(withVowels.filter((x: Letter) => !vowels.includes(x.char)));
    return {withVowels, withoutVowels};
}
function forward() {
    if (!progress.value.started) {
        progress.value = {
            started: true,
            phraseIdx: 0,
            showVowels: false,
            ...getStrings(0)
        };
    } else if (!progress.value.showVowels) {
        progress.value.showVowels = true;
    } else if (progress.value.phraseIdx + 1 < props.question.phrases.length) {
        progress.value.phraseIdx ++;
        progress.value.showVowels = false;

        Object.assign(progress.value, getStrings(progress.value.phraseIdx));
    } else {
        emit("nextQuestion");
    }
}
function back() {
    if (!progress.value.started) {
        emit("prevQuestion");
    } else if (progress.value.showVowels) {
        progress.value.showVowels = false;
    } else if (progress.value.phraseIdx === 0) {
        progress.value = {started: false};
    } else {
        progress.value.phraseIdx --;
        progress.value.showVowels = true;
        Object.assign(progress.value, getStrings(progress.value.phraseIdx));
    }
}
</script>

<template>
    <div 
        @click="forward" 
        @keydown.arrow-right="forward" 
        @keydown.space="forward"
        @keydown.arrow-left="back" 
        class="question-container"
    >
        <Transition name="fade" mode="out-in">
            <div v-if="progress.started" class="vowel-container" :key="progress.phraseIdx">
                <TransitionGroup tag="h1" name="vowel" style="white-space: pre">
                    <template
                        v-for="letter in (progress.showVowels ? progress.withoutVowels : progress.withVowels)"
                        :key="letter.key"
                    >
                        <span>{{ letter.char }}</span>
                    </template>
                </TransitionGroup>
            </div>
            <h1 v-else>{{ question.name }}</h1>
        </Transition>
    </div>
</template>

<style scoped>
.vowel-container {
    display: flex;
    justify-content:center;
}
</style>