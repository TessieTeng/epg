<style scoped>
html {
    font-size: 100px;
}

.info {
    position: fixed;
    z-index: 2;
    left: 0rem;
    top: 0rem;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-size: 100%;
    background-color: black;
}

.top {
    width: 100%;
    height: 2.7rem;
    line-height: 2.7rem;
    text-align: center;
}

.all {
    padding: 0.2rem;
    background-color: #47B1F0;
    color: white;
    font-size: 0.4rem;
    letter-spacing: 0.2rem;
    text-align: center;

     padding: 


}

.middle {
    width: 19.2rem;
    height: 7rem;
    overflow: auto;
}

.middle ul {
    padding-top: 10px;
    height: 100%;
    white-space: nowrap;
    /*规定段落中的文本不进行换行：*/
}

.middle ul li {
    width: 25%;
    display: inline-block;
    list-style-type: none;
    text-align: center;
    /* float: left; */
    height: 80%;
}

.middle ul li a {
    display: inline-block;
    height: 100%;
    -webkit-transition: all .3s ease-in;
    list-style: none;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
}

.middle ul li a img {
    width: 3.6rem;
    height: 100%;
    text-align: center;
    vertical-align: middle;
}


/**
 * 去除黄色边框
 */

.middle ul li a:focus {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.middle ul li a:focus img {
    box-shadow: 0 0 0.1rem 0.1rem #609EDE, inset 0px 0px 0.02rem .05rem rgb(255, 255, 255);
}

.footer {
    position: fixed;
    width: 100%;
    height: 0.75rem;
    bottom: 0;
    background-image: url("../../assets/images/bg_path1.png");
}

.lefts {
    position: fixed;
    z-index: 5;
    bottom: 0.02rem;
    margin-left: 1rem;
}

.hint {
    position: fixed;
    z-index: 5;
    bottom: 0.15rem;
    margin-left: 2.1rem;
    font-size: 0.3rem;
    color: white;
   
}

.rights {
    position: fixed;
    right: 1.5rem;
    z-index: 5;
    bottom: 0.15rem;
    font-size: 0.3rem;
    color: white;
}
</style>
<template>
    <div class="info">
        <div class="top">
            <span class="all">{{tophint}}</span>
        </div>
        <div class="middle">
            <ul id="goodslist">
                <li v-for="item in storePicList">
                    <a href="javascript:;" id='_{{item.ObjectID}}' @click="scaleimg(item)" v-if="$index !== storePicList.length - 1">
                        <img v-bind:src='getPicItem(item)'>
                    </a>
                    <a href="javascript:;" id='_{{item.ObjectID}}' @click="scaleimg(item)" v-if="$index === storePicList.length - 1" class="finalListItem">
                        <img v-bind:src='getPicItem(item)'>
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <img class="lefts" src="../../assets/images/img_portal.png">
            <span class="hint">{{lefthint}}</span>
            <span class="rights">{{righthint}}</span>
        </div>
    </div>
</template> 
<script>
import Http from '../../assets/lib/Http';
import ImageLoader from '../../assets/lib/ImageLoader.js';
import {
    updateScaleImgUrl,
    updateLastStore,
} from '../../vuex/actions';

import {
    getLastStore
} from '../../vuex/getters.js';

export default {
    data() {
            return {
                isRequestStatus: false,
                storePicList: [],
                tophint: "",
                lefthint: "",
                righthint:"",
            };
        },

        computed: {},

        methods: {
            addClassToLastLi() {
                var lis = document.querySelectorAll("#goodslist li:last-child a");
                var lisFirst = document.querySelectorAll("#goodslist li:first-child a");
                lis[0].className = "finalListItem";
                lisFirst[0].className = "firstListItem";
            },

            listenBackKey() {
                document.querySelector('#goodslist').addEventListener('keypress', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        history.back();
                    }

                });


                document.querySelector(".finalListItem").addEventListener('focus', (keyEvent) => {

                    var list = document.querySelector(".middle");
                    list.scrollLeft  = list.scrollWidth - list.clientWidth;

                });

                document.querySelector(".firstListItem").addEventListener('focus', (keyEvent) => {
                    var list = document.querySelector(".middle");
                    list.scrollLeft = 0;

                });
            },

            getPicItem(item) {
                var goodPic;
                var urlTemp = item.PictureList.Picture;
                for (var i = 0; i < urlTemp.length; i++) {
                    if (urlTemp[i].PictureType == 13) {
                        goodPic = urlTemp[i].PictureUrl;
                    }
                }
                return goodPic;
            },

            getStoreData(myId) {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetObjectInfoReq",
                        "MessageBody": {
                            "ObjectID": myId,
                            "ObjectType": 1,
                            "ChildrenLevel": 1,
                            "LangCode": window.sessionStorage ? sessionStorage.getItem("currLangCode") : Cookie.read("currLangCode"),
                            "EpgGroupID": 1,
                            "UserID": "888888",
                            "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
                        }
                    }
                };

                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                console.log("获取数据成功");
                                console.log(_msgBody.ChildrenObjectList.Object);
                                var currList = _msgBody.ChildrenObjectList.Object;
                                const tempPicList = [];
                                for (var i = 0; i < currList.length; i++) {
                                    tempPicList.push(currList[i].PictureList.Picture[0].PictureUrl);
                                }
                                ImageLoader({
                                    data: tempPicList,
                                    onFinish: function() {
                                        _this.storePicList = _msgBody.ChildrenObjectList.Object;
                                        _this.$nextTick(() => {
                                            if (_this.getLastStore == 0) {
                                                console.log("null.................");
                                                var goodsUi = document.getElementById("goodslist");
                                                goodsUi.children[0].children[0].focus();
                                                // _this.addClassToLastLi();

                                            } else {
                                                console.log("have value................");
                                                console.log("_" + _this.getLastStore);
                                                console.log(document.getElementById("_" + _this.getLastStore));
                                                document.getElementById("_" + _this.getLastStore).focus();

                                            }

                                            _this.addClassToLastLi();
                                            _this.listenBackKey();
                                        })
                                    },
                                    onProgress: function(precent) {
                                        console.log("加载中" + precent);
                                    }
                                });

                            } else {
                                console.log("获取数据失败");
                            }
                        } else {
                            console.log("请求失败");
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    },

                });
            },

            scaleimg(item) {
                var imgUrl = '';
                var imgObjectID = '';
                for (var i = 0; i < item.PictureList.Picture.length; i++) {
                    if (item.PictureList.Picture[i].PictureType == 15) {
                        imgUrl = item.PictureList.Picture[i].PictureUrl;
                        imgObjectID = item.ObjectID;;
                    }
                }
                this.updateScaleImgUrl(imgUrl);
                this.$router.go("/scaleimg");
                this.updateLastStore(imgObjectID);


            },
        },

        vuex: {
            actions: {
                updateScaleImgUrl,
                updateLastStore,
            },
            getters: {
                getLastStore
            },

        },

        ready() {
            var _this = this;
            var hint = sessionStorage.getItem("currLangCode");
            if (hint === "chi") {
                _this.tophint = "全部商品";
                _this.lefthint = "酒店商城";
                _this.righthint = '"确认进入","返回"退出';

            } else if (hint === "eng") {
                _this.tophint = "All Proudcts";
                _this.lefthint = "Hotel Mall";
                _this.righthint = 'Press "OK"enter, "Return"exit';
            }

            this.getStoreData(this.$route.params.id);

            //this.$dispatch("pauseVideo");
        }

}
</script>
