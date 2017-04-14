<style scoped>
html {
    font-size: 100px;
}

#main {
    position: fixed;
    width: 19.2rem;
    height: 100%;
    background: url("/assets/images/background.png");
    background-size: 19.2rem 100%;
}

#welcome {
    width: 19.2rem;
    height: 1.5rem;
}

#welcomeContent {
    scroll-behavior: smooth;
    -ms-behavior: smooth;
    line-height: 1.5rem;
    font-size: 0.3rem;
    font-weight: bold;
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
}

#content {
    width: 19.2rem;
    height: 7.5rem;
}

#tab {
    position: fixed;
    bottom: 0;
    width: 19.2rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
}

#nav {
    width: 18rem;
    height: 1.8rem;
    margin: 0 auto;
    line-height: 1.8rem;
    padding-top: 0.28rem;
}

#leftArraw {
    position: fixed;
    width: 0.19rem;
    height: 0.38rem;
    margin-bottom: 1.65rem;
    bottom: 0;
}

#rightArraw {
    position: fixed;
    float: right;
    width: 0.19rem;
    height: 0.38rem;
    margin-bottom: 1.65rem;
    bottom: 0;
    margin-left: 17.6rem;
}

#categary {
    width: 17rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0 auto;
    overflow: auto;
}

#categary ul {
    width: 16rem;
    height: 1rem;
    font-size: 0.4rem;
    /*color: #FFF;*/
    text-align: left;
    line-height: 1rem;
    white-space: nowrap;
}

#categary li {
    list-style-type: none;
    display: inline;
    line-height: 1rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
}

#categary li a {
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    font-weight: bold;
    color: #3A7DCF;
    outline: none;
    outline-style: none;
}

#categary li a:focus {
    outline: none;
    outline-style: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a.arraw:focus {
    outline: none;
    outline-style: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
<template>
    <div id="main">
        <div id="welcome">
            <MARQUEE id="welcomeContent" scrollamount="10" scrolldelay="100">
                <SPAN unselectable="on">尊敬的顾客欢迎您入住 </SPAN>
            </MARQUEE>
        </div>
        <div id="content">
            <homepage-content :index.sync="index" :editable.sync='editable' :categary-list-data.sync='categaryListData'>
            </homepage-content>
        </div>
        <div id="tab">
            <div id="nav">
                <div id="leftArraw">
                    <a class="arraw" href="#">
                        <img src="/assets/images/Left_arrow.png">
                    </a>
                </div>
                <div id="categary">
                    <ul id="categaryList">
                        <li v-for="item in categaryListData">
                            <a href="#" id={{item.id}} v-on:focus='switchId(item.id, $event)'>
                              {{item.categary}}
                             </a>
                        </li>
                    </ul>
                </div>
                <div id="rightArraw">
                    <a class="arraw" href="#">
                        <img src="/assets/images/Right_arrow.png">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import HomepageContent from './HomepageContent';
import {
    updateHomeTab
} from "../../vuex/actions.js";

import {
    getHometab
} from '../../vuex/getters';
import store from '../../vuex/store.js';
export default {
    data() {
            return {
                index: this.counterValue,
                editable: true,
                categaryListData: [{
                    id: 0,
                    categary: "电视频道",
                }, {
                    id: 1,
                    categary: "电影世界"
                }, {
                    id: 2,
                    categary: "酒店服务"
                }, {
                    id: 3,
                    categary: "酒店商城"
                }, {
                    id: 4,
                    categary: "旅行空间"
                }, {
                    id: 5,
                    categary: "信息资讯"
                }, {
                    id: 6,
                    categary: "时尚杂志"
                }, ]

            };
        },
        watch: {
            editable(newVal) {
                console.log('changeEditable', newVal);
            },
        },
        methods: {
            switchId(itemId, event) {
                var vm = this;
                if (!this.editable) {
                    this.editable = true;
                    var curr = document.getElementsByClassName('currentTab');
                    // if (curr.length != 0) {
                    curr[0].focus();
                    // }
                    return;
                }
                this.index = itemId;
                this.updateHomeTabValue(this.index)
                for (var i = 0; i < this.categaryListData.length; i++) {
                    var itemChecked = document.getElementById(this.categaryListData[i].id);
                    itemChecked.style.cssText = "";
                    itemChecked.className = itemChecked.className.replace("currentTab", ' ');
                    if (this.index == this.categaryListData[i].id) {
                        var itemChecked = document.getElementById(this.index);
                        itemChecked.style.cssText = 'color: white;outline: none;outline-style: none; -webkit-tap-highlight-color:rgba(0,0,0,0);background:url("/assets/images/cursor.png") no-repeat;background-size:1.7rem 0.3rem;background-position:bottom ;';
                        itemChecked.className += " currentTab";
                    }
                }
            },
        },
        events: {
            redirect(value) {
                switch (value) {
                    case "capp":
                        console.log("传过来的重定向的目标vue" + value);
                        console.log(this.$router);
                        break;
                }
            },
        },
        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            console.log(width);
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
            //默认加载时选中第一个栏目
            var categary = document.getElementById("categaryList");
            categary.children[this.index].children[0].focus();

        },
        vuex: {
            getters: {
                counterValue: getHometab
            },
            actions: {
                updateHomeTabValue: updateHomeTab
            },
        },
        components: {
            HomepageContent,
        },

        store: store,

}
</script>
