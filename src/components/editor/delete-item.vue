<script setup lang="ts">
import AreYouSure from '@/components/are-you-sure.vue';
import { ref, type Ref } from "vue";

const emit = defineEmits<{
    (e: "delete"): void
}>();
const areYouSure: Ref<null|typeof AreYouSure> = ref(null);

async function clicked() {
    if (!areYouSure.value) return;
    if (await areYouSure.value.test()) {
        emit("delete");
    }
}
</script>

<template>
    <AreYouSure ref="areYouSure"></AreYouSure>
    <img @click.exact="clicked" @click.shift.exact="$emit('delete')" src="@/assets/images/cross.svg">
</template>