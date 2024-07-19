<script setup lang="ts">
const emits = defineEmits(["change"])
</script>

<template>
    <label>
        <input type="checkbox" @change="$emit('change', ($event.target as HTMLInputElement).checked)">
        <div id="hamburgerButton"></div>
    </label>
</template>

<style scoped lang="scss">
@use '@/assets/styles/base';

label {
    display: block;
    position: fixed;
    width: 1.5em;
    height: 1.5em;
    margin: 1em;
}

input {
    display: none;
}

#hamburgerButton, #hamburgerButton::before, #hamburgerButton::after {
    background-color: base.$text-color;
    position: absolute;
    width: 100%;
    transition: all 0.25s ease-in-out;
    transition-property: transform, top, bottom;
}


#hamburgerButton {
    top: 40%;
    height: 20%;
}
#hamburgerButton::before {
    content: "";
    bottom: 200%;
}
#hamburgerButton::after {
    content: "";
    top: 200%;
}
#hamburgerButton::before, #hamburgerButton::after {
    height: 100%;
}

input:checked + #hamburgerButton {
    transform: rotate(45deg);
}
input:checked + #hamburgerButton::after {
    top: 0;
}
input:checked + #hamburgerButton::before {
    bottom: 0;
    transform: rotate(-90deg);
}
</style>