<script setup lang="ts">
import HomeButton from "./home-button.vue";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();


</script>

<template>
    <div class="icon-list">
        <HomeButton></HomeButton>
        <img 
            tag="img" 
            src="@/assets/images/play.svg" 
            class="icon"
            @click="quiz.saveCurrent(); router.push('/play/' + route.params.id)"
        ></img>
        
        
    </div>
</template>