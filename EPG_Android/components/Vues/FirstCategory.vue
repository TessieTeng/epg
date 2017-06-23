<style scoped>
.rootDiv {
    width: 1280px;
    height: 720px;
    position: relative;
    background-color: transparent;
}

.scrolls {
    width: 100%;
    z-index: 50;
    position: fixed;
    background-image: url('../../assets/images/bg_path1.png') no-repeat;
    background-size: cover;
    height: 50px;
    color: white;
}

.marquee {
    text-align: center;
    line-height: 50px;
    font-weight: bold;
}

.kexin {
    position: fixed;
    z-index: 50;
    text-align: center;
    background-position: center;
    background-size: cover;
    margin-top: 10px;
}

.info {
    position: absolute;
    text-align: center;
}

.hint {
    position: absolute;
    text-decoration: none;
    font-size: 24px;
    color: white;
    border-radius: 8px;
    letter-spacing: 4px;
    box-shadow: 0 0 10px 4px #0CC;
    background-color: #222930;
    top: 88%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 36px;
    line-height: 36px;
    padding: 4px 2px;
}

</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="kexin" :style="{'height':Height + 'px','left':Left + 'px', 'top':Top + 'px','width':Width + 'px','background-image': 'url(' + BgImageUrl +  ')'}">
                <div class="info" :style="{'height':RoomMsg.TextHeight + 'px','left':RoomMsg.TextLeft + 'px', 'top':RoomMsg.TextTop + 'px','width':RoomMsg.TextWidth + 'px',}"> {{{RoomMsg.MsgText}}}</div>
                <a href="javascript:;" class="hint" @click="hideNotice">{{RoomMsg.OkButtonText.chiword}}
                </a>
            </div>
            <div class="scrolls" v-if='!!TvmsMsg.MsgText'>
                <marquee class="marquee" behavior="scroll" scrollamount="3" scrolldelay="0" height="50" v-bind:style="{fontSize: TvmsMsg.FontSize + 'px', loop:TvmsMsg.ScrollTimes}">
                    {{TvmsMsg.MsgText}}
                </marquee>
            </div>
            <div class="bgimg" :style='{"background-image": "url(" + bgimg +  ")"}' v-if='!hasVideo'></div>
            <div class="menuTab">
                <div class="advertisement">
                    <img class="advertisement" v-bind:src='adPic'>
                </div>
                <ul id="firstTabItem">
                    <li v-for="item in categoryList">
                        <a href="javascript:;" id='_{{item.ObjectID}}' @click="excuteAction(item)" @focus="isFoucs=true" @blurs="isFoucs=false">
                            <div class="imgFrame">
                                <img v-bind:src='getNormalIcon(item)'>
                                <img v-bind:src='getFocusIcon(item)'>
                                <div class="breatheFrame">
                                </div>
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
    updateIsFirstEnterKeXin,
    updateIsVideoPlay,
} from '../../vuex/actions.js';
import {
    getFirstClassTab,
    getFirstVideoPlay,
    getIsMainLayout,
    getIsFirstEnterKeXin,
    getIsVideoPlay,

} from '../../vuex/getters.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                firstEnter: true,
                exitTime: 0,
                hasVideo: false,
                bgimg: '',
                adPic: '',
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
                TvmsMsg: {
                    PolicyID: "",
                    MsgSeq: "",
                    MsgText: "",
                    ScrollTimes: "",
                    Top: "",
                    Left: "",
                    Width: "",
                    FontSize: "",
                },
                Height: '',
                Left: '',
                Width: '',
                Top: '',
                RoomMsg: [{
                    BgImageSize: '',
                    BgImageUrl: '',
                    MsgText: '',
                    OkButtonText: {
                        wordid: '',
                        variablename: '',
                        chiword: '',
                        engword: '',
                        jpnword: '',
                        korword: '',
                        gerword: '',
                        freword: '',
                        hostid: '',
                    },
                    PolicyID: '',
                    RelatedAction: '',
                    RelatedInfo: '',
                    SubscriptText: '',
                    TextHeight: '',
                    TextLeft: '',
                    TextTop: '',
                    TextWidth: '',
                }],


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
            listenBackKey() {},
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
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.adPic = _msgBody.AdList.Ad;

                                const tmpFullScreenImgs = _this.adPic.filter(item => {
                                    return item.AdPosNo === "pos00";
                                });
                                const tmpLeftBottomImgs = _this.adPic.filter(item => {
                                    return item.AdPosNo === "pos03";
                                });
                                // 暂时只取了第一张
                                if (tmpFullScreenImgs.length > 0) {
                                    _this.bgimg = tmpFullScreenImgs[0].AdUrl;
                                }
                                if (tmpLeftBottomImgs.length > 0) {
                                    _this.adPic = tmpLeftBottomImgs[0].AdUrl;
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
                this.updateFirstClassTab(item.ObjectID);
                this.updateSecondClassTab(0);
                switch (item.RelatedAction) {
                    case "iptv":
                        this.$dispatch("stopVideo");
                        this.$nextTick(() => {
                            if (sessionStorage.getItem('province') === '河南') {
                                sessionStorage.setItem('Main2ChannelURL', window.location.href);
                                window.parent.location.href = '../../clist/index2.html';
                                return;
                            }
                            var address = sessionStorage.getItem("indexUrl");
                            window.parent.location.href = sessionStorage.getItem("indexUrl");
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
                    case "vod_list":

                        this.$dispatch("stopVideo");
                        this.$nextTick(() => {
                            let userId = sessionStorage.getItem('UserID') || Authentication.CUGetConfig('UserID');
                            if (sessionStorage.getItem('province') === '河南') {
                                let ip = sessionStorage.getItem('EPGIP') || "10.253.255.4:8080";
                                window.parent.location.href = ''
                                    + 'http://202.99.114.71:40001/hnlthotel/homePage.html?'
                                    + 'userId=' + userId
                                    + '&carrierId=204&industry=hotel&state=1&categoryid=dc00005223&'
                                    + 'returnurl=http%3A%2F%2F'
                                    + ip + '%2Fiptv%2Fportal.html'
                                return;
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
            EPGLog(params = {
                OperationCode: '',
                Detail: ''
            }) {
                const tmpObj = {
                    "Message": {
                        "MessageType": "EPGLogReq",
                        "MessageBody": {
                            "USERID": sessionStorage.getItem("STBID"),
                            "HostID": sessionStorage.getItem("HostID"),
                            "OperationCode": params.OperationCode,
                            "Detail": params.Detail,
                        },
                    }
                };
                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=EPGLogReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {},
                    error: function(err) {},
                });
            },
            getObjStr(obj) {
                let str = '';
                for (const key in obj) {
                    str += key + ': ' + obj[key] + '; ';
                }
                return str;
            },
            getCurrLangCodeFromParentWindow() {
                var currLangCode = window.parent.location.search.substr(1).split('=')[1];
                sessionStorage.setItem('currLangCode', currLangCode);
            },

            //获得TVMS消息列表
            getTvmsMsg() {
                var _this = this;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetTvmsMsgReq",
                        "MessageBody": {
                            "UserID": sessionStorage.getItem("UserID"),
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetTvmsMsgReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                //暂时取第一个
                                if (!!_msgBody.MsgList && !!_msgBody.MsgList.TvmsMsg && _msgBody.MsgList.TvmsMsg.length > 0) {
                                    _this.TvmsMsg = _msgBody.MsgList.TvmsMsg[0];
                                }
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

            //获得客信消息列表
            getRoomMsg() {
                var _this = this;
                /*   if (this.isRequestStatus) {
                       return;
                   }
                   this.isRequestStatus = true;*/
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetRoomMsgReq",
                        "MessageBody": {
                            "UserID": sessionStorage.getItem("UserID"),
                            "LangCode": this.currentLang,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetRoomMsgReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                if (!!_msgBody.MsgList && !!_msgBody.MsgList.RoomMsg && _msgBody.MsgList.RoomMsg.length > 0) {
                                    _this.Height = _msgBody.Height;
                                    _this.Left = _msgBody.Left;
                                    _this.Top = _msgBody.Top;
                                    _this.Width = _msgBody.Width;
                                    _this.RoomMsg = _msgBody.MsgList.RoomMsg[0];
                                    _this.BgImageUrl = _msgBody.MsgList.RoomMsg[0].BgImageUrl;
                                    _this.chiword = _msgBody.MsgList.RoomMsg[0].OkButtonText.chiword;
                                }
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
            //隐藏客信
            hideNotice() {
                document.querySelector(".kexin").style.visibility = "hidden";
                document.querySelector(".hint").style.visibility = "hidden";
                document.getElementById("firstTabItem").children[0].children[0].focus();
            },
            //拦截客信按键
            preventKey() {
                document.querySelector(".hint").addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    const keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if ((keyvalue == 37) || (keyvalue == 39) || (keyvalue == 38) || (keyvalue == 40)) {
                        keyEvent.returnValue = false;
                    }
                });
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
                updateIsFirstEnterKeXin,
                updateIsVideoPlay,
            },
            getters: {
                firstClassTab: getFirstClassTab,
                firstVideoPlay: getFirstVideoPlay,
                isMainLayout: getIsMainLayout,
                isFirstEnterKeXin: getIsFirstEnterKeXin,
                isVideoPlay: getIsVideoPlay,
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
            document.querySelector("#firstTabItem").style.pointerEvents = 'none';
            this.listenBackKey();
            this.getRootCategoryData(sessionStorage.getItem("RootCategoryID"));
            this.updateIsMainLayout(true);
            this.updateLastStore(0);
            //先隐藏客信，过几秒后显示
            document.querySelector(".hint").style.visibility = 'hidden';
            switch (sessionStorage.getItem('province')) {
                case '云南':
                    break;
                case '河南':
                case '陕西':
                case '湖北':
                    this.getTvmsMsg();
                    setTimeout(() => {
                        if (this.isFirstEnterKeXin) {
                            this.getRoomMsg();
                            document.querySelector(".hint").style.visibility = 'visible';
                            document.querySelector(".hint").focus();
                            this.preventKey();
                            this.updateIsFirstEnterKeXin(false);
                        }
                    }, 3000);
                    break;
                default:
                    break;
            }
            this.$nextTick(() => {
                const bgMediaUrl = sessionStorage.getItem('bg_media_url');
                console.log('bg_media_url: ' + bgMediaUrl);
                if (!!bgMediaUrl && bgMediaUrl !== '0' ) {
                    this.hasVideo = true;
                    if (this.firstVideoPlay) {
                        var zhongxingMediaUrlOrigin = sessionStorage.getItem('zhongxingMediaUrlOrigin');
                        var huaweiMediaUrlOrigin = sessionStorage.getItem('huaweiMediaUrlOrigin');
                        var contentID = sessionStorage.getItem('bg_media_url');
                        this.updateFirstVideoPlay(false);
                        var urls = '';
                        switch (sessionStorage.getItem('province')) {
                            case '云南':
                                this.$dispatch('replay');
                                break;
                            case '湖北':
                                if (sessionStorage.getItem("partner") === "HUAWEI") {
                                    urls = huaweiMediaUrlOrigin + '/EPG/MediaService/SmallScreen.jsp?ContentID=' + contentID + '&GetCntFlag=1';
                                    this.mediaurl = urls;
                                } else {
                                    urls = zhongxingMediaUrlOrigin + '/MediaService/SmallScreen?ContentID=' + contentID + '&GetCntFlag=1';
                                    this.mediaurl = urls;
                                }
                                this.$dispatch('setMediaUrl', this.mediaurl);
                                break;
                            default:
                                break;
                        }
                    } else {
                        if (!this.isVideoPlay) {
                            this.$dispatch("playVideo");
                            this.updateIsVideoPlay(true);
                        }
                    }
                }
            });

            if (sessionStorage.getItem("MainPath") === 'test') {
                this.EPGLog({
                    OperationCode: '盒子信息: ',
                    Detail: JSON.stringify({
                        HostID: sessionStorage.getItem("HostID"),
                        UserID: sessionStorage.getItem("UserID"),
                        USERID: sessionStorage.getItem("USERID"),
                        STBID: sessionStorage.getItem("STBID"),
                        EpgGroupID: sessionStorage.getItem("EpgGroupID"),
                        LoginID: sessionStorage.getItem("LoginID"),
                        RootCategoryID: sessionStorage.getItem("RootCategoryID"),
                        bg_media_url: sessionStorage.getItem("bg_media_url"),
                        EPGDomain: sessionStorage.getItem("EPGDomain"),
                        UserToken: sessionStorage.getItem("UserToken"),
                        Token: sessionStorage.getItem("Token"),
                    }),
                });
            }

        }
}
</script>
