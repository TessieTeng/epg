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
<!--******************美食地图*******************-->
<template>
    <html>
    <div class="info">
        <div class="main">
        <img class="hintimg" v-if=showhint src="/assets/images/hint.png" />
            <div class="conent">
                <swiper :images="images" :options='options' class="one" v-if='isShowSwiper'>
                </swiper>
            </div>
            <div class="footer">
                <div class="currentcategory">{{title}}/美食地图</div>
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
                name: 'name',
                isShowSwiper: true,

                options: {
                    autoplay: 4000, //可选选项，自动滑动
                    loop: true, //可选选项，开启循环
                    keyboardControl: true,
                    /*  pagination : '.swiper-pagination',
                      paginationType : 'fraction',*/

                },

                images: [

                    'http://m2.quanjing.com/2m/age_foto088/yl2-1563088.jpg',

                    'http://1.img.home77.com/G1/M00/1D/95/wKgB51QncP2Af261AA5fK2hjfH8585.jpg',

                    'http://img.daimg.com/uploads/allimg/120727/1-120HG64253.jpg',

                    'http://www.hy0591.cn/upload/img/roHd0Y8awoKw3hfPpivZPZTmM8sUvOZeoXs0VX4CEVdAVZO9ZCQqZFeWJpjJ6jmmb7LIUF7G3JkzAAUgkwdpWpU7siScv5IwG4EBREZk5nDm4Q.jpg',

                    'http://dl.bizhi.sogou.com/images/2013/06/19/342471.jpg',

                    'http://imgstore.cdn.sogou.com/app/a/100540002/509314.jpg',

                ],

            };
        },


        methods: {

        },

        events: {

            name: function(name) {
                this.name = name;
            },
            isShowRightLayout() {
                this.isShowSwiper = false;
            }

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

        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
