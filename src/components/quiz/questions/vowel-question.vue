<script setup lang="ts">
import type { VowelQuestion } from "@/quizJson";
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();
import { watch, computed } from "vue";
const blacklist = ["A", "E", "I", "O", "U", " "];
const props = defineProps<{data: VowelQuestion}>();

const withVowels = computed(() => {
    if (quizProgress.questionProgress === 0) return undefined;
    return Array.from(Array.from(props.data.phrases[Math.floor((quizProgress.questionProgress!-1)/2)].toUpperCase()).entries())
})
console.log(props.data);
const withoutVowels = computed(() => {
    if (!withVowels.value) return;
    let out = withVowels.value.filter(x => !blacklist.includes(x[1]));
    out.splice(Math.floor(Math.random() * (out.length-6)) + 1, 0, [-1, " "]);
    return out;
});
watch(() => quizProgress.questionProgress, (curr, prev) => {
    if (curr === props.data.phrases.length * 2 + 1) {
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
    <div @click="quizProgress.forward" class="question-container">
        <Transition name="fade" mode="out-in">
            <TransitionGroup v-if="withVowels" :key="Math.floor((quizProgress.questionProgress!-1)/2)"
            tag="div" name="vowel" @click="quizProgress.forward" class="vowel-container">
                <template v-for="item in quizProgress.questionProgress!%2 === 1 ? withoutVowels : withVowels" :key="item[0]">
                    <h1>{{ item[1] }}</h1>
                </template>
            </TransitionGroup>
            <h1 v-else>{{ props.data.name }}</h1>
        </Transition>
    </div>
</template>

<style scoped>
.vowel-container {
    display: flex;
    justify-content:center;
}
h1 {
    white-space: pre;
}
</style>