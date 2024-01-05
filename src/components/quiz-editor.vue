<script setup lang="ts">
import useQuiz from "@/stores/quiz";
const quiz = useQuiz();
import GenericRound from "./editor/generic-round.vue";
import InputBox from "./editor/input-box.vue";
</script>

<template v-if="quiz.loaded">
    <div id="editor-container">
        <InputBox v-model="quiz.json!.name"></InputBox>
        <ol style="width: 60%">
            <li v-for="i in quiz.json!.rounds.keys()" style="margin-bottom: 1em">
                <GenericRound v-model="quiz.json!.rounds[i]" :del="() => {quiz.json!.rounds.splice(i, 1)}"></GenericRound>
            </li>
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
</style>