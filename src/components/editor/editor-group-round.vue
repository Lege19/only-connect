<script setup lang="ts">
import InputBox from "./input-box.vue";
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import MoveItem from "./move-item.vue";
import Group from "./editor-group.vue";

import { type Ref } from "vue";
import { type ConnectionRound, type SequenceRound, blankTextGroup, blankImageGroup, RoundType } from "@/quizTypes";

const model: Ref<ConnectionRound|SequenceRound|undefined> = defineModel();

defineProps<{
    index: number
}>();
defineEmits<{
    (e: "delete"): void,
    (e: "moveUp"): void,
    (e: "moveDown"): void
}>();


function addTextQuestion() {
    if (!model.value) return;
    model.value.questions.push(blankTextGroup());
}
function addImageQuestion() {
    if (!model.value) return;
    model.value.questions.push(blankImageGroup());
}
</script>

<template>
    <div class="editor-round" v-if="model">
        <InputBox v-model="model.name" class="round-name" placeholder="Round Name">
            <p class="round-type">{{ model.type === RoundType.Connection ? "Connection" : "Sequence" }}</p>
            <MoveItem @move-up="$emit('moveUp')" @move-down="$emit('moveDown')"></MoveItem>
            <DeleteItem @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <Group v-for="i in model.questions.keys()" 
            v-model="model.questions[i]" 
            @delete="model.questions.splice(i, 1)"
        ></Group>
        <div class="add-question" v-if="model.questions.length < 6">
            <div class="dashed-outline" @click="addTextQuestion">
                <img src="@/assets/images/add.svg">
                <img src="@/assets/images/text.svg">
            </div>
            <div class="dashed-outline" @click="addImageQuestion">
                <img src="@/assets/images/add.svg">
                <img src="@/assets/images/image.svg">
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.add-question {
    display: flex;
    gap: 1em;
    & > * {
        flex-grow: 1;

    }
}
</style>