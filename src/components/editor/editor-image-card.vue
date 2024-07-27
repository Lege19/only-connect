<script setup lang="ts">
import { type Ref } from "vue";
import DeleteItem from "./delete-item.vue";

const model: Ref<undefined|string> = defineModel();

async function openImage(event: Event) {
    if (event.target === null) return;
    const target = (event.target as HTMLInputElement);
    if (!target.files || target.files.length === 0) return;
    if (model.value === undefined) return;
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    const result = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            if (typeof reader.result !== "string") {
                const error = "Expected string got: " + reader.result;
                console.error(error);
                reject(error);
            } else {
                resolve(reader.result);
            }
        };
        reader.onerror = (e) => {
            console.error(e);
            reject(e);
        }
    });
    model.value = result;
}
</script>

<template>
    <div v-if="model !== undefined" class="editor-image-card">
        <div v-if="model !== ''" class="image-container">
            <div><img :src="model"></div>
            <DeleteItem @delete="model=''"></DeleteItem>
        </div>
        <label v-else>
            <input 
                type="file" 
                accept=".png, image/png, .jpg, .jpeg, image/jpeg, .svg, image/svg+xml, .webp, image/webp, .gif, image/gif" 
                @input="openImage($event)"
            >
        </label>
        
    </div>
</template>

<style scoped lang="scss">
.editor-image-card {
    display: flow-root;
    aspect-ratio: 16/9;
    overflow: hidden;
    .image-container {
        display: flex;
        align-items: center;
    }
    img {
        object-fit:contain;
        max-width: 100%;
    }
}
</style>