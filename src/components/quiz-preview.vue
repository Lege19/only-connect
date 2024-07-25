<script setup lang="ts">
import type { Quiz } from "@/quizTypes";
import { ref, type Ref } from "vue";

defineProps<{
    quiz: Quiz
}>();
defineEmits<{
    (e: "play"): void,
    (e: "edit"): void,
    (e: "delete"): void,
    (e: "download"): void
}>();

function isSameDay(date1: Date|number, date2: Date|number): boolean {
    return new Date(date1).setHours(0,0,0,0) === new Date(date2).setHours(0,0,0,0);
}
function formatDate(date: Date): string {
    const currentTime = Date.now();
    const today = new Date();
    const yesterday = new Date().setDate(today.getDate() - 1);
    const localTimeOptions: any = {
        hour: "2-digit",
        minute: "2-digit"
    };
    if (isSameDay(date, today)) {
        return "Today " + date.toLocaleTimeString([], localTimeOptions);
    } else if (isSameDay(date, yesterday)) {
        return "Yesterday " + date.toLocaleTimeString([], localTimeOptions);
    }
    return date.toLocaleString();
}
</script>

<template>
    <tr @dblclick.prevent="$emit('edit')">
        <td>{{ quiz.name }}</td>
        <td>{{ formatDate(quiz.edited) }}</td>
        <td>{{ formatDate(quiz.created) }}</td>
        <td class="icons">
            <img src="@/assets/images/play.svg" @click.stop="$emit('play')">
            <img src="@/assets/images/download.svg" @click.stop="$emit('download')">
            <img src="@/assets/images/cross.svg" @click.stop="$emit('delete')">
        </td>
    </tr>
</template>
