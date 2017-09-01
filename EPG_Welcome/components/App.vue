<style>
 /*html {
    font-size: 100px;
    }*/

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
     opacity: 0.6;
     overflow: scroll;
 }
</style>
<template>
    <div id="app">
        <template-one></template-one>
        <volume :mp="mp"></volume>
        <div id="debug" v-if="isDebug"></div>
        <iframe name="if_smallscreen" @load="getMediastr" :src="mediaurl" v-if='showMediaIframe'></iframe>
    </div>
</template>
<script>
 import store from '../vuex/store.js';
 import TemplateOne from 'Vues/TemplateOne';
 import Http from '../assets/lib/Http.js';
 import Volume from 'Vues/Volume';
 export default {
     data() {
         return {
             welcomePath: sessionStorage.getItem("WelcomePageGroupPath"),
             MainPath: sessionStorage.getItem("MainPath"),
             mp: null,
             mediaStr: null,
             mediaurl: '',
             showMediaIframe: false,
             isDebug: false,
         };
     },
     methods: {
        EPGLog(params = {
             OperationCode: '',
             Detail: '',
         }) {

             const path = sessionStorage.getItem("WelcomePageGroupPath");

             const tmpObj = {
                 "Message": {
                     "MessageType": "EPGLogReq",
                     "MessageBody": {
                         "USERID": sessionStorage.getItem("USERID"),
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

         debug(obj) {

             // config.js 中配置
             //  && isDebug !== 1
             if (!this.isDebug) { return; }

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

             if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                    this.EPGLog({
                        OperationCode: 'welcome_setMediaStr',
                        Detail: JSON.stringify({
                            PlayUrl: playUrl,
                            mediaStr: this.mediaStr,
                        })
                    });
             }
         },

         play() {
             this.debug('play');
             this.setMediaStr();
             this.mp.setSingleMedia(this.mediaStr);
             this.mp.playFromStart();

             if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                    this.EPGLog({
                        OperationCode: 'welcome_play',
                        Detail: JSON.stringify({
                            EnterPlay: "play",
                        })
                    });
             }
         },

         stop() {
             if (!this.mp) { return; }
             this.mp.stop();
             this.mp.releaseMediaPlayer(this.mp.getNativePlayerInstanceID());
             this.mp = null;

             if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                    this.EPGLog({
                        OperationCode: 'welcome_stop',
                        Detail: JSON.stringify({
                            EnterStop: "stop",
                        })
                    });
             }
         },

         initMediaPlay() {
             var playUrl = sessionStorage.getItem("playUrl");
             // var playUrl = 'rtsp://121.60.246.180:554/vod/00000050280005300791.mpg?userid=sxzxjdh6&stbip=10.225.103.232&clienttype=1&mediaid=&ifcharge=1&time=20170602162426+08&life=172800&usersessionid=184528&vcdnid=vcdn001&boid=001&srcboid=001&columnid=&backupagent=121.60.255.132:1556&ctype=50&playtype=0&Drm=0&EpgId=&programid=00000050280005300791&contname=&fathercont=&bp=0&authid=0&tscnt=0&tstm=0&tsflow=0&ifpricereqsnd=1&nodelevel=3&usercharge=33F6C69FF0F48168DB3A6A69D549BBA4';

             // 云南播放，设置mediaStr和setSingleMedia放到play一起去
             // 因为云南的播放地址可能会发生变化
             var province = sessionStorage.getItem('province');
             if (province !== '云南') {
                 this.setMediaStr();
             }

             this.mp = new MediaPlayer(); //新建一个mediaplayer对象
             var instanceId = this.mp.getNativePlayerInstanceID(); //读取本地的媒体播放实例的标识

             if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                    this.EPGLog({
                        OperationCode: 'welcome_initMediaPlay',
                        Detail: JSON.stringify({
                            initMediaMp: this.mp,
                            Province: province,
                            PlayUrl: playUrl
                        })
                    });
             }

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
             this.mp.initMediaPlayer(instanceId, playListFlag, videoDisplayMode,
                                     height, width, left, top, muteFlag, useNativeUIFlag, subtitleFlag, videoAlpha, cycleFlag, randomFlag, autoDelFlag);
             if (province !== '云南') { // 同上
                 this.mp.setSingleMedia(this.mediaStr); //设置媒体播放器播放媒体内容
             }
             // this.mp.setAllowTrickmodeFlag(0); //设置是否允许trick操作。 0:允许 1：不允许
             this.mp.setVideoDisplayMode(0);
             this.mp.setVideoDisplayArea(left, top, width, height);
             // this.mp.setNativeUIFlag(0); //设置播放器本地UI显示功能 0:允许 1：不允许
             // this.mp.setAudioTrackUIFlag(1);
             if (this.mp.setNativeUIFlag) {
                 this.mp.setNativeUIFlag(0);
             }
             // this.mp.setMuteUIFlag(1);
             // this.mp.setAudioVolumeUIFlag(1);
             this.mp.refreshVideoDisplay();
         },

         //获取mediastr JSON对象
         getMediastr() {
             var contentID = sessionStorage.getItem('welcomeMediaUrl');
             var mediaJson = window.frames["if_smallscreen"].getMediastr(contentID); //32位视频码
             const data = eval(mediaJson);
             for (var i = 0; i < data.length; i++) {
                 var playUrl = data[i].mediaUrl;
                 sessionStorage.setItem('playUrl', playUrl);
             }
             this.$dispatch('playVideo');
         },

         // listenVideoKey() {
         eventHandler(keyEvent) {
             var _this = this;
             keyEvent = keyEvent ? keyEvent : window.event;
             const keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
             let virtualKey = "";
             const province = sessionStorage.getItem('province');
              if (_this.welcomePath === 'test'&& _this.MainPath === 'test'){
             _this.EPGLog({
                 OperationCode: 'welcome_eventHandler',
                 Detail: JSON.stringify({
                    Keyvalue:keyvalue,
                    Province:province,
                    StbType:Authentication.CTCGetConfig('STBType'),
                })
             });
            }

             switch (province) {
                 case '云南':
                     virtualKey = 0x0300;
                     break;
                 case '陕西':
                 case '湖北':
                     virtualKey = 768;
                     break;
                 default:
                     virtualKey = 0x0300;
                     break;
             }

             this.debug('key:' + keyvalue);

             // 兼容陕西创维 E8200 不支持行内事件处理
             if (province === '陕西') {
                 const stbType = Authentication.CTCGetConfig('STBType');
                 const typeArr = [
                     'E8200',
                     'E900-S',
                     'HT670-GP-V'
                 ];
                 if (typeArr.indexOf(stbType) >= 0) {
                     if (keyvalue === 37) {
                         this.$broadcast('tochinese');
                     } else if (keyvalue === 39) {
                         this.$broadcast('toenglish');
                     } else if (keyvalue === 13) {
                         this.$broadcast('gotomain');
                     }

                     return false;
                 }
             }

             switch (keyvalue) {
                 case 259: this.$broadcast('evolume', 5); return false; break;
                 case 260: this.$broadcast('evolume', -5); return false; break;
                 case 0x0300:
                 case 768: this.virtualKey(); return false; break;
                 default: return true;
                     break;
             }

         },

         virtualKey() {
             try {
                 // 每次捕获事件只能获取一次Utility.getEvent()
                 let mediaEvent = Utility.getEvent();
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
                 this.debug('type:' + mediaEventType)
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
                             // this.updateToken();

                             // 播放失败了，显示欢迎页
                             if (sessionStorage.getItem('province') === '云南') {
                                 this.$dispatch('replay');
                             }else if (sessionStorage.getItem('province') === '河南') {
                                 this.$dispatch('playVideo');
                             }
                             return "EVENT_MEDIA_ERROR";
                             break;
                         }
                     case "EVENT_MEDIA_END":
                         {
                             console.log("播放结束！");
                             // 播放结束显示欢迎页
                             if (sessionStorage.getItem('province') === '云南') {
                                 this.$dispatch('replay');
                             }else if (sessionStorage.getItem('province') === '河南') {
                                 this.$dispatch('playVideo');
                             }else {
                                 this.mp.playFromStart();
                             }
                             return "EVENT_MEDIA_END";
                             break;
                         }
                 }
             } catch (e) {
                 console.log(e);
             }

              if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                this.EPGLog({
                    OperationCode: 'welcome_virtualKey',
                    Detail: JSON.stringify({
                        MediaEvent:mediaEvent?JSON.parse(mediaEvent):mediaEvent,
                        MediaEventType:mediaEventType,
                        Province:sessionStorage.getItem('province'),
                    })
                });
             }
         },

         getIp(url) {
             if (!str || str === '') {
                 return null;
             }

             return str.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+(\:\d+)?/)[0];
         },

         getProgramInfo() {
             const _this = this;
             let UrlOrigin = sessionStorage.getItem('UrlOrigin');
             const USERID = sessionStorage.getItem('USERID');
             const UserToken = sessionStorage.getItem('UserToken');
             const contentID = sessionStorage.getItem('welcomeMediaUrl');
             const EPGIP = sessionStorage.getItem('EPGIP');

             /**
              * 详情请参考文档《电信 EPG 与 BO 接口规范说明》
              * programId、productIDs 可以为空
              * userFlag 为 Authentication.CTCGetConfig('UserID')
              * userToken 为 Authentication.CTCGetConfig('UserToken')
              * contentID 为 视频32位的id，如：90000001000000015984724636843325、90000001000000015985026379023502
              */
             const testLink = sessionStorage.getItem("isFromTestLink");
             // 如果是测试链接，取链接中的IP
             if (testLink) {
                 UrlOrigin = this.getIp(testLink);
             }

             if (!UrlOrigin || UrlOrigin === 'undefined' || UrlOrigin === undefined) {
                 UrlOrigin = EPGIP || this.getIp(location.href);
             }

             this.debug(''
                      + 'urlOrigin:' + UrlOrigin
                      + 'EPGIP:' + EPGIP
                      + 'testLink:' + testLink
             );

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
                      if (_this.welcomePath === 'test'&& _this.MainPath === 'test'){
                        _this.EPGLog({
                            OperationCode: 'welcome_getProgramInfo',
                            Detail: JSON.stringify({
                                UrlOrigin: UrlOrigin,
                                EPGIP: EPGIP,
                                TestLink: testLink,
                                USERID: USERID,
                                UserToken: UserToken,
                                contentID: contentID,
                                data: data.status === 200?data.response:data,
                            })
                        });
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

                         _this.debug('get url: ' + res.playUrl);
                         if (res.playUrl && res.playUrl !== '0') {
                             _this.$dispatch("playVideo");
                         }
                     } else {
                         console.log('error: ' + data.status);
                     }

                      if (_this.welcomePath === 'test'&& _this.MainPath === 'test'){
                        _this.EPGLog({
                            OperationCode: 'welcome_selectionStart',
                            Detail: JSON.stringify({
                                UrlOrigin: UrlOrigin,
                                AssetId: assetId,
                                UserToken: UserToken,
                                data: data.status === 200?data.response:data,
                            })
                        });
                    }
                 },
                 error: function(err) {
                     console.log(err);
                 },
             });
         },

     },
     components: {
         TemplateOne,
         Volume,
     },

     beforeDestroy() {
         this.stop();
     },

     events: {
         welcomeDebug(str) {
             this.debug(str);
         },

         replay() {
             this.debug('replay-mp:' + this.mp);
             this.getProgramInfo();

             if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                this.EPGLog({
                    OperationCode: 'welcome_replay',
                    Detail: JSON.stringify({
                        ReplayMp: this.mp,
                    })
                });
             }
         },

         playVideo() {

             this.debug('playVideo-mp:' + this.mp);
             if (this.mp) { this.stop(); }
             this.initMediaPlay();

             const province = sessionStorage.getItem('province');
             if (province === '云南' || province === '深圳') {
                 this.play();
                 // this.playByWidnow(0, 0, 1280, 720);
             } else {
                 this.mp.playFromStart(); //从头开始播放
             }

            if (this.welcomePath === 'test'&& this.MainPath === 'test'){
                    this.EPGLog({
                        OperationCode: 'welcome_playVideo',
                        Detail: JSON.stringify({
                            PlayVideoMp: this.mp,
                            Province: province,
                        })
                    });
                }
             // this.updateIsVideoPlay(true);
         },

         stopVideo() {
             this.stop();
         },

         setMediaUrl(mediaUrl) {
             this.showMediaIframe = true;
             this.mediaurl = mediaUrl;
         },
     },
     store: store,
     ready() {
         // 茁壮中间件默认焦点框问题
         if (!!window.iPanel) {
             iPanel.focusWidth = 0;
         }

         this.isDebug = sessionStorage.getItem('EPG_DEBUG_SWITCHER') === 'open';
         /* this.isDebug = true;*/
         this.debug('location:' + window.location.href);
         console.log('STBType: ' + Authentication.CTCGetConfig('STBType'));

         if (this.welcomePath === 'test'&& this.MainPath === 'test'){
             this.EPGLog({
                 OperationCode: 'welcome_进入...',
                 Detail: JSON.stringify({
                    location:window.location.href,
                    STBType:Authentication.CTCGetConfig('STBType'),
                })
             });
         }

         var _this = this;
         //监控视频动作触发的虚拟按键
         // this.listenVideoKey();
         var keyHandler = function (event) {
             _this.eventHandler(event);
         };
         document.onkeypress = keyHandler;
         document.onkeydown = keyHandler;

     },
 }
</script>
