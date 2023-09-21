<script setup lang="ts">
import HamburgerButton from './hamburger-button.vue';
import { router } from "@/router/index";

import { ref } from "vue";
const showSidebar = ref(false);
function change(to: boolean) {
    showSidebar.value = to;
}
function close() {
    if (!showSidebar) return;
    document.getElementById("hamburgerButton")?.click();
}
</script>

<template>
    <div :class="{'sidebar-open': showSidebar}" class="sidebar-outer">
        <div class="sidebar-inner" @closeSidebar="change(false)">
            <img src="@/assets/home.svg" class="home" @click="router.push('/')">
            <slot name="alignTop" :close="close">
                <div></div>
            </slot>
            <div></div>
            <slot name="alignBottom">
                <div></div>
            </slot>
        </div>
    </div>
    <HamburgerButton @change="change($event)"></HamburgerButton>
</template>

<style>
.sidebar-outer {
    height: 100vh;
    overflow: hidden;
    position: fixed;
    transition: width 0.25s;
    width: 0;
}
.sidebar-inner {
    background-color: var(--ui-color);
    height: calc(100vh - 3.5em);
    padding-top: 3.5em;
    position: absolute;
    width: 20vw;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
}
.sidebar-open {
    width: 20vw;
}
.home {
    position: absolute;
    right: 0;
    width: 1.5em;
    height: 1.5em;
    margin: 1em;
    transition: transform 0.2s;
}
.home:hover {
    transform: scale(1.2);
}
</style>