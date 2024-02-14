<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import { saveAs } from "file-saver";

console.log("TODO: extracting files from an archive");
</script>

<template>
    <label>
        <input type="file" style="display:none" @input="" accept=".ocq">
        <SidebarItem>
            Extract .ocq Archive
        </SidebarItem>
    </label>
</template>