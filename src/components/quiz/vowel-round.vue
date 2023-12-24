<script setup lang="ts">
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import VowelQuestion from "./questions/vowel-question.vue";
</script>

<template>
    <Transition mode="out-in" name="fade">
        <VowelQuestion :data="quizProgress.questionObj as string|undefined || 'PlaceHolder'" :key="quizProgress.question??0"></VowelQuestion>
    </Transition>
</template>