<script setup lang="ts">
import QuizEditor from "@/components/quiz-editor.vue";
import CreateSidebar from "@/components/create-sidebar.vue";

import { router } from "@/router/index";
import { useRoute } from "vue-router";
import { newQuiz, loadQuiz } from "@/saveManager";
import { ref, type Ref } from "vue";
import type { Quiz } from "@/quizTypes";

import useQuiz from "@/stores/quiz";
const quizStore = useQuiz();

const route = useRoute();

type State = {loaded: false} | 
{loaded: true, data: Quiz};

const state: Ref<State> = ref({loaded: false});

async function init() {
    if (route.params.id === "") {
        if (quizStore.json) {
            state.value = {loaded: true, data: quizStore.json};
        } else {
            state.value = {loaded: true, data: await newQuiz()};
        }
        router.replace("/create/" + state.value.data.id);
    } else {
        state.value = {loaded: true, data: await loadQuiz(route.params.id as string)}
    }
}
init();
</script>

<template>
    <CreateSidebar></CreateSidebar>
    <QuizEditor v-if="state.loaded" v-model="state.data"></QuizEditor>
</template>