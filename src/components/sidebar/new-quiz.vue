<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import { router } from "@/router/index";
</script>

<template>
    <SidebarItem @click="router.push('/create')">
        New Quiz
        <template #icon>
            <img src="@/assets/images/add.svg">
        </template>
    </SidebarItem>
</template>