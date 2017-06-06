<style scoped>
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
}


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
    <div class="info" id="detailLayout">
        <div class="main">
            <div class="conent">
                <swiper :picture-list="pictureList" :options='options' class="one" v-if='isShowSwiper'>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
import swiper from 'Tools/Swiper.vue';
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
                options: {
                    autoplay: 4000,
                    loop: true,
                    keyboardControl: true,
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction',
                    autoplayDisableOnInteraction: false,
                },
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

        components: {
            swiper,
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

        ready() {
            this.pictureList = this.lastPicList;
            console.log("详情页面..." + this.isVideoPlay);
            if(this.isVideoPlay){
                this.$dispatch("stopVideo");
                this.updateIsVideoPlay(false);
            }

        },
}
</script>
