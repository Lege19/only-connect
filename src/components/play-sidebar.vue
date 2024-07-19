<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import RestartQuiz from "./sidebar/reset-quiz.vue";
import UploadQuiz from "./sidebar/upload-quiz.vue";
import RoundSkipper from "./sidebar/round-skipper.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <RestartQuiz :close="props.close"></RestartQuiz>
            <UploadQuiz :close="props.close"></UploadQuiz>
        </template>
        <template #alignBottom="props">
            <RoundSkipper></RoundSkipper>
        </template>
    </SidebarTemplate>
</template>