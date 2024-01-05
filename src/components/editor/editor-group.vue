<script setup lang="ts">
import { type Group } from "@/quizJson";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
import DeleteItem from "./delete-item.vue";
const model: Ref<Group|undefined> = defineModel();
defineProps<{
    del?:() => void
}>();
</script>

<template v-if="model">
    <div>
        <InputBox v-model="model!.name">
            <DeleteItem v-if="del" :del="del"></DeleteItem>
        </InputBox>
        <ol>
            <li v-for="i in model!.cards.keys()">
                <InputBox v-model="model!.cards[i].data"></InputBox>
            </li>
        </ol>
    </div>
</template>