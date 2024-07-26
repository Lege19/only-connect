<script setup lang="ts">
import { saveQuiz } from "@/saveManager";
import { parse } from "@/quizParser";

async function openFile(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    const quiz = await parse(fileList[0]);
    if (!quiz) return;
    await saveQuiz(quiz);
}
</script>

<template>
    <label style="height: fit-content" class="button">
        <input type="file" style="display:none" @input="openFile($event)" accept=".json">
        <p>
            Upload Quiz
            <img src="@/assets/images/upload.svg">
        </p> 
    </label>
</template>