<template>
<div>
        <slot></slot>
</div>
</template>

<script >
    export default {
        name:'ErrorBoundary',
        methods: {
            errorCaptured(err,vm,info){
                console.error('捕获到错误： ',err);
                return true;
            },
        },
    };
</script>

<style  scoped>

</style>
    