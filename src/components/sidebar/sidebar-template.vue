<script setup lang="ts">
import HamburgerButton from './hamburger-button.vue';
import SaveManager from '@/components/save-manager.vue';
import { router } from "@/router/index";

import { ref, type Ref } from "vue";
const showSidebar = ref(false);

const clickScope: Ref<Element|null> = ref(null)!;

window.addEventListener("click", (e) => {
    if (!clickScope.value) return;
    if (!clickScope.value.contains(e.target! as Node)) {
        close();
    }
});

function change(to: boolean) {
    showSidebar.value = to;
}
function close() {
    if (!showSidebar.value) return;
    document.getElementById("hamburgerButton")?.click();
}
</script>

<template>
    <div ref="clickScope">
        <div :class="{'open': showSidebar}" class="sidebar">
            <Suspense>
                <SaveManager></SaveManager>
            </Suspense>
            <div class="inner">
                <img src="@/assets/images/home.svg" class="home" @click="router.push('/')">
                <div>
                    <slot name="alignTop" :close="close"></slot>
                </div>
                <div></div>
                <div>
                <slot name="alignBottom"></slot>
                </div>
            </div>
        </div>
        <HamburgerButton @change="change($event)"></HamburgerButton>
    </div> 
</template>
