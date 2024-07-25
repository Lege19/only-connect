<script setup lang="ts">
import { ref, type Ref } from "vue";

const emit = defineEmits<{
    (e: "yes"): void,
    (e: "no"): void
}>();

const show: Ref<boolean> = ref(false);

let onNo = () => {};
let onYes = () => {};
function test(): Promise<boolean> {
    show.value = true;
    return new Promise((resolve, reject) => {
        onNo = () => resolve(false);
        onYes = () => resolve(true);
    });
}

function no() {
    onNo();
    show.value = false;
    emit("no");
}
function yes() {
    onYes();
    show.value = false;
    emit("yes");
}
defineExpose({test});
</script>

<template>
    <div v-if="show" class="are-you-sure" @click="no">
        <div class="window" @click.stop>
            <h1>Are you sure?</h1>
            <div id="spacer"></div>
            <div class="options">
                <div id="yes" @click.stop="yes">
                    <h2>Yes</h2>
                </div>
                <div id="no" @click.stop="no">
                    <h2>No</h2>
                </div>
            </div>
        </div>
    </div>
</template>