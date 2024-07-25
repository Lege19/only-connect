<script setup lang="ts">
import HamburgerButton from './hamburger-button.vue';
import { router } from "@/router/index";

import { ref, type Ref } from "vue";

import useQuiz from "@/stores/quiz";
const quiz = useQuiz();

const showSidebar = ref(false);

const clickScope: Ref<Element|null> = ref(null)!;

window.addEventListener("click", (e) => {
    if (!clickScope.value) return;
    if (!clickScope.value.contains(e.target! as Node)) {
        showSidebar.value = false;
    }
});

function home() {
    quiz.close();
    router.push('/');
}
</script>

<template>
    <div ref="clickScope">
        <div :class="{'open': showSidebar}" class="sidebar">
            <div class="inner">
                <img src="@/assets/images/home.svg" class="home" @click="home">
                <div>
                    <slot name="alignTop" :close="() => showSidebar = false"></slot>
                </div>
                <div></div>
                <div>
                <slot name="alignBottom"></slot>
                </div>
            </div>
        </div>
        <HamburgerButton v-model="showSidebar"></HamburgerButton>
    </div>
</template>
