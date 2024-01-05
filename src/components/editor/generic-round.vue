<script setup lang="ts">
import InputBox from "./input-box.vue";
import GenericQuestion from "./generic-question.vue";
import DeleteItem from "./delete-item.vue";
import { type Ref } from "vue";
import { type Round } from "@/quizJson";
const model: Ref<Round|undefined> = defineModel();
defineProps<{
    del: () => void
}>();
</script>

<template v-if="model">
    <div class="round-container">
            <InputBox v-model="model!.name" class="round-name">
                <DeleteItem :del="del"></DeleteItem>
            </InputBox>
        <GenericQuestion v-for="i in model!.questions.keys()" 
        v-model="model!.questions[i]" 
        :del="() => {model!.questions.splice(i, 1)}"
        :round-type="model!.type"></GenericQuestion>
        
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
</style>