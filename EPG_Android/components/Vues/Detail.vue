<style scoped>
.info {
    position: fixed;
    z-index: 2;
    left: 0rem;
    top: 0rem;
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
    padding-top: 0.6rem;
}

.conent {
    width: 17.2rem;
    height: 10rem;
    margin: auto;
    overflow: hidden;
}

.footer {
    width: 17.2rem;
    height: 1.3rem;
    margin: auto;
}

.currentpage {
    font-size: 0.38rem;
    color: #FFF;
    float: right;
}

.leftimg {
    width: 0.4rem;
    margin-right: 0.1rem;
    margin: -0.08rem 0;
}

.rightimg {
    width: 0.4rem;
    margin-left: 0.1rem;
    margin: -0.08rem 0;
}
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
    getLastPicList
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


        methods: {



            listenBackKey() {
                window.onkeydown = function(event) {
                    var e = event || window.event;
                    if (e.keyCode == 8) {
                        history.back();
                    }
                };

                // document.querySelector('#detailLayout').addEventListener('keypress', (keyEvent) => {
                //     keyEvent = keyEvent ? keyEvent : window.event;
                //     var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                //     alert("Detail +++" + keyvalue);
                //     if (keyvalue == 8) {
                //         history.back();
                //     }
                // });


                // this.$el.addEventListener('keypress', (keyEvent) => {
                //     keyEvent = keyEvent ? keyEvent : window.event;
                //     var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                //     alert("detail +++" + keyvalue);
                //     if (keyvalue == 8) {
                //         history.go(-1);
                //     }
                // });
            },
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

        destroyed: function() {

        },

        vuex: {
            getters: {
                lastPicList: getLastPicList
            }
        },

        ready() {
            this.listenBackKey();
            //this.$dispatch("pauseVideo");
            this.pictureList = this.lastPicList;
        },
}
</script>
