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
    background-color: #000;
}

.main {
    width: 100%;
    height: 100%;
}

.conent {
    width: 17rem;
    height: 1.5rem;
    margin: auto;
}

.footer {
    width: 17rem;
    height: 9rem;
    margin: auto;
    overflow: auto;
}

.title {
    height: 100%;
    color: white;
    font-size: 0.6rem;
    padding-top: 0.4rem;
    margin-left: 0.2rem;
}

.recommendImg {
    float: left;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.recommendImg ul {
    list-style: none;
    top: 0;
    margin: 0;
    margin-top: 0.4rem;
    padding: 0;
}

.recommendImg ul li {
    float: left;
    height: 2.0rem;
    padding-bottom: 1.8rem;
    margin: 0 0.16rem;
}

.recommendImg ul li a img {
    width: 2.5rem;
    border-radius: 0.1rem;
}

.recommendImg ul li a {
    display: inline-block;
    font-size: 0;
}

.recommendImg ul li a:focus img {
    border-radius: 0.1rem;
    box-shadow: 0 0 0.5rem 0 #609EDE, inset 0px 0px 0.02rem .05rem rgb(255, 255, 255);
}
</style>
<!--******************特别推荐*******************-->
<template>
    <div>
        <div class="info">
            <div class="main">
                <div class="conent">
                    <div class="title">特别推荐</div>
                </div>
                <div class="footer">
                    <div class="recommendImg">
                        <ul id="recommendTabItem">
                            <li v-for="item in recommentList">
                                <a href="javascript:;" @click="scaleimg()">
                                    <img v-bind:src='item.PictureList.Picture[0].PictureUrl'>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <loading v-if="showLoading"></loading> -->
    </div>
</template>
<script>
import Loading from '../Tools/Loading.vue';
import Http from '../../assets/lib/Http';
import store from '../../vuex/store.js';
import {
    updateIsMainLayout
} from '../../vuex/actions.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                recommentList: [],
                showLoading: true,
            };
        },


        methods: {
            scaleimg() {
                // 放大图片
                console.log('...............跳转到详情');
            },
            getRecommentList(categoryId) {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetObjectInfoReq",
                        "MessageBody": {
                            "ObjectID": categoryId,
                            "ObjectType": 1,
                            "ChildrenLevel": 1,
                            "LangCode": window.sessionStorage ? sessionStorage.getItem("currLangCode") : Cookie.read("currLangCode"),
                            "EpgGroupID": window.sessionStorage ? sessionStorage.getItem("EpgGroupID") : Cookie.read("EpgGroupID"),
                            "UserID": window.sessionStorage ? sessionStorage.getItem("UserID") : Cookie.read("UserID"),
                            "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.recommentList = _msgBody.ChildrenObjectList.Object;
                                console.log(_this.recommentList);
                                console.log("推荐列表");
                                _this.$nextTick(() => {
                                    var categary = document.getElementById("recommendTabItem");
                                    categary.children[0].children[0].focus();
                                })
                            } else {
                                console.log("请求数据失败");
                            }
                        } else {
                            console.log("网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                    },
                });
            },

            listenBackKey() {
                this.$el.addEventListener('keypress', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        history.back();
                    }
                });
            },

        },

        events: {


        },

        components: {
            Loading,
        },

        destroyed: function() {

        },

        store: store,
        vuex: {
            actions: {
                updateIsMainLayout,
            }

        },

        ready() {
            this.updateIsMainLayout(false);
            this.listenBackKey();
            this.getRecommentList(this.$route.params.id);
            //this.$dispatch("pauseVideo");
        },

}
</script>
