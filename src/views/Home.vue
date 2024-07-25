<script setup lang="ts">
import QuizPreview from "@/components/quiz-preview.vue";

import { loadAll, deleteQuiz } from "@/saveManager";
import { ref, type Ref, type VNodeRef } from "vue";
import type { Quiz } from "@/quizTypes";
import { router } from "@/router/index";

import useQuiz from "@/stores/quiz";
const quizStore = useQuiz();

type QuizPreviewData = {loaded: false} |
    {loaded: true, data: Quiz[]}

const quizes: Ref<QuizPreviewData> = ref({loaded: false});
async function loadQuizes() {
    quizes.value = {loaded: true, data: await loadAll()};
}
loadQuizes();

function edit(quiz: Quiz) {
    quizStore.open(quiz);
    router.push("/create");
}
function play(quiz: Quiz) {
    quizStore.open(quiz);
    router.push("/play");
}
function deleteQuizAtIndex(index: number) {
    if (!quizes.value.loaded) return;
    deleteQuiz(quizes.value.data[index].id);
    quizes.value.data.splice(index, 1);
}
</script>

<template>
    <h1>Only Connect</h1>
    <RouterLink to="/create">New Quiz</RouterLink>
    <table v-if="quizes.loaded" id="quiz-table">
        <thead>
            <th>Name</th>
            <th>Last Edited</th>
            <th>Created</th>
            <th></th>
        </thead>
        <tbody>
            <QuizPreview 
                v-for="[index, quiz] in quizes.data.entries()" 
                :quiz="quiz"
                @edit="edit(quiz)"
                @play="play(quiz)"
                @delete="deleteQuizAtIndex(index)"
                :key="quiz.id"
            ></QuizPreview>
        </tbody>
    </table>
</template>