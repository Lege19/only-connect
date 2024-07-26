<script setup lang="ts">
import { router } from "@/router/index";

</script>

<template>
    <img id="home" src="@/assets/images/home.svg" @click="router.push('/')">
</template>