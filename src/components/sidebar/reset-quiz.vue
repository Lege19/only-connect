<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import useQuizProgress from "@/stores/quizProgress";
const quizProgress = useQuizProgress();

import { ref } from "vue";

const props = defineProps<{
    close?: Function
}>();

function restart() {
    if (props.close) props.close();
    quizProgress.reset();
}
</script>

<template>
    <SidebarItem @click="restart">
        Restart Quiz
        <template #icon>
            <img src="@/assets/reset.svg">
        </template>
    </SidebarItem>
</template>