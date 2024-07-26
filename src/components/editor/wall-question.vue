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
    <div v-if="model" class="outer">
        <div class="inner">
            <EditorGroup v-for="i in model.keys()" v-model="model[i]" undeletable></EditorGroup>
        </div>
        <DeleteItem @delete="$emit('delete')"></DeleteItem>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/base';
.inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    border: 4px base.$ui-background-color solid;
    border-radius: 10px;
    margin-right: 0.5em;
}

.outer {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    grid-column: 1/span 2;
}
</style>