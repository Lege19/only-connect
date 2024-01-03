<script setup lang="ts">
import { type Group } from "@/quizJson";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
const model: Ref<Group|undefined> = defineModel();
</script>

<template v-if="model">
    <InputBox v-model="model!.name"></InputBox>
    <ol>
        <li v-for="i in model!.cards.keys()">
            <InputBox v-model="model!.cards[i].data"></InputBox>
        </li>
    </ol>
</template>