<script setup lang="ts">
import InputBox from "./input-box.vue";
import GenericQuestion from "./generic-question.vue";
import { type Ref } from "vue";
import { type Round } from "@/quizJson";
const model: Ref<Round|undefined> = defineModel();
</script>

<template v-if="model">
    <div>
        <InputBox v-model="model!.name"></InputBox>
        <div class="question-container">
            <GenericQuestion v-for="i in model!.questions.keys()" 
            v-model="model!.questions[i]" 
            :round-type="model!.type"></GenericQuestion>
        </div>
    </div>
</template>

<style scoped>
.question-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
}
</style>