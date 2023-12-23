<script setup lang="ts">
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();
import { watch } from "vue";
const vowels = ["A", "E", "I", "O", "U"];
const props = defineProps<{data: string}>();
const withVowels = Array.from(Array.from(props.data.toUpperCase()).entries());
let withoutVowels = withVowels.filter(x => !vowels.includes(x[1]) && x[1] !== " ");
withoutVowels.splice(Math.floor(Math.random() * (withoutVowels.length-6)) + 3, 0, [-1, " "]);
watch(() => quizProgress.questionProgress, (curr, prev) => {
    if (curr === 2) {
        if (quizProgress.roundObj!.questions.length-1 === quizProgress.question) {
            quizProgress.nextRound();
            return;
        }
        quizProgress.question!++;
        quizProgress.questionProgress = 0;
    }
});
</script>

<template>
    <TransitionGroup tag="div" name="vowel" @click="quizProgress.forward" class="vowel-container">
        <template v-for="item in quizProgress.questionProgress === 0 ? withoutVowels : withVowels" :key="item[0]">
            <h1>{{ item[1] }}</h1>
        </template>
    </TransitionGroup>
</template>

<style scoped>
.vowel-container {
    display: flex;
}
h1 {
    white-space: pre;
}
</style>