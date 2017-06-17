<style>
/*html {
    font-size: 100px;
}*/
</style>
<template>
    <div id="app">
        <template-one></template-one>
        <iframe name="if_smallscreen" @load="getMediastr" :src="mediaurl"  v-if='showMediaIframe'></iframe>
    </div>
</template>
<script>
import store from '../vuex/store.js';
import TemplateOne from 'Vues/TemplateOne'
export default {
    data() {
            return {
                mp: null,
                mediaStr: null,
                mediaurl: '',
                showMediaIframe: false,
            };
        },
        methods: {
            initMediaPlay() {
                var playUrl = sessionStorage.getItem("playUrl");
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

            listenVideoAction() {
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
                    if (keyvalue == virtualKey) {
                        try {
                            // 每次捕获事件只能获取一次Utility.getEvent()
                            let mediaEvent = Utility.getEvent();
                            if (!mediaEvent) {
                                return;
                            }
                            //console.log(mediaEvent)
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
                    var playUrl = data[i].mediaUrl;
                    sessionStorage.setItem('playUrl', playUrl);
                }
                this.$dispatch('playVideo');
            },

        },
        components: {
            TemplateOne,
        },

        events: {
            playVideo() {
                if (!this.mp) {
                    this.initMediaPlay();
                }
                this.mp.playFromStart(); //从头开始播放

            },

            stopVideo() {
                // var nativePlayerInstanceId = this.mp.getNativePlayerInstanceID();
                // this.mp.releaseMediaPlayer(nativePlayerInstanceId);
                this.mp.stop();
            },

            setMediaUrl(mediaUrl) {
                this.showMediaIframe = true;
                this.mediaurl = mediaUrl;
                console.log('各平台的mediaurl' + this.mediaurl);
            },

        },
        store: store,
        ready() {
            // 茁壮中间件默认焦点框问题
            console.log('ipanel: ' + iPanel);
            if (!!window.iPanel) {
                iPanel.focusWidth = 0;
            }
            //监控视频动作触发的虚拟按键
            this.listenVideoAction();

        },
}
</script>
