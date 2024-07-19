<script setup lang="ts">
import useQuizProgress from '@/stores/quizProgress';
const quizProgress = useQuizProgress();
</script>

<template>
    <div id="skip-container">
        <div id="back-container" @click="quizProgress.prevRound">
            <img class="skip-icon" src="@/assets/images/back.svg">
        </div>
        <div id="forward-container" @click="quizProgress.nextRound">
            <img class="skip-icon" style="float: right" src="@/assets/images/forward.svg">
        </div>
    </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/base';
.skip-icon {
    height: 1.5em;
    transition: transform 0.2s ease;
}
#back-container:hover > .skip-icon {
    transform: translate(-0.5em, 0);
    transition: transform 0.3s cubic-bezier(0.3, 0.3, 0.5, 2);
}
#forward-container:hover > .skip-icon {
    transform: translate(0.5em, 0);
    transition: transform 0.3s cubic-bezier(0.3, 0.3, 0.5, 2);
}
#forward-container, #back-container {
    padding: 1em;
    transition: background-color 0.2s;
}
#forward-container:hover, #back-container:hover {
    background-color: base.$accent-color;
}
#skip-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>