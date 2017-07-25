<style>

 html {
     /*font-size: 100px;*/
 }

 body {
     background-color: transparent;
 }

 .bgimg {
     position: fixed;
     top: 0;
     width: 1280px;
     height: 553.33px;
     line-height: 553.33px;
     background-position: center;
     background-size: cover;
 }

 .menuTab {
     position: fixed;
     bottom: 0;
     width: 1280px;
     height: 166.67px;
     background: url(../assets/images/bg_portal_bottom.png) no-repeat;
     line-height: 166.67px;
     background-color: #000;
 }

 .advertisement {
     width: 233.34px;
     height: 140px;
     border-radius: 13.34px;
     float: left;
 }

 .advertisement img {
     margin: 13.34px;
 }

 .menuTab ul {
     list-style: none;
     margin: 0px;
     padding: 0px;
     margin-top: 20px;
     width: auto;
 }

 .menuTab ul li {
     margin-left: 48px;
     float: left;
 }

 .menuTab ul li a {
     display: inline-block;
 }

 .menuTab ul li a img {
     width: 106.67px;
     height: 126.67px;
     border-radius: 13.34px;
     margin: auto;
     position: absolute;
 }

 .menuTab ul li a .imgFrame img:nth-child(1) {
     display: block;
 }

 .menuTab ul li a .imgFrame img:nth-child(2) {
     display: none;
 }

 .menuTab ul li a:focus .imgFrame img:nth-child(1) {
     display: none;
 }

 .menuTab ul li a:focus .imgFrame img:nth-child(2) {
     display: block;
 }

 .imgFrame {
     width: 106.67px;
     height: 126.67px;
     background-color: transparent;
 }

 .breatheFrame {
     width: 106.67px;
     height: 126.67px;
     margin: auto;
     position: absolute;
 }

 .menuTab ul li a:focus .breatheFrame {
     box-shadow: 0 0.67px 6.67px rgba(6, 127, 210, 1);
     border-radius: 13.34px;
     -webkit-animation-timing-function: ease-in-out;
     -webkit-animation-name: breathe;
     -webkit-animation-duration: 2000ms;
     -webkit-animation-iteration-count: infinite;
     -webkit-animation-direction: alternate;
 }

 @-webkit-keyframes breathe {
     100% {
         opacity: 35;
         box-shadow: 0 0.67px 20px rgba(6, 127, 210, 1);
     }
 }

 a {
     background-color: transparent;
 }

 :focus {
     outline: none;
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
 }

 .MM {
     width: 1666.67px;
     height: 133.34px;
     float: left;
     z-index: 100000;
     background-color: pink;
     position: fixed;
     bottom: 333.34px;
 }

 #videoPlay {
     width: 133.34px;
     height: 66.67px;
     float: left;
     background-color: red;
     z-index: 1000;
 }

 #videoPlayTotal {
     width: 133.34px;
     z-index: 1000;
     margin-top: 66.67px;
     font-size: 20px;
     height: 66.67px;
     float: left;
     background-color: green;
 }

 #luyou {
     width: 666.67px;
     height: 333.34px;
 }

 .media {
     width: 1280px;
     height: 553.33px;
     position: fixed;
     left: 0;
     top: 0;
     line-height: 0px;
     background-position: center;
     background-size: cover;
     border: 1px solid rgba(0, 0, 0, 0);
 }

 #debug {
     position: fixed;
     left: 0;
     top: 0;
     width: 40%;
     height: 100%;
     background-color: black;
     color: white;
     z-index: 10000000;
     word-wrap: break-word;
     opacity: 0.3;
     overflow: scroll;
 }
</style>
<template>
    <!-- 路由外链 -->
    <div>
        <router-view></router-view>
        <!--  <div class="MM">
             <div class="one" id="videoPlay">aaaaaaaaaaaaaaa</div>
             <div class="two" id="videoPlayTotal">ccccccccccccccccccc</div>
             </div> -->
        <div id="debug" v-if="isDebug"></div>
        <version-info v-show="isVersionInfoShow"></version-info>
        <iframe name="if_smallscreen" @load="getMediastr" :src="mediaurl" class="media" v-if='showMediaIframe'></iframe>
        <div>
</template>
<script>
 import store from '../vuex/store.js';
 import Http from '../assets/lib/Http.js';
 import {
     updateFirstClassTab,
     updateSecondClassTab,
     updateIsVideoPlay
 } from '../vuex/actions.js';
 import VersionInfo from 'Vues/VersionInfo';
 export default {
     data() {
         return {
             mp: null,
             mediaStr: null,
             z: 0,
             curTime: -1,
             allTime: -3,
             strUtility: null,
             mediaurl: '',
             showMediaIframe: false,

             // 组合键处理器
             keyFnDebugSw1: null, // debug 开关
             keyFnDebugSw2: null,
             keyFn9988: null,
             showEPGVersionInfo: null,
             isVersionInfoShow: false,
             showVersionInfoTimer: null,
             isDebug: false,
         };
     },
     methods: {

         // 组合键定义函数
         defineCombineKeyFn() {
             let showVerInfoCB = () => {
                 this.showVersionInfo();
             };

             let debugOnOff = () => {
                 // 开关的时候都清空下
                 document.querySelector('#debug').innerHTML = '';
                 this.isDebug = !this.isDebug;
                 sessionStorage.setItem('EPG_DEBUG_SWITCHER', this.isDebug ? 'open' : 'close');
             };

             // 9988 组合键弹出版本信息
             this.keyFn9988 = this.combineKeyFunction(
                 showVerInfoCB, [9, 9, 8, 8]
             );

             // 9988 组合键弹出版本信息，兼容键值重复问题
             this.showEPGVersionInfo = this.combineKeyFunction(
                 showVerInfoCB, [9, 9, 9, 9, 8, 8, 8, 8]
             );

             // Debug 开关组合键
             this.keyFnDebugSw1 = this.combineKeyFunction(
                 debugOnOff, [3, 3, 3, 4, 4, 4]
             );
             this.keyFnDebugSw2 = this.combineKeyFunction(
                 debugOnOff, [3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
             );

         },

         defineCombineKeyFnHandler(keycode) {
             this.keyFn9988(keycode)
             this.showEPGVersionInfo(keycode);
             this.keyFnDebugSw1(keycode);
             this.keyFnDebugSw2(keycode);
         },

         debug(obj) {

             // config.js 中配置
             //  && isDebug !== 1
             if (!this.isDebug) {
                 return;
             }

             const debug = document.getElementById('debug');

             let str = '';

             if (typeof(obj) === 'object') {
                 str = JSON.stringify(obj);
             } else {
                 str = '' + obj;
             }

             debug.innerHTML += '[' + str + ']';
         },

         setMediaStr() {

             var playUrl = sessionStorage.getItem("playUrl");

             this.debug('url:' + playUrl);
             this.mediaStr = '[{mediaUrl:"' + playUrl + '",';
             this.mediaStr += 'mediaCode: "jsoncode1",';
             this.mediaStr += 'mediaType:2,';
             this.mediaStr += 'audioType:1,';
             this.mediaStr += 'videoType:1,';
             this.mediaStr += 'streamType:1,';
             this.mediaStr += 'drmType:1,';
             this.mediaStr += 'fingerPrint:0,';
             this.mediaStr += 'copyProtection:1,';
             this.mediaStr += 'allowTrickmode:1,';
             this.mediaStr += 'startTime:0,';
             this.mediaStr += 'endTime:20000,';
             this.mediaStr += 'entryID:"jsonentry1"}]';
         },

         play() {
             // this.debug('play');
             if (sessionStorage.getItem('province') === '云南') {
                 this.setMediaStr();
                 this.mp.setSingleMedia(this.mediaStr);
                 this.mp.playFromStart();
             } else {
                 if (this.mp) {
                     this.stop();
                 }
                 this.initMediaPlay();
                 this.mp.playFromStart();
             }

         },

         stop() {
             if (!this.mp) {
                 return;
             }
             this.mp.stop();
             this.mp.releaseMediaPlayer(this.mp.getNativePlayerInstanceID());
             this.mp = null;
         },

         type(obj) {
             return (
                 Object.prototype.toString
                       .call(obj)
                       .split(' ')[1]
                       .replace(/]/, '')
                       .toLowerCase()
             );
         },

         initMediaPlay() {
             // var playUrl = "http://vod.ovt.ctlcdn.com/iptv2017/LOVEIT/201704/20170428/90000001000000025374837816083896/90000001000000025374837816083896.m3u8";

             // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/hotelapps/index/SYHOTEL/assets/video/back_video_4M_out.mp4";
             //console.log('playUrl' + playUrl);

             // var playUrl = 'rtsp://121.60.246.180:554/vod/00000050280005300791.mpg?userid=sxzxjdh6&stbip=10.225.103.232&clienttype=1&mediaid=&ifcharge=1&time=20170602162426+08&life=172800&usersessionid=184528&vcdnid=vcdn001&boid=001&srcboid=001&columnid=&backupagent=121.60.255.132:1556&ctype=50&playtype=0&Drm=0&EpgId=&programid=00000050280005300791&contname=&fathercont=&bp=0&authid=0&tscnt=0&tstm=0&tsflow=0&ifpricereqsnd=1&nodelevel=3&usercharge=33F6C69FF0F48168DB3A6A69D549BBA4';

             // 云南播放，设置mediaStr和setSingleMedia放到play一起去
             // 因为云南的播放地址可能会发生变化
             var province = sessionStorage.getItem('province');
             if (province !== '云南') {
                 this.setMediaStr();
             }
             this.mp = new MediaPlayer(); //新建一个mediaplayer对象
             var instanceId = this.mp.getNativePlayerInstanceID(); //读取本地的媒体播放实例的标识

             var playListFlag = 0; //Media Player 的播放模式。 0：单媒体的播放模式 (默认值)，1: 播放列表的播放模式
             var videoDisplayMode = 1; //MediaPlayer 对象对应的视频窗口的显示模式. 1: 全屏显示2: 按宽度显示，3: 按高度显示
             var height = window.innerHeight;
             var width = window.innerWidth;
             var left = 0;
             var top = 0;
             var muteFlag = 0; //0: 设置为有声 (默认值) 1: 设置为静音
             var subtitleFlag = 0; //字幕显示
             var videoAlpha = 0; //视频的透明度
             var cycleFlag = 0;
             var randomFlag = 0;
             var autoDelFlag = 0;
             var useNativeUIFlag = 1;
             //初始话mediaplayer对象
             // alert("开始播放$$$");
             this.mp.initMediaPlayer(instanceId, playListFlag, videoDisplayMode,
                                     height, width, left, top, muteFlag, useNativeUIFlag, subtitleFlag, videoAlpha, cycleFlag, randomFlag, autoDelFlag);
             if (province !== '云南') { // 同上
                 this.mp.setSingleMedia(this.mediaStr); //设置媒体播放器播放媒体内容
             }

             // this.mp.setAllowTrickmodeFlag(0); //设置是否允许trick操作。 0:允许 1：不允许
             this.mp.setVideoDisplayMode(0);
             this.mp.setVideoDisplayArea(left, top, width, height);
             if (this.type(this.mp.setNativeUIFlag) === 'function') {
                 this.mp.setNativeUIFlag(0); //设置播放器本地UI显示功能 0:不使用 1：使用
             }

             if (this.type(this.mp.setAudioTrackUIFlag) === 'function') {
                 this.mp.setAudioTrackUIFlag(1);
             }

             if (this.type(this.mp.setMuteUIFlag) === 'function') {
                 this.mp.setMuteUIFlag(1);
             }

             if (this.type(this.mp.setAudioVolumeUIFlag) === 'function') {
                 this.mp.setAudioVolumeUIFlag(1);
             }

             this.mp.refreshVideoDisplay();
             //console.log('mediaUrl: ' + playUrl);
             this.debug('mp:' + this.mp);
         },

         showVersionInfo() {
             this.isVersionInfoShow = true;
             this.mp.pause();

             clearTimeout(this.showVersionInfoTimer);
             this.showVersionInfoTimer = setTimeout(() => {
                 this.hideVersionInfo();
             }, 60 * 1000);
         },

         hideVersionInfo() {
             clearTimeout(this.showVersionInfoTimer);
             this.isVersionInfoShow = false;
             this.mp.resume();
         },

         goToWelcome() {
             if (/^https?:\/\//.test(sessionStorage.getItem("WelcomePageGroupPath"))) {
                 // 链接跳转
                 location.replace(sessionStorage.getItem("WelcomePageGroupPath"));
             } else if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                 // 测试路径
                 location.replace("../../epggroup_welcomes/welcome_test/welcome.html");
             } else {
                 // 正式路径
                 location.replace("../../epggroup_welcomes/welcome_default/welcome.html");
             }
         },

         homepage() { // 首页键处理

             const province = sessionStorage.getItem('province');

             if (province === '云南') {
                 if (this.mp) {
                     this.stop();
                 }
                 this.goToWelcome();
                 return;
             }

             this.debug('location:' + location.href);
             // 如果当前就是首页
             if (/\/firstcategory/.test(location.href)) {
                 return;
             }

             if (this.isVersionInfoShow) {
                 this.hideVersionInfo();
             } else {
                 this.$router.go("/firstcategory");

                 // 云南要重新发起播放请求
                 if (province === '云南') {
                     this.$dispatch('replay');
                 }
             }
         },

         back() {
             const province = sessionStorage.getItem('province');

             if (!/\/firstcategory/.test(location.href)) {
                 history.back();
                 // 云南要重新发起播放请求
                 this.debug(location.href);
                 if (province === '云南'
                     && !/\/scaleimg/.test(location.href)
                     && !/\/secondcategory/.test(location.href)
                 ) {
                     setTimeout(() => {
                         this.$dispatch('replay');
                     }, 100);
                 }
             } else if (this.isVersionInfoShow) {
                 this.hideVersionInfo();
             }
         },

         virtualKey() {
             this.debug('virtualkey in');
             try {
                 // 每次捕获事件只能获取一次Utility.getEvent()
                 let mediaEvent = Utility.getEvent();
                 // this.debug('mediaEvent:' + mediaEvent);
                 if (!mediaEvent) {
                     return;
                 }

                 try {
                     mediaEvent = JSON.parse(mediaEvent);
                 } catch (e) {
                     mediaEvent = mediaEvent.substring(1, mediaEvent.length - 1);
                     const mediaEventParams = mediaEvent.split(",");
                     mediaEvent = {};
                     let tempParams = null;
                     for (let i = 0; i < mediaEventParams.length; i++) {
                         tempParams = mediaEventParams[i].split(":");
                         if (tempParams.length == 2) {
                             mediaEvent[tempParams[0]] = tempParams[1];
                         }
                     }
                 }
                 // 有些key带有双引号
                 for (const key in mediaEvent) {
                     if (mediaEvent.hasOwnProperty(key)) {
                         mediaEvent[key.replace(/\"/g, "")] = mediaEvent[key];
                     }
                 }

                 const mediaEventType = mediaEvent.type.replace(/\"/g, "");
                 this.debug(mediaEventType);
                 switch (mediaEventType) {
                     case "EVENT_MEDIA_BEGINING":
                         {
                             console.log("播放开始！");
                             return "EVENT_MEDIA_BEGINING";
                             break;
                         }
                     case "EVENT_MEDIA_ERROR":
                         {
                             console.log("播放失败，请检查网络！\t错误代码：" + mediaEvent.error_code);
                             this.debug('play error, retry');
                             // this.updateToken();
                             const province = sessionStorage.getItem('province');
                             if (province === '云南' || province === '陕西') {
                                 this.$dispatch('replay');
                             } else {
                                 this.mp.playFromStart();
                             }
                             return "EVENT_MEDIA_ERROR";
                             break;
                         }
                     case "EVENT_MEDIA_END":
                         {
                             console.log("播放结束！");
                             this.debug('play end: ' + sessionStorage.getItem('province'));
                             const province = sessionStorage.getItem('province');
                             // 云南特殊处理，通过广播通知子组件去发起播放请求
                             if (province === '云南' || province === '陕西') {
                                 this.$dispatch("replay");
                             } else {
                                 this.mp.playFromStart();
                             }
                             return "EVENT_MEDIA_END";
                             break;
                         }
                 }
             } catch (e) {
                 this.debug(e);
                 console.log(e);
             }
         },

         volume() {
             var args = arguments;
             var vol = this.mp.getVolume();
             if (args.length <= 0) {
                 return vol;
             } else if (args[0] > 0) { // volume +
                 vol += 5;
             } else if (args[0] < 0) { // volume -
                 vol -= 5;
             }

             // 设置每次加减，按5递增递减
             if (vol % 10 < 5) {
                 vol = vol - vol % 10;
             } else if (vol % 10 > 5) {
                 vol = vol - vol % 10 + 5;
             }

             vol = vol > 100 ? 100
                 : vol < 0 ? 0
                 : vol;

             this.mp.setVolume(vol);
         },

         volumeUp() {
             this.volume(5);
         },

         volumeDown() {
             this.volume(-5);
         },

         setMute() {
             this.mp.setMuteFlag(
                 this.mp.getMuteFlag() == 0 ? 1 : 0
             );
         },

         // listenBackKey() {
         eventHandler(keyEvent) {
             var _this = this;
             var province = sessionStorage.getItem('province');
             // addEventListener('keypress',
             // document.onkeydown = (keyEvent) => {
             keyEvent = keyEvent ? keyEvent : window.event;
             const keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;

             this.defineCombineKeyFnHandler(keyvalue);

             let virtualKey = "";
             switch (sessionStorage.getItem('province')) {
                 case '云南':
                     virtualKey = 0x0300;
                     break;
                 case '湖北':
                     virtualKey = 768;
                     break;
                 case '陕西':
                     virtualKey = 768;
                     break;
                 default:
                     virtualKey = 0x0300;
                     break;
             }

             this.debug(keyvalue);

             switch (keyvalue) {
                 case 8: _this.back(); break;
                 case 181: _this.homepage(); break;
                 case 0x0300:
                 case 768: _this.virtualKey();   return false; break;
                 case 259: _this.volumeUp();     return false; break;
                 case 260: _this.volumeDown();   return false; break;
                 case 261: _this.setMute();      return false; break;
                 default: return true; break;
             }
             // };
         },

         //获取mediastr JSON对象
         getMediastr() {
             var contentID = sessionStorage.getItem('bg_media_url');
             var mediaJson = window.frames["if_smallscreen"].getMediastr(contentID); //32位视频码
             const data = eval(mediaJson);
             for (var i = 0; i < data.length; i++) {
                 //console.log(data[i].mediaUrl);
                 var playUrl = data[i].mediaUrl;
                 sessionStorage.setItem('playUrl', playUrl);
             }
             this.$dispatch('playVideo');
         },

         // 组合键处理
         combineKeyFunction(callback, compoKeys, enable) {
             // 只接受 enable === false 关闭组合键功能
             if (typeof(enable) === 'boolean' && !enable) {
                 return function() {};
             }

             var targetKeyArr = [57, 57, 56, 56]; // 组合键数组，默认：9988
             var currKeyArr = []; // 当前按下的键值组
             var currKeyArrLen = 0; // 键值组长度
             var combiKeySwitch = true; // 组合键开关
             var lastKeyTime = ""; // 记录上一次按键时间点
             var currKeyTime = ""; // 记录当前按下的按键时时间点
             var seconds = 2; // 组合键时间
             var isTimeout = false; // 两次按键是否超时过
             var isSupportTimeout = false; // 是否支持超时
             var _this = this;


             var toString = Object.prototype.toString;

             if (arguments.length > 1) {
                 if (toString.call(arguments[1]) === '[object Array]') {
                     const tmpArr = compoKeys;
                     let tmpValue = -1;
                     for (let i = 0; i < tmpArr.length; i++) {
                         tmpValue = tmpArr[i];
                         // 如果是普通 0-9 数字，转换成键值
                         if (tmpValue >= 0 && tmpValue <= 9) {
                             tmpArr[i] = tmpValue + 48;
                         }
                     }
                     targetKeyArr = [].slice.call(tmpArr, 0);
                 } else if (typeof(arguments[1]) === 'string') {
                     targetKeyArr = arguments[1].split('');
                     for (let j = 0; j < targetKeyArr.length; j++) {
                         targetKeyArr[i] = parseInt(targetKeyArr[i], 10);
                     }
                 }
             }
             // 重置数据
             var reset = function() {
                 currKeyArr = [];
                 currKeyTime = "";
                 lastKeyTime = "";
             };

             this.debug('target:' + JSON.stringify(targetKeyArr));
             // 缓存在允许时间内（seconds）按下的按键
             var buffer = function(__code) {

                 if (!combiKeySwitch) { return; }

                 if (currKeyArr.length < targetKeyArr.length) {

                     // 缓存当前按键
                     currKeyArr.push(__code);

                     _this.debug('curr:' + JSON.stringify(currKeyArr));

                     // 判断按下的按键键值是否和组件键值匹配
                     for (var j = 0; j < currKeyArr.length; j++) {
                         if (currKeyArr[j] !== targetKeyArr[j]) {
                             reset();
                             return;
                         }
                     }

                     // 按键数达到组合键数了
                     if (currKeyArr.length === targetKeyArr.length) {

                         // 这个 if 可省略
                         if (currKeyArr.toString() === targetKeyArr.toString()) {
                             // TODO 组合键成功，执行业务行为
                             _this.debug('combine key got!');
                             if (callback) { callback(); }
                         }

                         // 组合成功或者按键数达到组合键键数量，都需要重置
                         reset();
                     }
                 }
             };

             var checkWithTimeout = function() {
                 // 下面是支持超时机制情况
                 var delta = currKeyTime - lastKeyTime;

                 if (delta < seconds * 1000) {
                     isTimeout = false;
                     buffer(__keycode);
                 } else { // 两次按键超过允许值，重新开始
                     isTimeout = true;
                     reset();
                 }
             };

             // 校验按键是否超时，超时标识组合键失败
             var check = function(__keycode) {

                 // 不支持两个键的间隔超时机制情况
                 if (!isSupportTimeout) {
                     isTimeout = false;
                     buffer(__keycode);
                 } else { // 支持超时机制
                     checkWithTimeout();
                 }

             };

             return function(__keycode) {

                 //记下此次按键的时间
                 lastKeyTime = currKeyTime;

                 currKeyTime = new Date().getTime();

                 if (!lastKeyTime || lastKeyTime == "") {
                     lastKeyTime = currKeyTime;
                 }

                 check(__keycode);
             };
         },

         getIp(url) {
             return url.match(/^(https?:\/\/.*[:\d+])\//)[1];
         },

         getProgramInfo() {
             const _this = this;
             let UrlOrigin = sessionStorage.getItem('UrlOrigin');
             const USERID = sessionStorage.getItem('USERID');
             const UserToken = sessionStorage.getItem('UserToken');
             const contentID = sessionStorage.getItem('bg_media_url');
             const EPGIP = sessionStorage.getItem('EPGIP');
             /**
              * 详情请参考文档《电信 EPG 与 BO 接口规范说明》
              * programId、productIDs 可以为空
              * userFlag 为 Authentication.CTCGetConfig('UserID')
              * userToken 为 Authentication.CTCGetConfig('UserToken')
              * contentID 为 视频32位的id，如：90000001000000015984724636843325、90000001000000015985026379023502
              */

             const testLink = sessionStorage.getItem("isFromTestLink");
             this.debug('link type:' + testLink);
             // 如果是测试链接，取链接中的IP
             if (testLink) {
                 UrlOrigin = this.getIp(testLink);
             }
             if (!UrlOrigin || UrlOrigin === 'undefined' || UrlOrigin === undefined) {
                 UrlOrigin = EPGIP || this.getIp(location.href);
             }

             this.debug(''
                      + 'urlOrigin:' + UrlOrigin
                      + ', EPGIP:' + EPGIP
                      + ', testLink:' + testLink
             );

             Http({
                 type: 'GET',
                 url: UrlOrigin + '/GetProgramInfo?programId=78&userFlag=' + USERID + '&userToken=' + UserToken + '&contentID=' + contentID + '&productIDs=',
                 data: '',
                 complete: function(data) {
                     // _this.debug('getProgramInfo:' + data.status);
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
             this.debug('selectionStart')
             const _this = this;
             Http({
                 type: 'GET',
                 url: UrlOrigin + '/SelectionStart?assetId=' + assetId + '&userToken=' + UserToken,
                 data: '',
                 complete: function(data) {
                     // _this.debug('selectionStart:' + data.status)
                     if (data.status === 200) {
                         const res = JSON.parse(data.response);
                         sessionStorage.setItem('playUrl', res.playUrl);

                         // _this.debug('playUrl:' + res.playUrl);
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

     },
     events: {

         replay() {
             this.debug('hubei play:' + this.mp);
             if (sessionStorage.getItem('province') === '云南') {
                 this.getProgramInfo();
             } else {
                 //  if (sessionStorage.getItem('province') === '湖北')
                 this.play();
             }
         },

         playVideo() {

             this.debug('playVideo-mp:' + this.mp);
             if (this.mp) {
                 this.stop();
             }
             this.initMediaPlay();

             if (sessionStorage.getItem('province') === '云南') {
                 this.play();
                 // this.playByWidnow(0, 0, 1280, 720);
             } else {
                 this.mp.playFromStart(); //从头开始播放
             }

             this.updateIsVideoPlay(true);
         },
         resumeVideo() {
             this.mp.setVideoDisplayArea(0, 0, window.innerWidth, window.innerHeight);
             document.querySelector(".media").style.width = '1280px';
             document.querySelector(".media").style.height = '553.33px';
             this.mp.resume();
             this.mp.refreshVideoDisplay();
         },
         pauseVideo() {
             this.mp.pause();
             this.mp.setVideoDisplayArea(0, 0, 0, 0);
             document.querySelector(".media").style.width = '0px';
             document.querySelector(".media").style.height = '0px';
             this.mp.refreshVideoDisplay();
         },
         stopVideo() {
             // var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
             // this.mp.releaseMediaPlayer(nativePlayerInstanceId);
             // this.mp.stop();
             this.stop();
         },
         setMediaUrl(mediaUrl) {
             this.showMediaIframe = true;
             this.mediaurl = mediaUrl;
         },

         gotowelcome() {
             if (/^https?:\/\//.test(sessionStorage.getItem("WelcomePageGroupPath"))) {
                 // 链接跳转
                 location.replace(sessionStorage.getItem("WelcomePageGroupPath"));
             } else if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                 // 测试路径
                 location.replace("./epggroup_welcomes/welcome_test/welcome.html");
             } else {
                 // 正式路径
                 location.replace("./epggroup_welcomes/welcome_default/welcome.html");
             }
         },
     },
     vuex: {
         actions: {
             updateFirstClassTab,
             updateSecondClassTab,
             updateIsVideoPlay
         },
     },
     components: {
         VersionInfo,
     },
     ready() {

         var _this = this;

         this.isDebug = sessionStorage.getItem('EPG_DEBUG_SWITCHER') === 'open';
         // 茁壮中间件默认焦点框问题
         if (!!window.iPanel) {
             iPanel.focusWidth = 0;
         }

         this.defineCombineKeyFn();

         // this.listenBackKey();
         var keyHandler = function(event) {
             _this.eventHandler(event);
         };
         document.onkeypress = keyHandler;
         document.onkeydown = keyHandler;

         this.updateFirstClassTab(0);
         this.updateSecondClassTab(0);
     },
     store: store,

     beforeDestroy() {
         this.stop();
     },

 }
</script>
