<script setup lang="ts">
import EditorRound from "./editor/editor-generic-round.vue";
import InputBox from "./editor/input-box.vue";
import DynamicPageTitle from "./dynamic-page-title.vue";

import { RoundType } from "@/quizTypes";
import { watch, type Ref } from 'vue';
import { saveQuiz } from '@/saveManager';
import { type Quiz } from "@/quizTypes";

const quiz: Ref<Quiz|undefined> = defineModel();

// counter increases when quiz changes to keep track of when to autosave
let changes = 0;

watch(quiz, (curr, prev) => {
    changes++
    if (changes > 10) {
        changes = 0;
        autosave();
    }
});
function autosave() {
    if (!quiz.value) return;
    quiz.value.edited = new Date();
    saveQuiz(quiz.value);
}
function addRound(type: RoundType) {
    if (!quiz.value) return;
    quiz.value.rounds.push({
        name: "",
        type: type,
        questions: []
    });
}
function moveUp(index: number) {
    if (!quiz.value) return;
    swapConseutive(quiz.value.rounds, index - 1);
}
function moveDown(index: number) {
    if (!quiz.value) return;
    swapConseutive(quiz.value.rounds, index)
}
function swapConseutive(array: unknown[], index: number) {
    if (index < 0) return;
    if (index >= array.length - 1) return;
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
}
</script>

<template>
    <DynamicPageTitle :title="quiz?.name + ' - Editing'"></DynamicPageTitle>
    <div id="editor-container" v-if="quiz">
        <InputBox v-model="quiz.name" placeholder="Quiz Name"></InputBox>
        <ol>
            <li v-for="i in quiz.rounds.keys()">
                <EditorRound 
                    v-model="quiz.rounds[i]" 
                    v-model:move="quiz.rounds" 
                    @delete="quiz.rounds.splice(i, 1)"
                    @move-up="moveUp(i)"
                    @move-down="moveDown(i)"
                    :index="i"
                ></EditorRound>
            </li>
            <div id="new-round-container">
                <div class="button dashed-outline" @click="addRound(RoundType.Connection)">Connection</div>
                <div class="button dashed-outline" @click="addRound(RoundType.Sequence)">Sequence</div>
                <div class="button dashed-outline" @click="addRound(RoundType.Wall)">Wall</div>
                <div class="button dashed-outline" @click="addRound(RoundType.Vowel)">Vowel</div>
            </div>
        </ol>
    </div>
</template>
./editor/editor-generic-round.vue