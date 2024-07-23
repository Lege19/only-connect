<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";
</script>

<template>
    <SidebarItem>
        Restart Quiz
        <template #icon>
            <img src="@/assets/images/reset.svg">
        </template>
    </SidebarItem>
</template>