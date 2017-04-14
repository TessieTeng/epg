<style lang="css">
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

.swiper-pagination {
    font-size: 0.38rem;
    color: white;
    text-align: right;
}
</style>
<!--******************轮播组件*******************-->
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='item in pictureList'>
                <img v-bind:src='item.ImageUrl'>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from "../../assets/lib/swiper-3.3.1.min.js";
export default {
    data() {
            return {
                mySwiper: null,
                unwatch: null,
            };
        },
        props: {
            pictureList: {
                type: Array,
                required: true,
                default: function() {
                    return [];
                },
            },
            options: {
                type: Object,
                default: function() {
                    return {};
                },
            },
        },

        methods: {
            updateAllLength(num) {
                setTimeout(() => {
                    console.log("更新长度-个数" + num);
                    const container = document.querySelector(".swiper-container");
                    const wrapper = document.querySelector(".swiper-wrapper");
                    wrapper.style.width = container.clientWidth * (num + 2) + 'px';
                    wrapper.style.width = container.clientWidth * (num + 2) + 'px';
                    // this.mySwiper.disableKeyboardControl();
                }, 1000)
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
            },
            'updatePicsLength': function(num) {
                this.updateAllLength(num);
            },

        },

        ready() {
            this.unwatch = this.$watch('pictureList', function(newVal, val) {
                console.log(newVal.length);
                if (newVal.length > 0) {
                    this.unwatch();
                    this.updateAllLength(this.pictureList.length);
                    this.mySwiper = new Swiper('.swiper-container', this.options);
                }
            })
        },
};
</script>
