<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import UploadQuiz from "./sidebar/upload-quiz.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="{close}">
            <UploadQuiz @close="close"></UploadQuiz>
        </template>
        <template #alignBottom>
        </template>
    </SidebarTemplate>
</template>