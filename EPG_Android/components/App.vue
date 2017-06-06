<style>
html {
    /*font-size: 100px;*/
}

body {
    background-color: black;
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
    background: url(../assets/images/bg_portal_bottom.png);
    line-height: 166.67px;
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
    border: 1px solid rgba(0,0,0,0);
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
        <iframe name="if_smallscreen" @load="getMediastr" :src="mediaurl" class="media" v-if='showMediaIframe'></iframe>
        <div>
</template>
<script>
import store from '../vuex/store.js';
import {
    updateFirstClassTab,
    updateSecondClassTab
} from '../vuex/actions.js';
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
            };
        },
        methods: {
            initMediaPlay() {
                // var playUrl = "http://vod.ovt.ctlcdn.com/iptv2017/LOVEIT/201704/20170428/90000001000000025374837816083896/90000001000000025374837816083896.m3u8";

                // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/hotelapps/index/SYHOTEL/assets/video/back_video_4M_out.mp4";
                var playUrl = sessionStorage.getItem("playUrl");
                console.log('playUrl' + playUrl);

                // var playUrl = 'rtsp://121.60.246.180:554/vod/00000050280005300791.mpg?userid=sxzxjdh6&stbip=10.225.103.232&clienttype=1&mediaid=&ifcharge=1&time=20170602162426+08&life=172800&usersessionid=184528&vcdnid=vcdn001&boid=001&srcboid=001&columnid=&backupagent=121.60.255.132:1556&ctype=50&playtype=0&Drm=0&EpgId=&programid=00000050280005300791&contname=&fathercont=&bp=0&authid=0&tscnt=0&tstm=0&tsflow=0&ifpricereqsnd=1&nodelevel=3&usercharge=33F6C69FF0F48168DB3A6A69D549BBA4';

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
                this.mp.setSingleMedia(this.mediaStr); //设置媒体播放器播放媒体内容
                this.mp.setAllowTrickmodeFlag(0); //设置是否允许trick操作。 0:允许 1：不允许
                this.mp.setVideoDisplayMode(0);
                this.mp.setVideoDisplayArea(left, top, width, height);
                this.mp.setNativeUIFlag(0); //设置播放器本地UI显示功能 0:允许 1：不允许
                this.mp.setAudioTrackUIFlag(1);
                this.mp.setMuteUIFlag(1);
                this.mp.setAudioVolumeUIFlag(1);
                this.mp.refreshVideoDisplay();
                console.log('mediaUrl: ' + playUrl);
            },

            listenBackKey() {
                var _this = this;
                window.addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    const keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    let virtualKey = "";
                    switch (sessionStorage.getItem('province')) {
                        case '云南':
                            virtualKey = 0x0300;
                            break;
                        case '湖北':
                            virtualKey = 768;
                            break;
                        default:
                            virtualKey = 0x0300;
                            break;
                    }
                    if (keyvalue == 8 && !/\/firstcategory/.test(location.href)) {
                        history.back();
                    } else if (keyvalue == 181) {
                       _this.$router.go("/firstcategory");
                    } else if (keyvalue == virtualKey) {
                        try {
                            // 每次捕获事件只能获取一次Utility.getEvent()
                            let mediaEvent = Utility.getEvent();
                            if (!mediaEvent) {
                                return;
                            }
                            console.log(mediaEvent)
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
                                        return "EVENT_MEDIA_ERROR";
                                        break;
                                    }
                                case "EVENT_MEDIA_END":
                                    {
                                        console.log("播放结束！");
                                        this.mp.playFromStart();
                                        return "EVENT_MEDIA_END";
                                        break;
                                    }
                            }
                        } catch (e) {
                            console.log(e);
                        }

                    }
                });
            },

            //获取mediastr JSON对象   
            getMediastr() {
                var contentID = sessionStorage.getItem('bg_media_url');
                var mediaJson = window.frames["if_smallscreen"].getMediastr(contentID); //32位视频码
                const data = eval(mediaJson);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].mediaUrl);
                    var playUrl = data[i].mediaUrl;
                    sessionStorage.setItem('playUrl', playUrl);
                }
                this.$dispatch('playVideo');
            },



        },
        events: {
            playVideo() {
                if (!this.mp) {
                    this.initMediaPlay();
                }
                this.mp.playFromStart(); //从头开始播放

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
                this.mp.stop();
            },
            setMediaUrl(mediaUrl) {
                this.showMediaIframe = true;
                this.mediaurl = mediaUrl;
            },
        },
        vuex: {
            actions: {
                updateFirstClassTab,
                updateSecondClassTab,

            },
        },
        ready() {
            this.listenBackKey();
            this.updateFirstClassTab(0);
            this.updateSecondClassTab(0);
        },
        store: store,
}
</script>
