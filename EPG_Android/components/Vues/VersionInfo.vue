<style scoped>

.versionInfo {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 1280px;
    height: 720px;
    background: black;
    color: white;
}
</style>
<!--******************EPG版本信息页*******************-->
<template>
    <div id="versionInfo" class="versionInfo">
        <h1>版本信息</h1>
        <span>{{versionNo}}</span>
        <span>{{versionDesc}}</span>
        <ol id="debuggers">
            <li v-for="bugItem in versionDuggers">{{bugItem}}</li>
        </ol>
    </div>
</template>
<script>
export default {
    data() {
        return {

            // 组合键处理器
            versionNo: 'v1.0.0',
            versionDesc: '版本描述',
            versionDuggers: [
                '解决问题一',
                '解决问题二',
                '解决问题三'
            ],
        };
    },

    ready() {
        console.log('version info vue ready ...');
    },
}
</script>
