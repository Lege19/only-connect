<script setup lang="ts">
import InputBox from "./input-box.vue";
import GenericQuestion from "./generic-question.vue";
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import MoveItem from "./move-item.vue";
import { type Ref, triggerRef } from "vue";
import { RoundType, type Round, CardType, type Card, type Group } from "@/quizJson";
const model: Ref<Round|undefined> = defineModel();
const moveModel: Ref<Round[]|undefined> = defineModel("move");
defineProps<{
    del: () => void,
    index: number
}>();
function blankGroup(): Group {
    return {"name": "",
        "cards": [
            {type: CardType.Text, data: ""},
            {type: CardType.Text, data: ""},
            {type: CardType.Text, data: ""},
            {type: CardType.Text, data: ""}
        ]
    };
}
function addQuestion() {
    if (!model.value) return;
    switch (model.value.type) {
        case RoundType.Connection:
        case RoundType.Sequence:
            model.value.questions.push(blankGroup());
            break;
        case RoundType.Wall:
            model.value.questions.push(Array.from({length: 4}, blankGroup) as [Group, Group, Group, Group]);
            break;
        case RoundType.Vowel:
            model.value.questions.push({...{
                "name": "",
                "phrases": []
            }})
    }
}
</script>

<template v-if="model">
    <div class="round-container">
            <InputBox v-model="model!.name" class="round-name">
                <p class="round-type">{{ ["Connection", "Sequence", "Wall", "Vowel"][model!.type] }}</p>
                <MoveItem v-model="moveModel" :index="index"></MoveItem>
                <DeleteItem :del="del"></DeleteItem>
            </InputBox>
        <GenericQuestion v-for="i in model!.questions.keys()" 
        v-model="model!.questions[i]" 
        :del="() => {model!.questions.splice(i, 1)}"
        :round-type="model!.type"></GenericQuestion>
        <NewItem :func="addQuestion"></NewItem>
    </div>
</template>

<style scoped>
.round-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
}
.round-name {
    grid-column: 1/span 2;
}
.round-type {
    margin-right: 1em;
    color: gray;
}
</style>