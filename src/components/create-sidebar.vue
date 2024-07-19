<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import UploadQuiz from "./sidebar/upload-quiz.vue";
import ExtractArchive from "./sidebar/extract-archive.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <UploadQuiz></UploadQuiz>
        </template>
        <template #alignBottom="props">
            <ExtractArchive></ExtractArchive>
        </template>
    </SidebarTemplate>
</template>