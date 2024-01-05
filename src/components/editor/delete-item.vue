<script setup lang="ts">
import { type Ref } from "vue";
const props = defineProps<{
    del: () => void
}>()
</script>

<template>
    <div @click="del">
        <img src="@/assets/cross.svg">
    </div>
</template>

<style scoped>

</style>