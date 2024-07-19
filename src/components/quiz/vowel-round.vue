<script setup lang="ts">
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import VowelQuestionComponent from "./questions/vowel-question.vue";
import type { VowelQuestion } from "@/quizJson";
</script>

<template>
    <Transition mode="out-in" name="fade">
        <VowelQuestionComponent :data="quizProgress.questionObj as VowelQuestion" :key="quizProgress.question??0"></VowelQuestionComponent>
    </Transition>
</template>