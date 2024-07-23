<script setup lang="ts">
defineEmits<{
    (e: "clicked"): void,
}>();

const model = defineModel<boolean>();
</script>

<template>
    <div id="hamburger-button" :class="{'open': model}" @click="model = !model">
        <div class="bar top"></div>
        <div class="bar middle"></div>
        <div class="bar bottom"></div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/base';

#hamburger-button {
    display: block;
    position: fixed;
    width: 1.5em;
    height: 1.5em;
    margin: 1em;

    .bar {
        background-color: base.$text-color;
        position: absolute;
        width: 100%;
        height: 20%;
        transition: all 0.25s ease-in-out;
        transition-property: rotate, top, bottom;

        &.top {
            top: 0;
            transition-delay: 0.1s;
        }
        &.middle {
            top: 40%;
            transition-delay: 0.05s;
        }
        &.bottom {
            top: 80%;
        }
    }
}

#hamburger-button.open {
    .bar {
        top: 40%;
        &.top {
            rotate: 135deg;
            transition-delay: 0;
        }
        &.middle {
            rotate: 45deg;
        }
        &.bottom {
            rotate: 45deg;
            transition-delay: 0.1s;
        }
    }
}
</style>