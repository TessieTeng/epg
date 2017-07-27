<style scoped>
 .rootView {
     position: fixed;
     z-index: 2;
     left: 0;
     top: 0;
     /* padding-top:40px; */
     /* margin-top: 40px; */
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
     margin-top: 40px;
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

 #detail-debug {
     position: fixed;
     right: 0;
     top: 0;
     width: 40%;
     height: 100%;
     background-color: black;
     color: white;
     z-index: 10000000;
     word-wrap: break-word;
     opacity: 0.3;
     overflow: scroll;
 }
</style>
<!--******************图片展示详情页*******************-->
<template>

    <div class="rootView swiperLevel">
        <div class="content">
            <img style="transition: all 1s; position: absolute;" :src="item.PictureUrl" v-for="item in pictureList" :style="{ opacity: $index === picIndex ? 1 : 0 }" v-show='isShowSwiper'>

            <div class="pag">{{picIndex + 1}} / {{pictureList.length}}</div>
        </div>

        <div id="detail-debug" v-if="isDebug"></div>
    </div>
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
             isDebug: false,
         };
     },

     events: {
         name: function(name) {
             this.name = name;
         },
         isShowRightLayout() {
             this.isShowSwiper = false;
         },

         edetaildirectionkey(keycode) {
             if (!keycode) {
                 this.debug('key null');
                 return false;
             }
             const key = parseInt(keycode, 10);
             if (key === 37 || key === 39) {
                 this.restart();
             }
             switch (key) {
                 case 37: this.left(); break;
                 case 39: this.right(); break;
             }
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
         debug(obj) {

             // config.js 中配置
             //  && isDebug !== 1
             if (!this.isDebug) { return; }

             const debug = document.getElementById('detail-debug');

             let str = '';

             if (typeof(obj) === 'object') {
                 str = JSON.stringify(obj);
             } else {
                 str = '' + obj;
             }

             debug.innerHTML += '[' + str + ']';
         },

         left() {
             this.debug('37');
             this.picIndex = --this.picIndex % this.pictureList.length;
             if (this.picIndex < 0) {
                 this.picIndex += this.pictureList.length;
             }
         },

         right() {
             this.debug('39');
             this.picIndex = ++this.picIndex % this.pictureList.length;
         },

         restart() {
             clearTimeout(this.restartTimer);
             this.stop();
             this.restartTimer = setTimeout(() => {
                 this.start();
             }, 4000);
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
         this.isDebug = sessionStorage.getItem('EPG_DEBUG_SWITCHER') === 'open';
         // if(this.isVideoPlay){
         this.$dispatch("stopVideo");
         this.updateIsVideoPlay(false);
         // }
     },
 }
</script>
