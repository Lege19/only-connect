<script setup lang="ts">
import EditorGroup from "./editor-group.vue";
import DeleteItem from "./delete-item.vue";
import { type Ref } from "vue";
import { type Group } from "@/quizTypes";
const model: Ref<Group[]|undefined> = defineModel();

defineEmits<{
    (e: "delete"): void
}>();
</script>

<template>
    <div v-if="model" class="wall-container">
        <div class="inner">
            <EditorGroup v-for="i in model.keys()" v-model="model[i]" undeletable></EditorGroup>
        </div>
        <DeleteItem @delete="$emit('delete')"></DeleteItem>
    </div>
</template>
