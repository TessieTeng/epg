<style scoped>
.info {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-size: 100%;
    background-color: black;
}

.top {
    width: 100%;
    height: 180px;
    line-height: 180px;
    text-align: center;
}

.all {
    padding: 13.34px;
    background-color: #47B1F0;
    color: white;
    font-size: 26.67px;
    letter-spacing: 13.34px;
    text-align: center;
}

.middle {
    position: relative;
    width: 1280px;
    height: 466.67px;
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
    width: 240px;
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
    box-shadow: 0 0 6.67px 6.67px #609EDE, inset 0px 0px 1.34px 3.34px rgb(255, 255, 255);
}

.footer {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    background-image: url("../../assets/images/bg_path1.png");
}

.lefts {
    position: fixed;
    z-index: 5;
    bottom: 1.34px;
    margin-left: 66.67px;
}

.hint {
    position: fixed;
    z-index: 5;
    bottom: 10px;
    margin-left: 140px;
    font-size: 20px;
    color: white;
   
}

.rights {
    position: fixed;
    right: 100px;
    z-index: 5;
    bottom: 10px;
    font-size: 20px;
    color: white;
}
.page-container {
    position: absolute;
    right: 40px;
    bottom: 10px;
    color: #fff;
    font-size: 20px;
}
</style>
<template>
    <div class="info">
        <div class="top">
            <span class="all">{{tophint}}</span>
        </div>
        <div class="middle">
            <ul id="goodslist">
                <li v-for="item in curList">
                    <a href="javascript:;" id='goodsImage_{{storePicList.indexOf(item)}}'
                        @focus='imgFocus(item)' @click="scaleimg(item)" @keydown='switchFocus($event, $index)'>
                        <img v-bind:src='getPicItem(item)'>
                    </a>
                </li>
            </ul>
            <div class='page-container'>{{curIndex + ' / ' + storePicList.length}}</div>
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
                storePicList: [],
                curList: [],
                curPage: 1,
                listLen: 4,
                curIndex: 0,
                tophint: "",
                lefthint: "",
                righthint:"",
            };
        },

        computed: {
            curList() {
                return this.storePicList.slice((this.curPage - 1) * this.listLen, this.curPage * this.listLen);
            },
        },

        methods: {
            switchFocus(event, index) {
                if (event.keyCode === 37 && index === 0 && this.curPage > 1) {
                    this.curPage--;
                    this.$nextTick(() => {
                        document.querySelector('#goodslist li:last-child a').focus();
                    });
                }
                if (event.keyCode === 39 && index === this.listLen - 1 && this.curPage < Math.ceil(this.storePicList.length / this.listLen)) {
                    this.curPage++;
                    this.$nextTick(() => {
                        document.querySelector('#goodslist li a').focus();
                    });
                }
                if (event.keyCode === 8) {
                    history.back();
                }
            },
            imgFocus(item) {
                this.curIndex = this.storePicList.indexOf(item) + 1;
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
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetObjectInfoReq",
                        "MessageBody": {
                            "ObjectID": myId,
                            "ObjectType": 1,
                            "ChildrenLevel": 1,
                            "LangCode": sessionStorage.getItem("currLangCode"),
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "UserID": sessionStorage.getItem("UserID"),
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                const tempPicList = _msgBody.ChildrenObjectList.Object.map(item => item.PictureList.Picture[0].PictureUrl);
                                ImageLoader({
                                    data: tempPicList,
                                    onFinish: function() {
                                        _this.storePicList = _msgBody.ChildrenObjectList.Object;
                                        // 从详情页回来要切换到对应页面
                                        _this.curPage = Math.ceil((_this.getLastStore + 1) / _this.listLen);
                                        _this.$nextTick(() => {
                                            document.getElementById("goodsImage_" + _this.getLastStore).focus();
                                        })
                                    },
                                    onProgress: function(precent) {
                                        // console.log("加载中" + precent);
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
                // var imgObjectID = item.ObjectID; //列表改了实现方法，现在用index比较方便
                var imgObjectID = this.storePicList.indexOf(item);
                for (var i = 0; i < item.PictureList.Picture.length; i++) {
                    if (item.PictureList.Picture[i].PictureType == 15) {
                        imgUrl = item.PictureList.Picture[i].PictureUrl;
                    }
                }
                this.updateScaleImgUrl(imgUrl);
                this.updateLastStore(imgObjectID);
                this.$router.go("/scaleimg");

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
            var hint = sessionStorage.getItem("currLangCode");
            if (hint === "eng") {
                this.tophint = "All Proudcts";
                this.lefthint = "Hotel Mall";
                this.righthint = 'Press "OK"enter, "Return"exit';
            } else {
                this.tophint = "全部商品";
                this.lefthint = "酒店商城";
                this.righthint = '"确认进入","返回"退出';
            }

            this.getStoreData(this.$route.params.id);

            this.$dispatch("pauseVideo");
        }

}
</script>
