<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import RestartQuiz from "./sidebar/reset-quiz.vue";
import UploadQuiz from "./sidebar/upload-quiz.vue";
import RoundSkipper from "./sidebar/round-skipper.vue";

defineEmits<{
    (e: "resetQuiz"): void,
    (e: "nextRound"): void,
    (e: "prevRound"): void
}>();

</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <RestartQuiz :close="props.close"></RestartQuiz>
            <UploadQuiz :close="props.close"></UploadQuiz>
        </template>
        <template #alignBottom="props">
            <RoundSkipper @next-round="$emit('nextRound')" @prev-round="$emit('prevRound')"></RoundSkipper>
        </template>
    </SidebarTemplate>
</template>