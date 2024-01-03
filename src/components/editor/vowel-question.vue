<script setup lang="ts">
import { type VowelQuestion } from "@/quizJson";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
const model: Ref<VowelQuestion|undefined> = defineModel();
</script>

<template v-if="model">
    <div>
        <InputBox v-model="model!.name"></InputBox>
        <ol>
            <li v-for="i in model!.phrases.keys()">
                <InputBox v-model="model!.phrases[i]"></InputBox>
            </li>
        </ol>
    </div>
</template>