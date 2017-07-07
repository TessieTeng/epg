<style scoped>

* {
    margin: 0;
    padding: 0;
}

#versionInfo {
    background: rgb(60, 60, 60);
    position: fixed;;
    left: 0;
    top: 0;
    width: 1280px;
    height: 720px;
}

.container {
    text-align: left;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    color: #fff;
    overflow: hidden;
}

.container p {
    margin: 10px 0 10px;
}

.list {
    margin: 10px 0 10px;
}

.list ul li {
    list-style-type: none;
    margin: 10px;

}

</style>
<!--******************EPG版本信息页*******************-->
<template>
    <div id="versionInfo" class="versionInfo">
        <div class="container">
            <h2>版本号：{{version.no}}</h2>
            <p v-if="version.desc">{{version.desc}}</p>
            <div class="list" v-if="version.buglist && version.buglist.length>0">
                <h2>修复的问题列表：</h2>
                <ul>
                    <li v-for="(index, bug) in version.buglist">{{index+1}}、 {{bug}}</li>
                </ul>
            </div>
            <div class="list" v-if="version.features && version.features.length>0">
                <h2>新增功能：</h2>
                <ul>
                    <li v-for="(index, fea) in version.features">{{index+1}}、 {{fea}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            version: {
                no: 'v1.0.1',
                desc: '此次版本升级是为了获得更好的用户体验。',
                buglist: ['解决视频不能播放问题', '解决焦点黄框问题', '解决视频播放卡顿问题'],
                features: ['开机广告视频', '主页面背景视频及其循环播放', '频道直播页面'],
            },
        };
    },

    ready() {
        var _this = this;

        this.version = JSON.parse(sessionStorage.getItem('EpgVersion'));
    },
}
</script>
