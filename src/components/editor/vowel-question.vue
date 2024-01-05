<script setup lang="ts">
import DeleteItem from "./delete-item.vue";
import { type VowelQuestion } from "@/quizJson";
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
                <InputBox v-model="model!.phrases[i]"></InputBox>
            </li>
        </ol>
    </div>
</template>