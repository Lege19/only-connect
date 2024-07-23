<template>
    <div>
        <h1><slot></slot></h1>
    </div>
</template>

<style scoped>
div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>