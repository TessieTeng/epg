<style>
/*html {
    font-size: 100px;
}*/
</style>
<template>
    <div id="app">
        <template-one></template-one>
    </div>
</template>
<script>
import store from '../vuex/store.js';
import TemplateOne from 'Vues/TemplateOne'
export default {
    data() {
            return {

            };
        },
        methods: {

        },
        components: {
            TemplateOne,
        },
        store: store,
        ready() {

            // 茁壮中间件默认焦点框问题
            console.log('ipanel: ' + iPanel);
            if (!!window.iPanel) {
                iPanel.focusWidth = 0;
            }
            
            // var html = document.getElementsByTagName('html')[0];
            // var width = html.offsetWidth;
            // html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
