<script setup lang="ts">
import InputBox from "./input-box.vue";
import WallQuestion from "./editor-wall-question.vue";
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import MoveItem from "./move-item.vue";

import { type Ref } from "vue";
import { type WallRound, blankWallQuestion } from "@/quizTypes";

const model: Ref<WallRound|undefined> = defineModel();
defineEmits<{
    (e: "delete"): void,
    (e: "moveUp"): void,
    (e: "moveDown"): void
}>();

function addQuestion() {
    if (!model.value) return;
    model.value.questions.push(blankWallQuestion());
}
</script>

<template>
    <div class="editor-round" v-if="model">
        <InputBox v-model="model.name" class="round-name" placeholder="Round Name">
            <p class="round-type">Wall</p>
            <MoveItem @move-up="$emit('moveUp')" @move-down="$emit('moveDown')"></MoveItem>
            <DeleteItem @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <WallQuestion v-for="i in model.questions.keys()" 
            v-model="model.questions[i]" 
            @delete="model.questions.splice(i, 1)"
        ></WallQuestion>
        <NewItem @click="addQuestion" v-if="model.questions.length < 6"></NewItem>
    </div>
</template>
