<style scoped>
.rootView {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    margin-top: 40px;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-color: black;
}
.swiperLevel {
    position: absolute;
    z-index: 2;
}


.content {
    position: relative;
    width: 1146.67px;
    height: 666.67px;
    margin: auto;
    overflow: hidden;
}

.pag {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: white;
}

img {
    width: 1146.67px;
    height: 613.34px;
}

/*
.info {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-color: black;
}

.one {
    width: 100%;
    height: 100%;
}

.main {
    width: 100%;
    height: 100%;
    padding-top: 40px;
}

.conent {
    width: 1146.67px;
    height: 666.67px;
    margin: auto;
    overflow: hidden;
}*/


/*
.footer {
    width: 1146.67px;
    height: 86.67px;
    margin: auto;
}

.currentpage {
    font-size: 25.33px;
    color: #FFF;
    float: right;
}

.leftimg {
    width: 26.67px;
    margin-right: 6.67px;
    margin: -5.34px 0;
}

.rightimg {
    width: 26.67px;
    margin-left: 6.67px;
    margin: -5.34px 0;
}*/

</style>
<!--******************图片展示详情页*******************-->
<template>
    
    <div class="rootView swiperLevel">
        <div class="content">
            <img style="transition: all 1s; position: absolute;" :style="{ opacity: $index === picIndex ? 1 : 0 }" v-for="item in pictureList" :src="item.PictureUrl" v-show='isShowSwiper'>

            <div class="pag">{{picIndex + 1}} / {{pictureList.length}}</div>
        </div>
    </div>
<!--     <div class="info" id="detailLayout">
        <div class="main">
            <div class="conent">
            </div>
        </div>
    </div> -->
</template>
<script>
// import swiper from 'Tools/Swiper.vue';
import store from '../../vuex/store.js';
import {
    updateIsVideoPlay,
} from '../../vuex/actions.js';
import {
    getLastPicList,
    getIsVideoPlay,
} from '../../vuex/getters.js';
export default {
    data() {
            return {
                name: 'name',
                isShowSwiper: true,
                pictureList: [],
                picIndex: 0,
                timer: null,
                restartTimer: null,
            };
        },

        events: {
            name: function(name) {
                this.name = name;
            },
            isShowRightLayout() {
                this.isShowSwiper = false;
            },

        },

        props: [
            'showhint',
            'title',
        ],

        vuex: {
            actions: {
                updateIsVideoPlay,
            },
            getters: {
                lastPicList: getLastPicList,
                isVideoPlay: getIsVideoPlay,
            }
        },

        methods: {
            eventHandler(e) {
                var e = e ? e : window.event;
                var keycode = e.which ? e.which : e.keyCode;

                if (keycode === 37 || keycode === 39) {
                    this.restart();
                }

                switch (keycode) {
                    case 37:
                        this.picIndex = --this.picIndex % this.pictureList.length;
                        if (this.picIndex < 0) {
                            this.picIndex += this.pictureList.length;
                        }
                    break;
                    case 39:
                        this.picIndex = ++this.picIndex % this.pictureList.length;
                    break;
                    case 8:
                        history.back();
                    break;
                    default: return true; break;
                }
            },

            restart() {
                clearTimeout(this.restartTimer);
                this.stop();
                this.restartTimer = setTimeout(() => {
                    this.start();
                }, 6000);
            },

            start() {
                this.timer = setInterval(() => {
                    // let index = ++this.picIndex % this.pictureList.length;
                    this.picIndex = ++this.picIndex % this.pictureList.length;
                }, 3000);
            },

            stop() {
                clearInterval(this.timer);
            },
        },

        ready() {
            this.pictureList = this.lastPicList;
            console.log('detail pic list: ' + this.pictureList);
            console.log("详情页面..." + this.isVideoPlay);
            this.start();
            document.onkeydown = this.eventHandler;
            if(this.isVideoPlay){
                this.$dispatch("stopVideo");
                this.updateIsVideoPlay(false);
            }
        },
}
</script>
