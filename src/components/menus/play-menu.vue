<script setup lang="ts">
import HomeButton from "./home-button.vue";
defineEmits<{
    (e: "resetQuiz"): void,
    (e: "nextRound"): void,
    (e: "prevRound"): void
}>();
</script>

<template>
    <div class="icon-list">
        <HomeButton></HomeButton>
        <img src="@/assets/images/reset.svg" class="icon" @click="$emit('resetQuiz')">
        <img src="@/assets/images/arrow.svg" class="icon" @click="$emit('nextRound')">
        <img
            src="@/assets/images/arrow.svg"
            style="transform: scaleX(-1)"
            class="icon"
            @click="$emit('prevRound')"
        >
    </div>
</template>