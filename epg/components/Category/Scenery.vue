<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 2;
    left: 0rem;
    top: 0rem;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-image: url(/assets/images/background.png);
}

.one {
    width: 100%;
    height: 100%;
}

.main {
    width: 100%;
    height: 100%;
    padding-top: 1.5rem;
}

.conent {
    width: 17.2rem;
    height: 8rem;
    margin: auto;
}

.footer {
    width: 17.2rem;
    height: 1.3rem;
    margin: auto;
    padding-top: 0.3rem;
}

.currentcategory {
    font-size: 0.38rem;
    color: #FFF;
    float: left;
}

.currentpage {
    font-size: 0.38rem;
    color: #FFF;
    float: right;
}

.hintimg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 0.3rem;
    height: 0.6rem;
}
</style>
<!--******************特色景点*******************-->
<template>
    <html>
    <div class="info">
        <div class="main">
        <img class="hintimg"  v-if=showhint src="/assets/images/hint.png" />
            <div class="conent">
                <swiper :images="images" :options='options' class="one" v-if='isShowSwiper'>
                </swiper>
            </div>
            <div class="footer">
                <div class="currentcategory">{{title}}/特色景点</div>
                <div class="currentpage">1/{{images.length}}</div>
            </div>
        </div>
    </div>

    </html>
</template>
<script>
import swiper from 'Category/Swiper.vue';

export default {
    data() {
            return {
                isShowSwiper: true,
                options: {
                    autoplay: 4000, //可选选项，自动滑动
                    loop: true, //可选选项，开启循环
                    // keyboardControl: true,
                    keyboardControl: true,
                    // pagination: '.swiper-pagination',
                    // paginationType: 'fraction',
                },
                images: ['http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/00/03/ChMkJ1ebIUuITH-OACGOv5ry_d0AAT9_AEG7gMAIY7X943.jpg',

                    'http://bbs.crsky.com/1236983883/Mon_1209/25_187069_a86b07318a78665.jpg',

                    'http://dl.bizhi.sogou.com/images/2012/03/01/86380.jpg',

                    'http://tupian.enterdesk.com/2016/hxj/08/16/1602/ChMkJ1exsKeIUuRcAAg2b09O224AAUdNgKfE_4ACDaH870.jpg',
                    'http://bbs.crsky.com/1236983883/Mon_1209/25_187069_fecc7da486455f3.jpg'
                ],
            };
        },


        methods: {

        },
        events: {
            name: function(name) {
                this.name = name;
            },
        },

        components: {
            swiper,
        },

        props: [
            'showhint',
            'title',
            'isshow',
        ],
        events: {
            isShowRightLayout() {
                this.isShowSwiper = false;
            }
        },

        beforeDestroy: function() {},

        destroyed() {},
        ready() {
            this.showSwiper = true;
            this.options.keyboardControl = false;
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
