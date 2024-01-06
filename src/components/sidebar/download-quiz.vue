<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import { pack } from "@/flatArchive";
import { saveAs } from "file-saver";
function download() {
    const jsonBlob = new Blob([JSON.stringify(quiz.json)]);
    const jsonFile = new File([jsonBlob], "quiz.json");
    let files = [];
    for (const key in quiz.files) {
        const blob = new Blob([quiz.files[key]]);
        const file = new File([blob], key);
        files.push(file);
    }
    saveAs(pack([jsonFile, ... files]), quiz.json!.name + ".ocq");
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