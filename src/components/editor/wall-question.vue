<script setup lang="ts">
import EditorGroup from "./editor-group.vue";
import DeleteItem from "./delete-item.vue";
import { type Ref } from "vue";
import { type Group } from "@/quizJson";
const model: Ref<Group[]|undefined> = defineModel();
defineProps<{
    del: () => void
}>();
</script>

<template v-if="model">
    <div class="outer">
        <div class="inner">
            <EditorGroup v-for="i in model!.keys()" v-model="model![i]"></EditorGroup>
        </div>
        <DeleteItem :del="del"></DeleteItem>
    </div>
</template>

<style scoped>
.inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    border: 4px var(--ui-color) solid;
    border-radius: 10px;
}
.outer {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    grid-column: 1/span 2;
}
</style>