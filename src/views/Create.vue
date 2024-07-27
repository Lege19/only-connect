<script setup lang="ts">
import QuizEditor from "@/components/quiz-editor.vue";
import CreateMenu from "@/components/menus/create-menu.vue"

import { router } from "@/router/index";
import { useRoute } from "vue-router";
import { newQuiz, loadQuiz } from "@/saveManager";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

const route = useRoute();

window.addEventListener('beforeunload', () => {
    quiz.saveCurrent();
});

async function init() {
    if (route.params.id === "") {
        if (!quiz.json) {
            quiz.open(await newQuiz());
        }
        router.replace("/create/" + quiz.json!.id);
    } else {
        quiz.open(await loadQuiz(route.params.id as string));
    }
}
init();
</script>

<template>
    <CreateMenu></CreateMenu>
    <QuizEditor v-if="quiz.json" v-model="quiz.json"></QuizEditor>
</template>