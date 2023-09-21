<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import RestartQuiz from "./sidebar/reset-quiz.vue";
import OpenQuiz from "./sidebar/open-quiz.vue";

</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <RestartQuiz :close="props.close"></RestartQuiz>
            <OpenQuiz :close="props.close"></OpenQuiz>
        </template>
    </SidebarTemplate>
</template>