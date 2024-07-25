<script setup lang="ts">
defineEmits<{
    (e: "nextRound"): void,
    (e: "prevRound"): void
}>();
</script>

<template>
    <div id="round-skipper">
        <div id="back" @click="$emit('prevRound')">
            <img class="icon" src="@/assets/images/back.svg">
        </div>
        <div id="forward" @click="$emit('nextRound')">
            <img class="icon" style="float: right" src="@/assets/images/forward.svg">
        </div>
    </div>
</template>
<style scoped lang="scss">
@use '@/assets/styles/base';
#round-skipper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    * .icon {
        height: 1.5em;
        transition: transform 0.2s ease;
    }
    #back:hover > .icon {
        transform: translate(-0.5em, 0);
    }
    #forward:hover > .icon {
        transform: translate(0.5em, 0);
    }

    #forward, #back {
        padding: 1em;
        transition: background-color 0.25s;
        &:hover {
            background-color: base.$accent-color;
            .icon {
                transition: transform 0.3s cubic-bezier(0.3, 0.3, 0.5, 2);
            }
        }
    }
    
}
</style>