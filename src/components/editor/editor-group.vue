<script setup lang="ts">
import { type Group } from "@/quizTypes";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
import DeleteItem from "./delete-item.vue";
const model: Ref<Group|undefined> = defineModel();

defineProps<{
    undeletable?: boolean
}>();
defineEmits<{
    (e: "delete"): void
}>();
</script>

<template>
    <div v-if="model">
        <InputBox v-model="model.name" placeholder="Group Caption">
            <DeleteItem v-if="!undeletable" @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <ol>
            <li v-for="i in model.cards.keys()">
                <InputBox v-model="model.cards[i].data"></InputBox>
            </li>
        </ol>
    </div>
</template>