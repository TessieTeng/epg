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
     background: url(../../assets/images/bg_path1.png) no-repeat;
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

 #fc-debug {
     position: fixed;
     right: 0;
     top: 0;
     width: 40%;
     height: 100%;
     background-color: black;
     color: white;
     z-index: 10000000;
     word-wrap: break-word;
     opacity: 0.6;
     overflow: scroll;
 }
</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="kexin"  v-show="showKeXin" :style="{'height':Height + 'px','left':Left + 'px', 'top':Top + 'px','width':Width + 'px','background': 'url(' + BgImageUrl +  ')'}">
                <div class="info" :style="{'height':RoomMsg.TextHeight + 'px','left':RoomMsg.TextLeft + 'px', 'top':RoomMsg.TextTop + 'px','width':RoomMsg.TextWidth + 'px',}"> {{{RoomMsg.MsgText}}}</div>
                <a href="javascript:;" class="hint" @click="hideNotice">{{RoomMsg.OkButtonText.chiword}}
                </a>
            </div>
            <div class="scrolls" v-if='!!TvmsMsg.MsgText'>
                <marquee class="marquee" behavior="scroll" scrollamount="3" scrolldelay="0" height="50" v-bind:style="{fontSize: TvmsMsg.FontSize + 'px'}" :loop.prop="TvmsMsg.ScrollTimes">
                    {{TvmsMsg.MsgText}}
                </marquee>
            </div>
            <div class="bgimg" :style='{"background-image": "url(" + bgimg +  ")"}' v-if='!hasVideo'></div>
            <div class="menuTab">
                <div class="advertisement">
                    <img class="advertisement" v-bind:src='adPic'>
                </div>
                <ul id="firstTabItem">
                    <li v-for="(index, item) in currCategoryList">
                        <a href="javascript:;" id='_{{item.ObjectID}}' @click="excuteAction(item)" @focus="itemFocus(index)" @blurs="itemBlurs(index)" @keydown.left.right="turnPage(index, $event)" @keypress.left.right="turnPage(index, $event)">
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
        <div id="fc-debug" v-if="isDebug"></div>
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
             showKeXin: false,
             isDebug: false,
             isRequestStatus: false,
             firstEnter: true,
             exitTime: 0,
             hasVideo: false,
             bgimg: '',
             adPic: '',
             showLoading: true,
             currCategoryList: [],
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

             // 更新数据方式
             menuCount: 6,
             dataIdx: 0,
             currPage: 0,
             menuTotal: 0,
             tipType: 0,

         };
     },

     watch: {
         'dataIdx': function(newV, oldV) {
             this.refresh();
         },
         'RoomMsg': function(RoomMsg) {
             if (RoomMsg.length != 0) {
                 setTimeout(() => {
                     if (this.isFirstEnterKeXin) {
                         this.showKeXin = true;
                         this.updateIsFirstEnterKeXin(false) ;
                     }
                 }, 3000);

             } else {
                 this.showKeXin = false;
             }
         },
         showKeXin: function(showKeXin) {
             if (showKeXin) {
                 document.querySelector(".hint").style.visibility = 'visible';
                 document.querySelector(".hint").focus();
                 this.preventKey();
                 this.updateIsFirstEnterKeXin(false);
             }
         }
     },

     methods: {

         show(els, type) {

             let visible = type ? 'visible' : 'hidden';

             if (!Array.isArray(els)) {
                 els.style.visibility = visible;
             } else {
                 for (let i = 0; i < els.length; i++) {
                     els[i].style.visibility = visible;
                 }
             }
         },

         focusOne(idx) {
             this.debug('focus idx:' + idx);
             this.$nextTick(() => {
                 // if (!this.firstClassTab == 0) {
                 //     document.getElementById("_" + this.firstClassTab).focus();
                 // } else {
                 var categary = document.getElementById("firstTabItem");
                 var lis = categary.getElementsByTagName('li');
                 lis[idx].children[0].focus();
                 // categary.children[idx].children[0].focus();
                 // }
             });
         },

         refresh() {
             this.currCategoryList = this.categoryList.slice(this.dataIdx, this.dataIdx + this.menuCount);
         },

         turnPage(idx, event) {
             let code = event.which ? event.which : event.keyCode;

             this.debug('' + 'idx:' + idx + ', tpcode:' + code + ', count:' + this.menuCount + ', len:' + this.categoryList.length);

             // 栏目数不足6个的时候不翻页
             if (this.categoryList.length <= this.menuCount) {
                 return;
             }

             if (idx === 0 && code === 37 && this.dataIdx >= this.menuCount - 1) {
                 this.currPage--;
                 this.dataIdx = this.currPage * this.menuCount;
                 this.focusOne(this.menuCount - 1);
             } else if (idx === this.menuCount - 1 && code === 39 && this.dataIdx !== this.menuTotal - 1) {
                 this.currPage++;
                 this.dataIdx = this.currPage * this.menuCount;
                 this.focusOne(0);
             }

             /*
                this.debug(''
                + 'key:' + code
                + ', page:' + this.currPage
                + ', idx:' + idx
                + ', dataIdx:' + this.dataIdx
                + ', total:' + this.menuTotal
                );*/
         },

         itemFocus(idx) {
         	 sessionStorage.setItem("jumpindex", idx);
             this.isFocus = true;

             // 提示问题暂时保留[TODO]
             return;

             if (idx === 0 && this.dataIdx > 0) {
                 this.tipType = 1;
             } else if (idx === this.menuCount - 1 && this.dataIdx < this.menuTotal - 1) {
                 this.tipType = 2;
             } else {
                 this.tipType = 0;
             }
         },

         itemBlurs(idx) {
             this.isFocus = false;
         },

         debug(obj) {

             // config.js 中配置
             //  && isDebug !== 1
             if (!this.isDebug) {
                 return;
             }

             const debug = document.getElementById('fc-debug');

             let str = '';

             if (typeof(obj) === 'object') {
                 str = JSON.stringify(obj);
             } else {
                 str = '' + obj;
             }

             debug.innerHTML += '[' + str + ']';
         },
         responsiveWidth() {
             // return;
             const menuTab = document.querySelector('.menuTab');
             const firstTabItem = document.getElementById('firstTabItem');
             const ad = document.querySelector('.advertisement');
             const lis = firstTabItem.getElementsByTagName('li');
             const len = this.categoryList.length;
             let mw = 0,
                 liw = 0,
                 li0 = lis[0];

             this.menuLeft = ad.offsetLeft + ad.offsetWidth;
             this.itemLis = lis;

             liw = li0.offsetWidth;

             // 菜单栏的实际总宽度
             mw = this.menuLeft + len * liw + 48;

             this.baseLeft = this.menuLeft;

             this.rootW = document.querySelector('.rootDiv').offsetWidth;

             menuTab.style.width = mw + 'px';
         },

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
                             _this.currCategoryList = _this.categoryList.slice(0, _this.menuCount);
                             _this.menuTotal = _this.categoryList.length;

                             _this.$nextTick(() => {
                                 if (!_this.firstClassTab == 0) {
                                     document.getElementById("_" + _this.firstClassTab).focus();
                                 } else {
                                     var categary = document.getElementById("firstTabItem");
                                     var jumpindex = sessionStorage.getItem("jumpindex");
                                     var myIndex = parseInt(jumpindex);
                                     categary.children[myIndex].children[0].focus();
                                 }

                                 // 菜单栏宽度
                                 // _this.responsiveWidth();
                                var welcomePath = sessionStorage.getItem("WelcomePageGroupPath"); 
                                var MainPath = sessionStorage.getItem("MainPath");
                                if (welcomePath === 'test'&& MainPath === 'test'){
                                     _this.EPGLog({
                                         OperationCode: '主页获取列表数据',
                                         Detail: 'success',
                                     });
                                }
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
             const province = sessionStorage.getItem('province');
             switch (item.RelatedAction) {
                 case "iptv":

                     // 需要停止视频播放，但是不去释放资源
                     this.$dispatch("stopVideo");
                     this.$nextTick(() => {
                         if (sessionStorage.getItem('province') === '河南') {
                             sessionStorage.setItem('Main2ChannelURL', window.location.href);
                             window.parent.location.href = '../../clist/index2.html';
                             return;
                         }
                         var address = sessionStorage.getItem("indexUrl");
                         if (province === '陕西') {
                             window.location.href = sessionStorage.getItem("indexUrl");
                         }else if(province === '深圳'){
                             var relatedInfo = item.RelatedInfo;
                             let domain = Authentication.CTCGetConfig('EPGDomain');
                             let ip = this.getIp(domain);
                             let epgip = sessionStorage.getItem('EPGIP') || "219.133.42.120:4181";
                             if(relatedInfo === ""){
                                 window.parent.location.href = sessionStorage.getItem("indexUrl");
                             }else if (relatedInfo.indexOf("=")>0) {
                                 window.parent.location.href = ip +'/EPG/jsp/'+ relatedInfo+'&returnurl=http://'+ epgip +'/iptv/portal.html';
                             }else{
                                window.parent.location.href = ip +'/EPG/jsp/'+ relatedInfo+'?returnurl=http%3A%2F%2F'+ epgip +'%2Fiptv%2Fportal.html';
                             }
                         }else {
                             window.parent.location.href = sessionStorage.getItem("indexUrl");
                         }
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
                         if (sessionStorage.getItem('province') === '河南') {
                             window.parent.location.href = sessionStorage.getItem('indexUrl');
                         }
                     });
                     break;
                 case "vod_play":
                     const url = item.RelatedInfo;
                     this.debug('RelatedInfo:' + url);
                     this.$dispatch('stopVideo');
                     this.$router.replace({
                         path: "/mplayer",
                         query: {
                             playUrl: item.RelatedInfo,
                             backUrl: '/firstcategory',
                             isEnablePlayControl: 'disable',
                         },
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
                 case 'overseas_channel':
                     this.$dispatch("stopVideo");
                     this.$nextTick(() => {
                         sessionStorage.setItem('Main2ChannelURL', window.location.href);
                         window.parent.location.href = '../../clist/index2.html';
                         return;
                     });

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
                         "USERID": sessionStorage.getItem("UserID"),
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
                                var welcomePath = sessionStorage.getItem("WelcomePageGroupPath"); 
                                var MainPath = sessionStorage.getItem("MainPath");
                                if (welcomePath === 'test'&& MainPath === 'test'){
                                     _this.EPGLog({
                                         OperationCode: 'GetRoomMsgReq: ',
                                         Detail: 'success',
                                     });
                                }
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


         requestUrlByIfr(url) {

             const ifr = document.createElement('iframe');
             ifr.id = 'requestUrlIfr';
             ifr.style.width = '1px';
             ifr.style.height = '1px';
             ifr.src = url;

             document.body.appendChild(ifr);
         },
         ss(key, vaue) {
             if (!key || key === '') {
                 return false;
             }

             if (value) {
                 sessionStorage.setItem('' + key, value);
                 return true;
             }

             return sessionStorage.getItem('' + key);
         },

         getRtspURL(rtsp) {
             if (!rtsp || rtsp === '') {
                 return false;
             }

             sessionStorage.setItem('playUrl', rtsp);
             this.$dispatch('playVideo');

             let ifr = document.querySelector('requestUrlIfr');
             if (ifr) {
                 document.body.removeChild(ifr);
             }
         },
         getIp(str) {
             if (!str || str === '') {
                 return null;
             }

             return str.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+(\:\d+)?/)[0];
         },
         configShenzhenMediaUrl(contentID) {
             let domain = Authentication.CTCGetConfig('EPGDomain');
             console.log('Domain:' + domain);
             let ip = this.getIp(domain);
             let iptvRequestUrl = this.ss('rtspRequestUrl');

             window.getRtspURL = this.getRtspURL;

             let reqUrl = ip + iptvRequestUrl
                        + '?foreignId=' + contentID
                        + '&callback=getRtspURL';

             console.log('request url: ' + reqUrl);
                                    
             var welcomePath = sessionStorage.getItem("WelcomePageGroupPath"); 
             var MainPath = sessionStorage.getItem("MainPath");
             if (welcomePath === 'test'&& MainPath === 'test'){
                 this.EPGLog({
                     OperationCode: '主页请求播放地址',
                     Detail: reqUrl
                 });
             }

             this.requestUrlByIfr(reqUrl);

         },

         stateInit() {
             this.firstClassTab = getFirstClassTab(store.state);
             this.firstVideoPlay = getFirstVideoPlay(store.state);
             this.isMainLayout = getIsMainLayout(store.state);
             this.isFirstEnterKeXin = getIsFirstEnterKeXin(store.state);
             this.isVideoPlay = getIsVideoPlay(store.state);
         }
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
         }
         /* getters: {*/
         /* firstClassTab: getFirstClassTab,*/
         /* firstVideoPlay: getFirstVideoPlay,*/
         /* isMainLayout: getIsMainLayout,*/
         /* isFirstEnterKeXin: getIsFirstEnterKeXin,*/
         /* isVideoPlay: getIsVideoPlay,*/
         /* }*/
     },
     components: {
         Loading,
     },
     ready() {

         this.stateInit();

         // 兼容UT盒子从main_outer.html进入时取不到currLangCode的问题
         if (/main_outer.html/.test(window.parent.location.pathname)) {
             this.getCurrLangCodeFromParentWindow();
         }

         this.isDebug = sessionStorage.getItem('EPG_DEBUG_SWITCHER') === 'open';
         // 这里去掉，修改多级栏目后，在请求之前调用会报错
         // var categary = document.getElementById("firstTabItem");
         // categary.children[0].children[0].focus();

         document.querySelector("#firstTabItem").style.pointerEvents = 'none';
         this.listenBackKey();
         this.getRootCategoryData(sessionStorage.getItem("RootCategoryID"));
         this.updateIsMainLayout(true);
         this.updateLastStore(0);
         //先隐藏客信，过几秒后显示
         document.querySelector(".hint").style.visibility = 'hidden';
         // switch (sessionStorage.getItem('province')) {
         //     case '云南':
         //     case '河南':
         //     case '陕西':
         //     case '湖北':
         //     case '深圳':
         //        this.getTvmsMsg();
         //        this.getRoomMsg();
         //         break;
         //     default:
         //         break;
         // }
         this.$nextTick(() => {
             this.getTvmsMsg();
             this.getRoomMsg();
             const bgMediaUrl = sessionStorage.getItem('bg_media_url');
             this.debug('' + 'bg_media_url: ' + bgMediaUrl + ', firstPlay: ' + this.firstVideoPlay + ', province: ' + sessionStorage.getItem('province'));
             if (!!bgMediaUrl && bgMediaUrl !== '0'&& bgMediaUrl.indexOf("rtsp")==-1) {
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
                         case '河南':
                         case '陕西':
                             sessionStorage.setItem('playUrl', bgMediaUrl);
                             this.$dispatch('replay');
                             break;
                         case '深圳':
                             this.configShenzhenMediaUrl(bgMediaUrl);
                             break;
                         default:
                             break;
                     }
                 } else {
                     if (!this.isVideoPlay) {
                         this.$dispatch("replay");
                         this.updateIsVideoPlay(true);
                     }
                 }
             }
         });
         var welcomePath = sessionStorage.getItem("WelcomePageGroupPath"); 
         var MainPath = sessionStorage.getItem("MainPath");
         if (welcomePath === 'test'&& MainPath === 'test') {
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
                     IndexUrl: sessionStorage.getItem("indexUrl"),
                     EPGIP: sessionStorage.getItem("EPGIP"),
                     UserToken: sessionStorage.getItem("UserToken"),
                     Token: sessionStorage.getItem("Token"),
                 }),
             });
         }

     }
 }
</script>
