<script setup lang="ts">
import QuizPreview from "@/components/quiz-preview.vue";
import AreYouSure from "@/components/are-you-sure.vue";
import UploadQuiz from "@/components/menus/upload-quiz.vue";

import { loadAll, deleteQuiz } from "@/saveManager";
import { ref, type Ref, type VNodeRef } from "vue";
import type { Quiz } from "@/quizTypes";
import { router } from "@/router/index";
import { saveAs } from "file-saver";

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
function download(quiz: Quiz) {
    saveAs(new Blob([JSON.stringify(quiz)]), quiz.name + ".json")
}
async function deleteQuizAtIndex(index: number) {
    if (!quizes.value.loaded) return;

    deleteQuiz(quizes.value.data[index].id);
    quizes.value.data.splice(index, 1);
}

function quizUploaded(quiz: Quiz) {
    if (!quizes.value.loaded) return;
    quizes.value.data.push(quiz);
}
</script>

<template>
    <div id="home-page-container">
        <h1>Only Connect Maker</h1>
        <div id="quiz-manager">
            <div id="buttons-container">
                <div class="button" @click="router.push('/create')">
                    <p>
                        New Quiz
                        <img src="@/assets/images/fat-add.svg">
                    </p>
                </div>
                <UploadQuiz @uploaded="quizUploaded"></UploadQuiz>
            </div>
            <div id="quiz-grid">
                <div v-if="quizes.loaded" id="inner">
                    <b id="name" class="header">Name</b>
                    <b id="last-edited" class="header">Last Edited</b>
                    <b id="created" class="header">Created</b>
                    <b class="header"></b>
                    <QuizPreview 
                        v-for="[index, quiz] in quizes.data.entries()" 
                        :quiz="quiz"
                        @edit="edit(quiz)"
                        @play="play(quiz)"
                        @delete="deleteQuizAtIndex(index)"
                        @download="download(quiz)"
                        :key="quiz.id"
                        class="quiz-preview"
                    ></QuizPreview>
                </div>
            </div>
        </div>
    </div>
</template>
