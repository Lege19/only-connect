<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import { saveAs } from "file-saver";
function download() {
    const jsonBlob = new Blob([JSON.stringify(quiz.json)]);
    const jsonFile = new File([jsonBlob], `${quiz.json?.name}.ocq`);
    saveAs(jsonFile);
}
</script>

<template>
    <SidebarItem @click="download">
        Download Quiz
        <template #icon>
            <img src="@/assets/download.svg">
        </template>
    </SidebarItem>
</template>