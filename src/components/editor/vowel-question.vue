<script setup lang="ts">
import DeleteItem from "./delete-item.vue";
import NewItem from "./new-item.vue";
import { type VowelQuestion } from "@/quizTypes";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
const model: Ref<VowelQuestion|undefined> = defineModel();
defineProps<{
    del: () => void
}>();
</script>

<template v-if="model">
    <div>
        <InputBox v-model="model!.name">
            <DeleteItem :del="del"></DeleteItem>
        </InputBox>
        <ol>
            <li v-for="i in model!.phrases.keys()">
                <InputBox v-model="model!.phrases[i]">
                    <DeleteItem :del="() => {model!.phrases.splice(i, 1)}"></DeleteItem>
                </InputBox>
            </li>
            <NewItem :func="() => {model!.phrases.push('')}"></NewItem>
        </ol>
    </div>
</template>