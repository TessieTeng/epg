<style>
html {
    /*font-size: 100px;*/
}
body {
    background-color: black;
}


.bgimg{
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
</style>
<template>
    <!-- 路由外链 -->
    <div>
        <router-view></router-view>
        <!--  <div class="MM">
            <div class="one" id="videoPlay">aaaaaaaaaaaaaaa</div>
            <div class="two" id="videoPlayTotal">ccccccccccccccccccc</div>
        </div> -->
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
                mp: Object,
                mediaStr: null,
                z: 0,
                curTime: -1,
                allTime: -3,
                strUtility: null,

            };
        },
        methods: {
            initMediaPlay() {
                // var playUrl = "http://115.28.104.91:12080/vod/back_video_4M_out.mpg";
                // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/apps/index/SYHOTEL/assets/video/back_video_4M_out.mpg";
                // var playUrl = "http://115.28.104.91:12080/vod/TV.ts";
                // var playUrl = "http://115.28.104.91:12080/vod/503128";
                // var playUrl = "http://192.168.89.116:8081/tv.ts";
                // var playUrl = "http://vod.ovt.ctlcdn.com/iptv2017/LOVEIT/201704/20170428/90000001000000025374837816083896/90000001000000025374837816083896.m3u8";

                // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/hotelapps/index/SYHOTEL/assets/video/back_video_4M_out.mp4";
                // alert(sessionStorage.getItem("bg_media_url"));
                // console.log('bg_media_url: ' + sessionStorage.getItem("bg_media_url"))
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
            //视频播放完毕后跳转
            isEnd() {
                this.curTime = this.mp.getCurrentPlayTime();
                this.allTime = this.mp.getMediaDuration();
                document.getElementById("videoPlay").innerHTML = this.curTime;
                var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
                this.strUtility = Utility.getEvent() + "---" + this.curTime + "---" + this.allTime + "--ID是--" + nativePlayerInstanceId;

                document.getElementById("videoPlayTotal").innerHTML = this.strUtility;

                if ((this.strUtility.match(/EVENT_MEDIA_END/) && this.curTime == this.allTime) || (this.strUtility.match(/EVENT_MEDIA_END/) && this.curTime == 0)) {
                    this.mp.releaseMediaPlayer(nativePlayerInstanceId);
                    window.clearInterval(this.z);
                    const _this = this;
                    setTimeout(function() {
                        _this.initMediaPlay(); //首先初始话mediaplayer对象
                        _this.mp.playFromStart(); //从头开始播放
                        _this.z = setInterval(_this.isEnd, 2000);
                    }, 5000);

                }
            },

            listenBackKey() {
                window.addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 181) {
                        //window.parent.location.href = '../../portal.html';
                        this.$router.go("/firstcategory");
                    }
                });
            },

        },
        events: {
            playVideo() {
                return ;
                // alert("重新播放HAHHAA");
                this.initMediaPlay();
                this.mp.playFromStart(); //从头开始播放

                // setTimeout(setInterval(this.isEnd, 2000), 5000);

                this.z = setInterval(this.isEnd, 2000);
            },
            resumeVideo() {
                return ;
                this.mp.setVideoDisplayArea(0, 0, window.innerWidth, window.innerHeight);
                this.mp.resume();
                this.mp.refreshVideoDisplay();
            },
            pauseVideo() {
                return ;
                this.mp.pause();
                this.mp.setVideoDisplayArea(0, 0, 0, 0);
                this.mp.refreshVideoDisplay();
            },
            stopVideo() {
                return ;
                var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
                this.mp.releaseMediaPlayer(nativePlayerInstanceId);
                // this.mp.stop();
                // alert("关闭视频");
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
