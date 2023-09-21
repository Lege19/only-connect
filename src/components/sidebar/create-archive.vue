<script setup lang="ts">
import SidebarItem from "./sidebar-item.vue";

import { saveAs } from "file-saver";

import { pack } from "@/flatArchive";

function archiveFiles(event: Event) {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList) return;
    const archive: File|undefined = pack(Array.from(fileList));
    if (!archive) {
        console.error("An error occured packing the archive");
        return
    }
    saveAs(archive, "quiz.ocq");
}
</script>

<template>
    <label>
        <input type="file" style="display:none" @input="archiveFiles($event)" multiple>
        <SidebarItem>
            Create .ocq Archive
        </SidebarItem>
    </label>
</template>