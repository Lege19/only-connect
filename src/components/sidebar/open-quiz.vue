<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

(async () => {
    quiz.open(await (await fetch("src/assets/quiz.ocq")).blob());
}) ();

const props = defineProps<{
    close?: Function
}>();

async function openFile(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    quiz.open(fileList[0]);
    if (props.close) props.close();
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