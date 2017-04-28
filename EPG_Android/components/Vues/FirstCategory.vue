<style scoped>
.rootDiv {
    width: 1280px;
    height: 720px;
    position: relative;
    background-color: transparent;
}
</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="bgimg" :style='{"background-image": "url(" + bgimg +  ")"}'></div>
            <div class="menuTab firstCategory" id="firstCategoryLayout">
                <div class="advertisement">
                    <img class="advertisement" :src='adPic[0].AdUrl'>
                </div>
                <ul id="firstTabItem">
                    <li v-for="item in categoryList">
                        <a href="javascript:;" id='_{{item.ObjectID}}' @click="excuteAction(item)" @focus="isFoucs=true" @blurs="isFoucs=false">
                            <div class="imgFrame">
                                <img v-bind:src='getNormalIcon(item)'>
                                <img v-bind:src='getFocusIcon(item)'>
                                <div class="breatheFrame"></div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from '../Tools/Loading.vue';
import store from '../../vuex/store.js';
import Http from '../../assets/lib/Http';
import {
    updateLastPicList,
    updateFirstClassTab,
    updateFirstVideoPlay,
    updateSecondClassTab,
    updateIsMainLayout,
    updateLastStore,
} from '../../vuex/actions.js';
import {
    getFirstClassTab,
    getFirstVideoPlay,
    getIsMainLayout,
} from '../../vuex/getters.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                firstEnter: true,
                exitTime: 0,
                bgimg: '',
                adPic: [{
                    AdUrl: ''
                }],
                showLoading: true,
                categoryList: [{
                    PictureList: {
                        Picture: [{
                            PictureUrl: '',
                        }, {
                            PictureUrl: '',
                        }, {
                            PictureUrl: '',
                        }, {
                            PictureUrl: '',
                        }, {
                            PictureUrl: '',
                        }, ]
                    }
                }],
                isFoucs: false,
            };
        },
        methods: {

            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            //取正常图片
            getNormalIcon(item) {
                var tempPicList = item.PictureList.Picture;
                for (var i = 0; i < tempPicList.length; i++) {
                    if (tempPicList[i].PictureType == 13) {
                        return tempPicList[i].PictureUrl;
                    }
                }
            },
            //取高亮图片
            getFocusIcon(item) {
                var tempPicList = item.PictureList.Picture;
                for (var i = 0; i < tempPicList.length; i++) {
                    if (tempPicList[i].PictureType == 14) {
                        return tempPicList[i].PictureUrl;
                    }
                }

            },
            listenBackKey() {
                document.querySelector('#firstCategoryLayout').addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        // this.$dispatch("stopVideo");
                        history.back();
                    }
                });
            },
            getRootCategoryData(categoryId) {
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
                            "LangCode": sessionStorage.getItem("currLangCode"),
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "UserID": sessionStorage.getItem("UserID"),
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.adPic = _msgBody.AdList.Ad;

                                const tmpAdImgs = _this.adPic.filter(item => {
                                    return item.AdPosNo === "pos00";
                                });
                                // 暂时只取了第一张
                                if (tmpAdImgs.length > 0) {
                                    _this.bgimg = tmpAdImgs[0].AdUrl;
                                }

                                _this.categoryList = _msgBody.ChildrenObjectList.Object;

                                _this.$nextTick(() => {
                                    if (!_this.firstClassTab == 0) {
                                        document.getElementById("_" + _this.firstClassTab).focus();
                                    } else {
                                        var categary = document.getElementById("firstTabItem");
                                        categary.children[0].children[0].focus();
                                    }
                                    _this.EPGLog({
                                        OperationCode: '主页获取列表数据',
                                        Detail: 'success',
                                    });
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

            excuteAction(item) {
                var _this = this;
                // console.log(item);
                // console.log(item.ObjectID);
                // console.log(item.RelatedAction);
                this.updateFirstClassTab(item.ObjectID);
                this.updateSecondClassTab(0);
                switch (item.RelatedAction) {
                    case "iptv":
                        // this.$dispatch("stopVideo");
                        this.$nextTick(() => {
                            // window.location.href ="http:222.221.25.243:6166/iptv/ppthdplay/apps/index/index_epg.html";
                            var address = sessionStorage.getItem("indexUrl");
                            window.location.href = sessionStorage.getItem("indexUrl");
                           
                        });
                        break;
                    case "weather_list":
                        this.$router.go("/weatherforecast");
                        break;
                    case "global_time":
                        this.$router.go("/worldtime");
                        break;

                    case "single_img":
                        this.$router.go({
                            name: "singleimg",
                            params: {
                                id: item.ObjectID
                            }
                        });
                        break;
                    case "hotel_mall":
                        // this.$router.go({
                        //     name: "singleimg",
                        //     params: {
                        //         id: item.ObjectID
                        //     }
                        // });

                        //改版的特别推荐列表
                        this.$router.go({
                            name: "store",
                            params: {
                                id: item.ObjectID
                            }
                        });

                        break;
                    case "recomm_list":
                        this.$router.go({
                            name: "recommendlist",
                            params: {
                                id: item.ObjectID
                            }
                        });

                        break;
                    case 'show_category':
                    case '':
                        switch (item.ObjectType) {
                            case 1:
                                this.$router.go({
                                    name: "secondcategory",
                                    params: {
                                        id: item.ObjectID
                                    }
                                });
                                break;
                            case 6:
                                const temArr = [];
                                for (var i = 0; i < item.PictureList.Picture.length; i++) {
                                    if (item.PictureList.Picture[i].PictureType == 15) {
                                        temArr.push(item.PictureList.Picture[i]);
                                    }
                                }
                                if (temArr.length == 0) {
                                    console.log("暂时没有详情数据");
                                    return;
                                }
                                this.updateLastPicList(temArr);
                                this.$router.go("/detail");
                                break;
                        }
                        break;
                    default:
                        break;
                }

            },
            EPGLog(params = {OperationCode: '', Detail: ''}) {
                const tmpObj = {
                    "Message": {
                        "MessageType": "EPGLogReq",
                        "MessageBody": {
                            "USERID": Authentication.CTCGetConfig("STBID"),
                            "HostID": sessionStorage.getItem("HostID"),
                            "OperationCode": params.OperationCode,
                            "Detail": params.Detail,
                        },
                    }
                };
                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=EPGLogReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                    },
                    error: function(err) {
                    },
                });
            },
            getObjStr(obj) {
                let str = '';
                for (const key in obj) {
                    str += key + ': ' + obj[key] + '; ';
                }
                return str;
            },
            getCurrLangCodeFromParentWindow () {
                var currLangCode = window.parent.location.search.substr(1).split('=')[1];
                sessionStorage.setItem('currLangCode', currLangCode);
            },
        },

        store: store,
        vuex: {
            actions: {
                updateLastPicList,
                updateFirstClassTab,
                updateFirstVideoPlay,
                updateSecondClassTab,
                updateIsMainLayout,
                updateLastStore,
            },
            getters: {
                firstClassTab: getFirstClassTab,
                firstVideoPlay: getFirstVideoPlay,
                isMainLayout: getIsMainLayout,
            }
        },
        components: {
            Loading,
        },
        ready() {
            // 兼容UT盒子从main_outer.html进入时取不到currLangCode的问题
            if (/main_outer.html/.test(window.parent.location.pathname)) {
                this.getCurrLangCodeFromParentWindow();
            }
            var categary = document.getElementById("firstTabItem");
            categary.children[0].children[0].focus();
            this.listenBackKey();
            this.getRootCategoryData(sessionStorage.getItem("RootCategoryID"));
            this.updateIsMainLayout(true);
            this.updateLastStore(0);

            this.$nextTick(() => {
                if (this.firstVideoPlay) {
                    //this.$dispatch("playVideo");
                    this.updateFirstVideoPlay(false);
                } else {
                    //this.$dispatch("resumeVideo");
                }
            });

        },


}
</script>
