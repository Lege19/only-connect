<script setup lang="ts">
import useQuiz from "@/stores/quiz";
let quiz = useQuiz();

import { computed } from "vue";

const props = defineProps({
    data: String
});

const getImage = computed(() => {
    if (!props.data) {
        return "No file path";
    }
    if (!quiz.loaded) {
        return "Quiz not loaded";
    }
    return (quiz.files??{})[props.data] ?? "File not found";
});
</script>

<template>
    <div class="card" style="background-color:transparent">
        <img :src="getImage">
    </div>
</template>
<style scoped>
img {
    border-radius: 2vh;
    width: 100%;
    height: auto;
}
</style>