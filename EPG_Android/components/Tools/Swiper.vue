<style lang="css" scoped>

@import '../../assets/lib/swiper-3.3.1.min.css';
img {
    width: 1146.67px;
    height: 613.34px;
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

.swiper-pagination {
    font-size: 25.34px;
    color: white;
    text-align: right;
}
</style>
<!--******************轮播组件*******************-->
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='item in pictureList'>
                <img v-bind:src=item.PictureUrl alt="">
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
            pictureList: {
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
            'pictureList': function(newVal, val) {
                const container = document.querySelector(".swiper-container");
                const wrapper = document.querySelector(".swiper-wrapper");
                console.log('this.pictureList.length: ' + this.pictureList.length);
                wrapper.style.width = container.clientWidth * (this.pictureList.length + 2) + 'px';
                this.mySwiper = swiper('.swiper-container', this.options);
                this.mySwiper.enableKeyboardControl();
            }
        },

        beforeDestroy: function() {
            this.mySwiper.disableKeyboardControl();
        },

        events: {
            disableSwiperControl() {
                this.mySwiper.disableKeyboardControl();
            },
            enableSwiperControl() {
                this.mySwiper.enableKeyboardControl();
            }

        },

        ready() {

        },
};
</script>
