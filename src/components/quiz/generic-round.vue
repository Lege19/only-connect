<script setup lang="ts">
import VowelRound from "./vowel-round.vue";
import NonVowelRound from "./non-vowel-round.vue";

import type { Round } from "@/quizTypes";
import { RoundType } from "@/quizTypes";

defineProps<{
    round: Round
}>();
defineEmits<{
    (e: "nextRound"): void,
    (e: "prevRound"): void
}>();
</script>

<template>
    <VowelRound 
        v-if="round.type === RoundType.Vowel" 
        :round="round" @next-round="$emit('nextRound')" 
        @prev-round="$emit('prevRound')"
    ></VowelRound>
    <NonVowelRound v-else :round="round" @next-round="$emit('nextRound')"></NonVowelRound>
</template>