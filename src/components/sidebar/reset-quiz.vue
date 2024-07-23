<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

const props = defineProps<{
    close?: Function
}>();
const emit = defineEmits<{
    (e: "resetQuiz"): void
}>();
function restart() {
    if (props.close) props.close();
    emit("resetQuiz");
}
</script>

<template>
    <SidebarItem @click="restart">
        Restart Quiz
        <template #icon>
            <img src="@/assets/images/reset.svg">
        </template>
    </SidebarItem>
</template>