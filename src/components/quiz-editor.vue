<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import GenericRound from "./editor/generic-round.vue";
import InputBox from "./editor/input-box.vue";
import { RoundType } from "@/quizJson";
</script>

<template v-if="quiz.loaded">
    <div id="editor-container">
        <InputBox v-model="quiz.json!.name"></InputBox>
        <ol style="width: 60%">
            <li v-for="i in quiz.json!.rounds.keys()" style="margin-bottom: 1em">
                <GenericRound v-model="quiz.json!.rounds[i]" :del="() => {quiz.json!.rounds.splice(i, 1)}"></GenericRound>
            </li>
            <div id="new-round-container">
                <div class="new-round-button" @click="() => {quiz.json!.rounds.push({
                    'name': '',
                    'type': RoundType.Connection,
                    'questions': []
                    })}">Connection</div>
                <div class="new-round-button" @click="() => {quiz.json!.rounds.push({
                    'name': '',
                    'type': RoundType.Sequence,
                    'questions': []
                    })}">Sequence</div>
                <div class="new-round-button" @click="() => {quiz.json!.rounds.push({
                    'name': '',
                    'type': RoundType.Wall,
                    'questions': []
                    })}">Wall</div>
                <div class="new-round-button" @click="() => {quiz.json!.rounds.push({
                    'name': '',
                    'type': RoundType.Vowel,
                    'questions': []
                    })}">Vowel</div>
            </div>
        </ol>
    </div>
</template>

<style scoped>
#editor-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
#new-round-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
}
.new-round-button {
    border: 3px gray dashed;
    border-radius: 10px;
    height: 2em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}
</style>