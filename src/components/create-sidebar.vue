<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import UploadQuiz from "./sidebar/upload-quiz.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <UploadQuiz></UploadQuiz>
        </template>
        <template #alignBottom="props">
        </template>
    </SidebarTemplate>
</template>