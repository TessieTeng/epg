<style>
@import url('../assets/css/weui.min.css');
html {
    font-size: 100px;
}

.bgimg {
    position: fixed;
    top: 0;
    width: 19.2rem;
    height: 8.3rem;
    background: url(../assets/images/bg.jpg);
    line-height: 8.3rem;
    background-size: cover;
}

.menuTab {
    position: fixed;
    bottom: 0;
    width: 19.2rem;
    height: 2.5rem;
    background: url(../assets/images/bg_portal_bottom.png);
    line-height: 2.5rem;
}

.advertisement {
    width: 3.5rem;
    height: 2.1rem;
    border-radius: 0.2rem;
    float: left;
}

.advertisement img {
    margin: 0.2rem;
}

.menuTab ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    margin-top: 0.3rem;
    width: auto;
}

.menuTab ul li {
    margin-left: 0.5rem;
    float: left;
}

.menuTab ul li a {
    display: inline-block;
}

.menuTab ul li a img {
    width: 1.6rem;
    height: 1.9rem;
    border-radius: 0.2rem;
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
    width: 1.8rem;
    height: 2.2rem;
    background-color: transparent;
}

.breatheFrame {
    width: 1.6rem;
    height: 1.9rem;
    margin: auto;
    position: absolute;
}

.menuTab ul li a:focus .breatheFrame {
    box-shadow: 0 0.01rem 0.1rem rgba(6, 127, 210, 1);
    border-radius: 0.2rem;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-name: breathe;
    -webkit-animation-duration: 2000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
}

@-webkit-keyframes breathe {
    100% {
        opacity: 35;
        box-shadow: 0 0.01rem 0.3rem rgba(6, 127, 210, 1);
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
    width: 25rem;
    height: 2rem;
    float: left;
    z-index: 100000;
    background-color: pink;
    position: fixed;
    bottom: 5rem;
}

#videoPlay {
    width: 2rem;
    height: 1rem;
    float: left;
    background-color: red;
    z-index: 1000;
}

#videoPlayTotal {
    width: 2rem;
    z-index: 1000;
    margin-top: 1rem;
    font-size: 0.3rem;
    height: 1rem;
    float: left;
    background-color: green;
}

#luyou {
    width: 10rem;
    height: 5rem;
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
            // initMediaPlay() {
            //     // var playUrl = "http://115.28.104.91:12080/vod/back_video_4M_out.mpg";
            //     // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/apps/index/SYHOTEL/assets/video/back_video_4M_out.mpg";
            //     // var playUrl = "http://115.28.104.91:12080/vod/TV.ts";
            //     // var playUrl = "http://115.28.104.91:12080/vod/503128";
            //     // var playUrl = "http://192.168.89.116:8081/tv.ts";


            //     // var playUrl = "http://222.221.25.243:6166/iptv/ppthdplay/apps/index/SYHOTEL/assets/video/back_video_4M_out.mp4";
            //     // alert(sessionStorage.getItem("EPGVideoUrl"));
            //     var playUrl = sessionStorage.getItem("EPGVideoUrl");

            //     this.mediaStr = '[{mediaUrl:"' + playUrl + '",';
            //     this.mediaStr += 'mediaCode: "jsoncode1",';
            //     this.mediaStr += 'mediaType:2,';
            //     this.mediaStr += 'audioType:1,';
            //     this.mediaStr += 'videoType:1,';
            //     this.mediaStr += 'streamType:1,';
            //     this.mediaStr += 'drmType:1,';
            //     this.mediaStr += 'fingerPrint:0,';
            //     this.mediaStr += 'copyProtection:1,';
            //     this.mediaStr += 'allowTrickmode:1,';
            //     this.mediaStr += 'startTime:0,';
            //     this.mediaStr += 'endTime:20000,';
            //     this.mediaStr += 'entryID:"jsonentry1"}]';
            //     this.mp = new MediaPlayer(); //新建一个mediaplayer对象
            //     var instanceId = this.mp.getNativePlayerInstanceID(); //读取本地的媒体播放实例的标识


            //     var playListFlag = 0; //Media Player 的播放模式。 0：单媒体的播放模式 (默认值)，1: 播放列表的播放模式
            //     var videoDisplayMode = 1; //MediaPlayer 对象对应的视频窗口的显示模式. 1: 全屏显示2: 按宽度显示，3: 按高度显示
            //     var height = window.innerHeight;
            //     var width = window.innerWidth;
            //     var left = 0;
            //     var top = 0;
            //     var muteFlag = 0; //0: 设置为有声 (默认值) 1: 设置为静音
            //     var subtitleFlag = 0; //字幕显示
            //     var videoAlpha = 0; //视频的透明度
            //     var cycleFlag = 0;
            //     var randomFlag = 0;
            //     var autoDelFlag = 0;
            //     var useNativeUIFlag = 1;
            //     //初始话mediaplayer对象
            //     // alert("开始播放$$$");
            //     this.mp.initMediaPlayer(instanceId, playListFlag, videoDisplayMode,
            //         height, width, left, top, muteFlag, useNativeUIFlag, subtitleFlag, videoAlpha, cycleFlag, randomFlag, autoDelFlag);
            //     this.mp.setSingleMedia(this.mediaStr); //设置媒体播放器播放媒体内容
            //     this.mp.setAllowTrickmodeFlag(0); //设置是否允许trick操作。 0:允许 1：不允许
            //     this.mp.setVideoDisplayMode(0);
            //     this.mp.setVideoDisplayArea(left, top, width, height);
            //     this.mp.setNativeUIFlag(0); //设置播放器本地UI显示功能 0:允许 1：不允许
            //     this.mp.setAudioTrackUIFlag(1);
            //     this.mp.setMuteUIFlag(1);
            //     this.mp.setAudioVolumeUIFlag(1);
            //     this.mp.refreshVideoDisplay();
            // },
            // //视频播放完毕后跳转
            // isEnd() {
            //     this.curTime = this.mp.getCurrentPlayTime();
            //     this.allTime = this.mp.getMediaDuration();
            //     document.getElementById("videoPlay").innerHTML = this.curTime;
            //     var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
            //     this.strUtility = Utility.getEvent() + "---" + this.curTime + "---" + this.allTime + "--ID是--" + nativePlayerInstanceId;

            //     document.getElementById("videoPlayTotal").innerHTML = this.strUtility;

            //     if ((this.strUtility.match(/EVENT_MEDIA_END/) && this.curTime == this.allTime) || (this.strUtility.match(/EVENT_MEDIA_END/) && this.curTime == 0)) {
            //         this.mp.releaseMediaPlayer(nativePlayerInstanceId);
            //         window.clearInterval(this.z);
            //         const _this = this;
            //         setTimeout(function() {
            //             _this.initMediaPlay(); //首先初始话mediaplayer对象
            //             _this.mp.playFromStart(); //从头开始播放
            //             _this.z = setInterval(_this.isEnd, 2000);
            //         }, 5000);

            //     }
            // },

        },
        // events: {
        //     playVideo() {
        //         // alert("重新播放HAHHAA");
        //         this.initMediaPlay();
        //         this.mp.playFromStart(); //从头开始播放

        //         // setTimeout(setInterval(this.isEnd, 2000), 5000);

        //         this.z = setInterval(this.isEnd, 2000);
        //     },
        //     resumeVideo() {
        //         this.mp.setVideoDisplayArea(0, 0, window.innerWidth, window.innerHeight);
        //         this.mp.resume();
        //         this.mp.refreshVideoDisplay();
        //     },
        //     pauseVideo() {
        //         this.mp.pause();
        //         this.mp.setVideoDisplayArea(0, 0, 0, 0);
        //         this.mp.refreshVideoDisplay();
        //     },
        //     stopVideo() {
        //         var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
        //         this.mp.releaseMediaPlayer(nativePlayerInstanceId);
        //         // this.mp.stop();
        //         // alert("关闭视频");
        //     },
        // },
        vuex: {
            actions: {
                updateFirstClassTab,
                updateSecondClassTab,

            },
        },
        ready() {
            // alert(Authentication.CTCGetAuthInfo("123456"));
            this.updateFirstClassTab(0);
            this.updateSecondClassTab(0);
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';



            console.log(location.search);
            var url = location.search; //获取url中"?"符后的字串
            // alert(url);
            // var pathname = location.pathname.replace("index.html", "");
            // sessionStorage.setItem("pathname", pathname);
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    if (strs[i].split("=")[0] == "esaddr") {
                        console.log("esaddr" + strs[i].split("=")[1]);
                        sessionStorage.setItem("esaddr", strs[i].split("=")[1]);
                    }

                    if (strs[i].split("=")[0] == "UserID") {
                        console.log("UserID" + strs[i].split("=")[1]);
                        sessionStorage.setItem("UserID", strs[i].split("=")[1]);
                    }
                    if (strs[i].split("=")[0] == "EpgGroupID") {
                        console.log(strs[i].split("=")[1]);
                        sessionStorage.setItem("EpgGroupID", strs[i].split("=")[1]);

                    }
                }
            }

        },
        store: store,
}
</script>
