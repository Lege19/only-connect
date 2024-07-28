<script setup lang="ts">
import { GroupType, type Group } from "@/quizTypes";
import { type Ref } from "vue";
import InputBox from "./input-box.vue";
import DeleteItem from "./delete-item.vue";
import ImageCard from "./editor-image-card.vue";
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
        <InputBox v-model="model.name" placeholder="Connection">
            <DeleteItem v-if="!undeletable" @delete="$emit('delete')"></DeleteItem>
        </InputBox>
        <ol>
            <li v-for="i in model.cards.keys()">
                <InputBox v-model="model.cards[i]" v-if="model.type === GroupType.Text" placeholder="Clue"></InputBox>
                <ImageCard v-model="model.cards[i]" v-else></ImageCard>
            </li>
        </ol>
    </div>
</template>