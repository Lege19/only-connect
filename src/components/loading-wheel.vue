<template>
    <div class="loading-wheel">
        <img src="@/assets/images/only-connect-wheel-outer.svg" class="outer">
        <img src="@/assets/images/only-connect-wheel-inner.svg" class="inner">
        <img src="@/assets/images/only-connect-wheel-c.svg" class="c">
    </div>
</template>

<style scoped lang="scss">
.loading-wheel {
    $size: 10em;
    $speed-scale: 0.5;
    $depth-scale: 20;
    width: $size;
    height: $size;
    position: relative;
    filter: drop-shadow(2.5px 3px);
    img {
        position: absolute;
        animation-name: spin;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        opacity: 0.8;
    }
    @keyframes spin {
        from {rotate: 0};
        to {rotate: 360deg};
    }
    .outer {
        width: $size;
        height: $size;
        animation-duration: calc(3s / $speed-scale);
    }
    .inner {
        animation-duration: calc(2s / $speed-scale);
        width: calc($size * 0.75);
        height: calc($size * 0.75);
        top: calc($size * 0.125);
        left: calc($size * 0.125);
    }
    .c {
        animation-duration: calc(1.8s / $speed-scale);
        width: calc($size * 0.5);
        height: calc($size * 0.5);
        top: calc($size * 0.25);
        left: calc($size * 0.25);
        
    }
}
</style>