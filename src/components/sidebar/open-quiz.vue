<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import { parse } from "@/quizParser";

const props = defineProps<{
    close?: Function
}>();

async function openFile(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    const parsedQuiz = await parse(fileList[0]);
    if (!parsedQuiz) return;
    quiz.json = parsedQuiz.json;
    quiz.files = parsedQuiz.files;
    if (props.close) props.close();
    quizProgress.reset();
}
</script>

<template>
    <label style="height: fit-content">
        <input type="file" style="display:none" @input="openFile($event)" accept=".ocq">
        <SidebarItem>
            Open Quiz
            <template #icon>
                <img src="@/assets/upload.svg">
            </template>
        </SidebarItem>
    </label>
</template>