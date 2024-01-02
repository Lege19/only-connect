<script setup lang="ts">
import type { Group } from "@/quizJson";
import OutlinedDiv from "./outlined-div.vue";
import InputBox from "./input-box.vue";
defineProps<{
    data: Group
}>()
</script>

<template>
    <label>
        Group Caption:<InputBox v-model="data.name"></InputBox>
    </label>
    <OutlinedDiv>
        <InputBox v-for="card in data.cards" v-model="card.data"></InputBox>
    </OutlinedDiv>
</template>