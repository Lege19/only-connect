<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

const emit = defineEmits<{
    (e: "close"): void
}>();

async function openFile(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    quiz.openFile(fileList[0]);
    emit("close");
}
</script>

<template>
    <label style="height: fit-content">
        <input type="file" style="display:none" @input="openFile($event)" accept=".ocq">
        <SidebarItem>
            Upload Quiz
            <template #icon>
                <img src="@/assets/images/upload.svg">
            </template>
        </SidebarItem>
    </label>
</template>