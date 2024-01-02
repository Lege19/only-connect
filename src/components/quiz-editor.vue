<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import { ref } from "vue";
import type { Group } from "@/quizJson";
import GenericRound from "./editor/generic-round.vue";
import OutlinedDiv from "./editor/outlined-div.vue";
import InputBox from "./editor/input-box.vue";
const input = ref("Hello");
</script>

<template>
    <div v-if="quiz.loaded" id="quiz-editor">
        <OutlinedDiv>
            <InputBox v-model="quiz.json!.name"></InputBox>
            <OutlinedDiv>
                <GenericRound v-for="round in quiz.json!.rounds" :round="round"></GenericRound>
            </OutlinedDiv>
        </OutlinedDiv>
    </div>
</template>

<style scoped>
#quiz-editor {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>