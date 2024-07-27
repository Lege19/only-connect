<script setup lang="ts">
import { router } from "@/router/index";
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
</script>

<template>
    <img id="home" src="@/assets/images/home.svg" @click="quiz.close(); router.push('/')">
</template>