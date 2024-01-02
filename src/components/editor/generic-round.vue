<script setup lang="ts">
import type { Round } from '@/quizJson';
import OutlinedDiv from "./outlined-div.vue";
import GenericQuestion from "./generic-question.vue";
import InputBox from "./input-box.vue";
defineProps<{
    round: Round
}>();
</script>

<template>
    <InputBox v-model="round.name"></InputBox>
    <OutlinedDiv>
        <GenericQuestion v-for="question in round.questions" :data="question" :round-type="round.type"></GenericQuestion>
    </OutlinedDiv>
</template>