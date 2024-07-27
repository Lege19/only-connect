<script setup lang=ts>
import InputBox from "./input-box.vue";
import VowelQuestion from "./editor-vowel-question.vue";
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import MoveItem from "./move-item.vue";

import { type Ref } from "vue";
import { type VowelRound, blankVowelQuestion } from "@/quizTypes";

const model: Ref<VowelRound|undefined> = defineModel();

defineEmits<{
    (e: "delete"): void,
    (e: "moveUp"): void,
    (e: "moveDown"): void
}>();


function addQuestion() {
    if (!model.value) return;
    model.value.questions.push(blankVowelQuestion())
}
</script>

<template>
    <div class="editor-round" v-if="model">
        <InputBox v-model="model.name" class="round-name" placeholder="Round Name">
            <p class="round-type">Vowel</p>
            <MoveItem @move-up="$emit('moveUp')" @move-down="$emit('moveDown')"></MoveItem>
            <DeleteItem @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <VowelQuestion v-for="i in model.questions.keys()" 
            v-model="model.questions[i]" 
            @delete="model.questions.splice(i, 1)"
        >
        </VowelQuestion>
        <NewItem @click="addQuestion"></NewItem>
    </div>
</template>
