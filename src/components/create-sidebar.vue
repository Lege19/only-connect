<script setup lang="ts">
import SidebarTemplate from "./sidebar/sidebar-template.vue";
import SidebarItem from "./sidebar/sidebar-item.vue";
import CreateArchive from "./sidebar/create-archive.vue";
import ExtractArchive from "./sidebar/extract-archive.vue";
</script>

<template>
    <SidebarTemplate>
        <template #alignTop="props">
            <CreateArchive></CreateArchive>
            <ExtractArchive></ExtractArchive>
        </template>
    </SidebarTemplate>
</template>