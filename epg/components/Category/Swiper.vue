<style lang="css" scoped>
@import '/assets/lib/swiper-3.3.1.min.css';
img {
    width: 100%;
    height: 100%
}

.swiper-pagination-bullet {
    background: rgba(255, 255, 255, 1);
    opacity: 1;
}

.swiper-pagination-bullet-active {
    background: rgb(9, 187, 7);
}
.swiper-wrapper {
  width: auto;
}
</style>
<!--******************轮播组件*******************-->
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='img in images'>
                <img :src="img" alt="">
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
            images: {
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
        },

        beforeDestroy: function() {
          console.log(this.mySwiper);
          console.log("DDDDDDD");
                 this.mySwiper.disableKeyboardControl();
                 console.log("销毁");
        },
        ready() {
            this.mySwiper = swiper('.swiper-container', this.options);
                 console.log("创建");
        },
};
</script>
