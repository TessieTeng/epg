<style lang="css" scoped>
html {
    font-size: 100px;
}

@import '../../assets/lib/swiper-3.3.1.min.css';
img {
    width: 100%;
    height: 100%;
}

.swiper-pagination-bullet {
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    outline-style: none;
    display: block;
}

.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    outline: none;
    outline-style: none;
    display: block;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    -ms-transition-property: -ms-transform;
    transition-property: transform;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

.swiper-slide {
    float: left;
}

.swiper-pagination-bullet-active {
    background: rgb(9, 187, 7);
}
</style>
<!--******************轮播组件*******************-->
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='img in ad'>
                <img :src=img.AdUrl alt="">
            </div>
        </div>
        <div class="swiper-pagination" v-if="options.pagination"></div>
        <div class="swiper-scrollbar" v-if="options.scrollbar"></div>
    </div>
</template>
<script>
import swiper from "../../assets/lib/swiper-3.3.1.min.js";
export default {
    data() {
            return {
                mySwiper: null,
            };
        },
        props: {
            ad: {
                type: Array,
                required: true,
                default: [],
            },
            options: {
                type: Object,
                default: {},
            },
        },
        watch: {

            'options': function(val, oldVal) {
                console.log(val);
            },
            'ad': function(newVal, val) {
                var _this = this;
                if (newVal.length == 1) {
                    setTimeout(function() {
                        if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
                            location.replace("../../epggroup_welcomes/welcome_default/welcome.html");
                        } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
                            location.replace("../../epggroup_welcomes/welcome_test/welcome.html");
                        }
                    }, 2000);
                    return;
                }
                const container = document.querySelector(".swiper-container");
                const wrapper = document.querySelector(".swiper-wrapper");
                wrapper.style.width = container.clientWidth * (newVal.length + 2) + 'px';
                this.mySwiper = swiper('.swiper-container', this.options);
                // this.mySwiper.enableKeyboardControl();
            },
        },

        beforeDestroy: function() {
            // this.mySwiper.disableKeyboardControl();
        },

        events: {
            disableSwiperControl() {
                // this.mySwiper.disableKeyboardControl();
            },
            enableSwiperControl() {
                // this.mySwiper.enableKeyboardControl();
            }

        },

        ready() {

        },
};
</script>
