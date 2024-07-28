<script setup lang="ts">
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import { type VowelQuestion } from "@/quizTypes";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
const model: Ref<VowelQuestion|undefined> = defineModel();

defineEmits<{
    (e: "delete"): void
}>();
</script>

<template>
    <div v-if="model">
        <InputBox v-model="model.name" placeholder="Theme">
            <DeleteItem @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <ol>
            <li v-for="i in model.phrases.keys()">
                <InputBox v-model="model.phrases[i]" placeholder="Phrase">
                    <DeleteItem @delete="model.phrases.splice(i, 1)"></DeleteItem>
                </InputBox>
            </li>
            <NewItem @click="model.phrases.push('')"></NewItem>
        </ol>
    </div>
</template>