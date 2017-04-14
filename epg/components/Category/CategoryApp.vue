<style scoped>
html {
    font-size: 100px;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#categoryApp {
    color: #2c3e50;
    max-width: 6rem;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    background: url("/assets/images/background.png");
    background-size: 19.2rem 10.8rem;
    position: relative;
}

#classifyRouter {
    position: absolute;
}

#classifyLeftList {
    position: absolute;
}
</style>
<template>
    <div id="categoryApp">
        <!--     <div id="classifyRouter">
            <router-view :data.sync='data' :title.sync='title' :show-category.sync="showCategory"></router-view>
        </div> -->
        <div id="classifyLeftList">
            <left-list :data.sync='data' :title.sync='title' v-if="showCategory" v-if="showhint">
            </left-list>
        </div>
        <world-time :title.sync='title' :showhint.sync='showhint' v-if="currentpos == data[0].id">
        </world-time>
        <weather :data.sync='data' :title.sync='title' :showhint.sync='showhint' v-if="currentpos==data[1].id">
        </weather>
        <scenery :title.sync='title' :showhint.sync='showhint' v-if="currentpos ==data[2].id">
            <!-- :isshow='currentpos ==data[2].id' -->
        </scenery>
        <food :title.sync='title' :showhint.sync='showhint' v-if="currentpos ==data[3].id">
        </food>
        <weather-detail v-if="currentpos ==data[4].id"></weather-detail>
        <!-- <test v-if="currentpos ==data[4].id"></test> -->
    </div>
</template>
<script>
import LeftList from 'Category/LeftList';
import WorldTime from 'Category/WorldTime.vue';
import Weather from 'Category/Weather';
import Scenery from 'Category/Scenery.vue';
import Food from 'Category/Food.vue';
import WeatherDetail from 'Category/WeatherDetail.vue';
/*import Test from 'Category/Test.vue';*/

import {
    updateClassTab
} from '../../vuex/actions.js';
import {
    getClassTab
} from '../../vuex/getters';
import store from '../../vuex/store.js';
var space_data = [{
        id: '_0',
        list_name: '世界时间',
    }, {
        id: '_1',
        list_name: '天气预报',
        weather_city_list: [{
                city_id: 0,
                city_name: '北京',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",

            }, {
                city_id: 1,
                city_name: '上海',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",

            }, {
                city_id: 2,
                city_name: '广州',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",

            }, {
                city_id: 3,
                city_name: '深圳',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",

            }, {
                city_id: 4,
                city_name: '成都',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            }, {
                city_id: 5,
                city_name: '天津',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            }, {
                city_id: 6,
                city_name: '重庆',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            }, {
                city_id: 7,
                city_name: '哈尔滨',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            }, {
                city_id: 8,
                city_name: '珠海',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            }, {
                city_id: 9,
                city_name: '武汉',
                city_image_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1717816186,2947076118&fm=116&gp=0.jpg",
            },


        ]
    }, {
        id: '_2',
        list_name: '特色景点',

    }, {
        id: '_3',
        list_name: '美食地图',
    }, {
        id: '_4',
        list_name: '天气详情',
    },

];

import {
    getHometab
} from '../../vuex/getters'
export default {
    data() {
            return {
                swiperJsObj: null, //子组件传过来的jsSwiper对象
                currentpos: '_0',
                title: '旅行空间',
                showCategory: true,
                showhint: false,
                data: space_data,
            };
        },

        events: {
            test: function(currentItem) {
                this.$broadcast('test', currentItem);
                this.currentpos = currentItem;
                this.showCategory = true;

                console.log(this.currentpos + "---");
                //路由方式跳转隐藏.为了解决返回键监听不了
                // switch (this.currentpos) {
                //     case this.data[0].id:
                //         this.$router.go('/capp/cwordtime');
                //         break;
                //     case this.data[1].id:
                //         this.$router.go('/capp/cweather');
                //         break;
                //     case this.data[2].id:
                //         this.$router.go('/capp/cscenery');
                //         break;
                //     case this.data[3].id:
                //         this.$router.go('/capp/cfood');
                //         break;
                // }
            },

            swiperObj: function(obj) {
                this.swiperJsObj = obj;
                console.log(obj);
                console.log("AAAAAAAAAAAD");
            },

            destroyedSwiper: function() {
                this.$broadcast('isShowRightLayout');
                this.showCategory = false;
            },
            name: function(name) {
                this.$broadcast('name', name);
            }

        },
        components: {
            LeftList,
            WorldTime,
            Weather,
            Scenery,
            Food,
            WeatherDetail,
            // Test,
        },
        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
            var vm = this;
            var body = document.querySelector('body');


<<<<<<< HEAD
            window.document.onkeypress = function(keyEvent){
                keyEvent  =keyEvent ? keyEvent:window.event;
                var keyvalue = keyEvent.which?keyEvent.which:keyEvent.keyCode;
               // alert("返回键有用"+keyvalue);
            }
=======
            // window.document.onkeypress = function(keyEvent){
            //     keyEvent  =keyEvent ? keyEvent:window.event;
            //     var keyvalue = keyEvent.which?keyEvent.which:keyEvent.keyCode;
            //console.log(keyvalue);
            //  console.log("XXXXXXXXXXXXXXX");
            // alert("返回键有用"+keyvalue);
            //
            // }
>>>>>>> 99933a78315571c7fa5a9dca126e1a98ad4eadc7

             body.addEventListener('keyup', function(event) {
                var obj = event;
                if (event.keyCode == 39) {
                    // console.log("右边右边-------->");
                    vm.showCategory = false;
                    vm.showhint = true;
                    event.preventDefault();
                    // event.stopPropagation();
                } else if (event.keyCode == 37) {
                    // console.log("左边<--------");
                    vm.showCategory = true;
                    vm.showhint = false;
                    // event.preventDefault();
                }
            })
        },

        vuex: {
            getters: {
                counterValue: getClassTab
            }
        },

        store: store,

}
</script>
