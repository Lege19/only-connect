<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import { saveAs } from "file-saver";

import { unpack } from "@/flatArchive";


async function openArchive(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    const files = await unpack(fileList[0]);
    for (const file of files) {
        saveAs(file, file.name);
    }
    alert("I just dumped like " + files.length + "files into your downloads folder :)");
}
</script>

<template>
    <label>
        <input type="file" style="display:none" @input="openArchive($event)" accept=".ocq">
        <SidebarItem>
            Extract .ocq Archive
        </SidebarItem>
    </label>
</template>