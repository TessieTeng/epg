<style>
html {
    font-size: 100px;
}
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
            return {

            };
        },
        methods: {
        
        },
        
        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';

        },
}
</script>
