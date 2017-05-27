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
    background-image: url('../../assets/images/bg_path1.png');
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
    background-color: red;
    z-index: 3;
    background-color: #ccc;
    margin-top: 10px;
    /* background-image: url('../../assets/images/message_bg.png');
    background-size: cover;*/
}

.info {
    position: relative;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: black;
    padding: 20px 0;
}

.hint {
    position: relative;
    display: block;
    text-decoration: none;
    text-align: center;
    border-top: 1px solid black;
    width: 100%;
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    color: black;
}

.media {
    width: 1790px;
    height: 552.33px;
    position: fixed;
    line-height: 552.33px;
    background-position: center;
    background-size: cover;
    border: 1px solid #ccc;
}
</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="bgimg">
                <iframe name="if_smallscreen" :src="mediaurl" class="media"></iframe>
            </div>
            <!--     <div class="kexin" :style="{'height':MsgHeight + 'px','left':MsgLeft + 'px', 'top':MsgTop + 'px','width': MsgWidth + 'px'}">
                <div class="info" :style="{'height':MsgHeight-100 + 'px', 'marginLeft':0+ 'px','marinTop':RoomMsg.TextTop + 'px','width':MsgWidth + 'px'}"> {{{RoomMsg.MsgText}}}
                </div>
                <a href="javascript:;" class="hint" @click="hideNotice">{{RoomMsg.OkButtonText}}</a>
            </div>
            <div class="scrolls" v-if='!!TvmsMsg.MsgText'>
                <marquee class="marquee" behavior="scroll" scrollamount="3" scrolldelay="0" height="50" v-bind:style="{fontSize: TvmsMsg.FontSize + 'px', loop:TvmsMsg.ScrollTimes}">
                    {{TvmsMsg.MsgText}}
                </marquee>
            </div> -->
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

                MsgHeight: '',
                MsgLeft: '',
                MsgWidth: '',
                MsgTop: '',
                RoomMsg: {
                    BgImageSize: '',
                    BgImageUrl: '',
                    MsgText: '',
                    OkButtonText: '',
                    PolicyID: '',
                    RelatedAction: '',
                    RelatedInfo: '',
                    SubscriptText: '',
                    TextHeight: '',
                    TextLeft: '',
                    TextTop: '',
                    TextWidth: '',
                },
                mediaurl: '',

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
                document.querySelector('#firstTabItem').addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        // 在主页一级菜单不允许返回
                        // this.$dispatch("stopVideo");
                        // history.back();
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
                // console.log(item);
                // console.log(item.ObjectID);
                // console.log(item.RelatedAction);
                this.updateFirstClassTab(item.ObjectID);
                this.updateSecondClassTab(0);
                switch (item.RelatedAction) {
                    case "iptv":
                        this.$dispatch("stopVideo");
                        this.$nextTick(() => {
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
            getProgramInfo() {
                const _this = this;
                const UrlOrigin = sessionStorage.getItem('UrlOrigin');
                const USERID = sessionStorage.getItem('USERID');
                const UserToken = sessionStorage.getItem('UserToken');
                const contentID = sessionStorage.getItem('bg_media_url');
                /**
                 * 详情请参考文档《电信 EPG 与 BO 接口规范说明》
                 * programId、productIDs 可以为空
                 * userFlag 为 Authentication.CTCGetConfig('UserID')
                 * userToken 为 Authentication.CTCGetConfig('UserToken')
                 * contentID 为 视频32位的id，如：90000001000000015984724636843325、90000001000000015985026379023502
                 */
                Http({
                    type: 'GET',
                    url: UrlOrigin + '/GetProgramInfo?programId=78&userFlag=' + USERID + '&userToken=' + UserToken + '&contentID=' + contentID + '&productIDs=',
                    data: '',
                    complete: function(data) {
                        if (data.status === 200) {
                            const res = JSON.parse(data.response);
                            _this.selectionStart(res.assetId, UrlOrigin, UserToken);
                        } else {
                            console.log('error: ' + data.status);
                        }
                    },
                    error: function(err) {
                        console.log('网络请求错误：' + err);
                    },
                });
            },
            selectionStart(assetId, UrlOrigin, UserToken) {
                const _this = this;
                Http({
                    type: 'GET',
                    url: UrlOrigin + '/SelectionStart?assetId=' + assetId + '&userToken=' + UserToken,
                    data: '',
                    complete: function(data) {
                        if (data.status === 200) {
                            const res = JSON.parse(data.response);
                            sessionStorage.setItem('playUrl', res.playUrl);
                            if (sessionStorage.getItem("MainPath") === 'test') {
                                this.EPGLog({
                                    OperationCode: '获取视频url: ',
                                    Detail: res.playUrl,
                                });
                            }
                            _this.$dispatch("playVideo");
                        } else {
                            console.log('error: ' + data.status);
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    },
                });
            },

            //获得TVMS消息列表
            getTvmsMsg() {
                console.log("getTvmsMsg");
                var _this = this;
                // if (this.isRequestStatus) {
                //     return;
                // }
                // this.isRequestStatus = true;
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
                                console.log("请求消息列表成功");
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
                console.log("getRoomMsg.......");
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
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
                            console.log(_msgBody);
                            if (_msgBody.ResultCode == 200) {
                                if (!!_msgBody.MsgList && !!_msgBody.MsgList.RoomMsg && _msgBody.MsgList.RoomMsg.length > 0) {
                                    console.log("sunccess.......");
                                    _this.MsgHeight = _msgBody.Height;
                                    console.log(_this.MsgHeight);
                                    _this.MsgLeft = _msgBody.Left;
                                    _this.MsgTop = _msgBody.Top;
                                    _this.MsgWidth = _msgBody.Width;
                                    _this.RoomMsg = _msgBody.MsgList.RoomMsg[0];
                                    console.log(_this.RoomMsg);
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

            hideNotice() {
                document.querySelector(".kexin").style.visibility = "hidden";
            },

            getMediaUrl(url) {
                var _this = this;
                console.log('获取湖北电信的视频url.......');
                Http({
                    type: 'GET',
                    url: url,
                    data: '',
                    complete: function(data) {
                        if (data.status === 200) {
                            console.log('请求视频url成功');
                            // _this.EPGLog({
                            //     OperationCode: '华为平台数据',
                            //     Detail: 'test' + data.response,
                            // });
                        } else {
                            console.log('error: ' + data.status);
                        }
                    },
                    error: function(err) {
                        console.log('网络请求错误：' + err);
                    },
                });
            },
            //打印window.frames["if_smallscreen"] 属性
            getparam() {
                var obj = window.frames["if_smallscreen"];
                var temp = "";
                for (var i in obj) { //用javascript的for/in循环遍历对象的属性 
                    temp += i + ":" + obj[i] + "\n";
                }
                obj.MediaPlayer = null
                console.log(temp);
                this.EPGLog({
                    OperationCode: 'window',
                    Detail: temp,
                });

            },

            getMeidstr() {
                var yong = window.frames["if_smallscreen"].getMediastr('695496e7575f4b728f4056782cbaefdf');
                console.log(yong);
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
            var _this = this;
            // 兼容UT盒子从main_outer.html进入时取不到currLangCode的问题
            if (/main_outer.html/.test(window.parent.location.pathname)) {
                this.getCurrLangCodeFromParentWindow();
            }
            var categary = document.getElementById("firstTabItem");
            categary.children[0].children[0].focus();
            this.listenBackKey();
            this.getRootCategoryData(sessionStorage.getItem("RootCategoryID"));
            this.getTvmsMsg();
            this.updateIsMainLayout(true);
            this.updateLastStore(0);
            // setTimeout(() => {
            //     _this.getRoomMsg();
            // }, 5000);

            this.$nextTick(() => {
                if (!!sessionStorage.getItem('bg_media_url')) {
                    //this.hasVideo = false;
                    this.hasVideo = true;
                    if (this.firstVideoPlay) {
                        var host = sessionStorage.getItem('host');
                        var port = sessionStorage.getItem('port');
                        console.log('host>>>>>>' + host);
                        console.log('port>>>>>>' + port);
                        this.updateFirstVideoPlay(false);
                        //this.getProgramInfo();
                        var urls = '';
                        switch (sessionStorage.getItem('province')) {
                            case '云南':
                                this.getProgramInfo();
                                break;
                            case '湖北':
                                if (sessionStorage.getItem("partner") === "HUAWEI") {
                                    console.log("华为平台......");
                                    urls = port + '/EPG/MediaService/SmallScreen.jsp?ContentID=695496e7575f4b728f4056782cbaefdf&Left=0&Top=0&Width=0&Height=0&CycleFlag=2&GetCntFlag=0';
                                    this.mediaurl = urls;
                                    console.log(this.mediaurl);
                                    //this.getMediaUrl(urls);
                                } else {
                                    console.log("中兴平台......");
                                    urls = host + '/MediaService/SmallScreen?Type=ad&ContentID=695496e7575f4b728f4056782cbaefdf&Left=0&Top=0&Width=0&Height=0&CycleFlag=0&GetCntFlag=1';
                                    this.mediaurl = urls;
                                    console.log(this.mediaurl);
                                    // this.getMediaUrl(urls);
                                }
                                break;
                            default:
                                break;
                        }

                        this.$dispatch("playVideo");
                    } else {
                        this.$dispatch("resumeVideo");
                    }
                }
            });
            console.log("0000000000000");
            this.getMeidstr();
            console.log("1111111111111111111");

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
