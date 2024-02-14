<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import OpenQuiz from "./sidebar/open-quiz.vue";
import DownloadQuiz from "./sidebar/download-quiz.vue";
import ExtractArchive from "./sidebar/extract-archive.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <DownloadQuiz></DownloadQuiz>
            <OpenQuiz></OpenQuiz>
        </template>
        <template #alignBottom="props">
            <ExtractArchive></ExtractArchive>
        </template>
    </SidebarTemplate>
</template>