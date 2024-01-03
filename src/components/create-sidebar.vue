<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import OpenQuiz from "./sidebar/open-quiz.vue";
import CreateArchive from "./sidebar/create-archive.vue";
import ExtractArchive from "./sidebar/extract-archive.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <OpenQuiz></OpenQuiz>
        </template>
        <template #alignBottom="props">
            <CreateArchive></CreateArchive>
            <ExtractArchive></ExtractArchive>
        </template>
    </SidebarTemplate>
</template>