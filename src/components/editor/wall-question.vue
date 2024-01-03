<script setup lang="ts">
import EditorGroup from "./editor-group.vue";
import { type Ref } from "vue";
import { type Group } from "@/quizJson";
const model: Ref<Group[]|undefined> = defineModel();
</script>

<template v-if="model">
    <div class="wall-container">
        <EditorGroup v-for="i in model!.keys()" v-model="model![i]"></EditorGroup>
    </div>
</template>

<style scoped>
.wall-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    grid-column: 1/span 2
}
</style>