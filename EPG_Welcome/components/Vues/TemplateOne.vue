<style scoped>
.rootView {
    width: 1280px;
    height: 720px;
    position: relative;
}

.swiperLevel {
    position: absolute;
    z-index: 2;
}

.contentLevel {
    z-index: 2;
    position: absolute;
}

.bottom {
    position: absolute;
    width: 1280px;
    z-index: 2;
    height: 121px;
    bottom: 0;
    background-color: black;
}

.wifi {
    width: 700px;
    height: 80px;
    position: relative;
    padding-left: 30px;
    line-height: 80px;
    float: left;
}

#wifiaccount {
    display: block;
    font-size: 24px;
    color: white;
}

.wifiicon {
    margin-right: 10px;
    height: 24px;
    vertical-align: middle;
}

#wifiaccount span {
    vertical-align: middle;
}

.time {
    float: right;
    position: relative;
    padding: 0 30px;
    height: 80px;
    line-height: 80px;
}

.weather {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #fff;
    color: #fff;
    font-size: 20px;
}

.weathericon {
    height: 30px;
    vertical-align: middle;
}

#timetext {
    font-size: 20px;
    color: white;
}

.langBtn {
    width: 153px;
    float: left;
    border-radius: 33px;
    height: 47px;
    font-size: 20px;
    background-color: black;
    color: white;
}

.bottomTip {
    width: 400px;
    padding-left: 133px;
    height: 53px;
    font-size: 23px;
    line-height: 53px;
}

.english {
    margin-left: 13.3px;
}

.bottomTip span {
    color: white;
}

.surfaceLevel {
    width: 1280px;
    height: 960px;
    position: absolute;
}

.rightWelcome {
    width: 333px;
    float: right;
    padding-top: 13.3px;
    line-height: 46px;
    font-size: 26px;
    color: white;
}

.rightWelcome > div {
    height: 46px;
}

.choice {
    float: left;
}

:focus {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.topBtn {
    width: 467px;
    height: 53px;
    margin-top: 13.3px;
    margin-left: 33px;
    line-height: 60px;
    display: -webkit-box;
}

.topBtn a {
    display: block;
    margin-left: 20px;
    width: 153px;
    border-radius: 33px;
    height: 47px;
    line-height: 47px;
    text-align: center;
    text-decoration: none;
    font-size: 27px;
    background-color: black;
    color: white;
}

.topBtn a div {
    height: 47px;
    line-height: 47px;
}

.topBtn a.focus {
    -webkit-animation: breathe 4s ease-in-out infinite;
    animation: breathe 4s ease-in-out infinite;
}

@keyframes breathe {
    0% {
        box-shadow: 0 0 0 rgba(6, 127, 210, 1);
    }
    50% {
        box-shadow: 0 0.66px 20px rgba(6, 127, 210, 1);
    }
    100% {
        box-shadow: 0 0 0 rgba(6, 127, 210, 1);
    }
}

@-webkit-keyframes breathe {
    0% {
        box-shadow: 0 0 0 rgba(6, 127, 210, 1);
    }
    50% {
        box-shadow: 0 0.66px 20px rgba(6, 127, 210, 1);
    }
    100% {
        box-shadow: 0 0 0 rgba(6, 127, 210, 1);
    }
}
</style>
<template>
    <div class="rootView" id="welcomeLayout">
        <div class="rootView swiperLevel">
            <div style="width: 19.2rem; height: 10.8rem; position: relative;">
                <img style="transition: all 1s; position: absolute;" :style="{ opacity: $index === picIndex ? 1 : 0 }" v-for="item in pictureList" :src="item.ImageUrl" v-show='hasVideo'>
            </div>
        </div>
        <div class="rootView contentLevel">
            <div class="top">
                <div class="top wifi">
                    <span id="wifiaccount"><img class='wifiicon' src='../../assets/images/wifi.png' /><span>{{wifiTip}}</span> </span>
                </div>
                <div class="top time">
                    <span class='weather' v-if='!!weather'>
                        <img class='weathericon' :src='weather.SmallImageUrl' />
                        {{weather.LowTemperature + '℃-' + weather.HighTemperature + '℃'}}
                    </span>
                    <span id="timetext">{{currentTime}}</span>
                </div>
            </div>
            <div class="bottom">
                <div class="choice">
                    <div class="topBtn">
                        <a id="defaultLang" href="javascript:;" tabindex="-1" v-focus="tabIndex===0" @click="gotoMainLayout" @focus="changeChinese">
                            <div>简体中文</div>
                        </a>
                        <a href="javascript:;" tabindex="-1" v-focus="tabIndex===1" @click="gotoMainLayout" @focus="changeEnglish">
                            <div>ENGLISH</div>
                        </a>
                    </div>
                    <!-- <span>请按OK键进入主菜单</span> -->
                    <div class="bottomTip">
                        <span>{{UiWord[currentLang].OperationTips}}</span>
                    </div>
                </div>
                <div class="rightWelcome">
                    <!-- <span>欢迎下榻本酒店</span> -->
                    <div>
                        <span>{{{UiWord[currentLang].SubscriberName}}}</span>
                    </div>
                    <span>{{UiWord[currentLang].WelcomeWords}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Http from '../../assets/lib/Http';

export default {
    data() {
            return {
                tabIndex: -1,
                isRequestStatus: false,
                canNotGoBack: false,
                showBreathe: false,
                totalPictureList: [],
                pictureList: [],
                RoomInfo: {},
                currentLang: 'chi',
                UiWord: {
                    chi: {
                        wifi_where_tip: '',
                        OperationTips: '',
                        SubscriberName: '',
                        WelcomeWords: '',
                    },
                    eng: {
                        wifi_where_tip: '',
                        OperationTips: '',
                        SubscriberName: '',
                        WelcomeWords: '',
                    }
                },
                weatherRoot: '../../assets/images/weather/',
                weather: {
                    SmallImageUrl: '',
                    LowTemperature: '0',
                    HighTemperature: '0',
                },
                currentTime: '',
                picIndex: 0,
                hasVideo: false,
                VideoType: '',
                contentID: '',
            };

        },
        computed: {
            wifiTip() {
                return this.UiWord[this.currentLang].wifi_where_tip;
            },
        },

        methods: {

            handleTimeout() {
                var timesRun = 0;
                var interval = setInterval(() => {
                    timesRun += 1;
                    if (timesRun === 4) {
                        clearInterval(interval);
                        window.location.href = sessionStorage.getItem("indexUrl");
                        return;
                    }
                    this.getWelcomeData();
                }, 5000);
            },

            changeTime(date) {
                const _this = this;
                let startTime = date.getTime();
                this.timeInterval = setInterval(function() {
                    startTime += 1000;
                    const time = new Date(startTime);
                    // 程序计时的月从0开始取值后+1
                    const myMonth = _this.formats(time.getMonth() + 1);
                    const myDate = _this.formats(time.getDate());
                    const myHours = _this.formats(time.getHours());
                    const myMinutes = _this.formats(time.getMinutes());
                    const mySeconds = _this.formats(time.getSeconds());
                    const fullTime = time.getFullYear() + "/" + myMonth + "/" + myDate + " " + myHours + ":" + myMinutes + ":" + mySeconds;
                    _this.currentTime = fullTime;
                }, 1000);
            },

            formats(str) {
                if (str >= 0 && str <= 9) {
                    str = "0" + str;

                }
                return str;
            },
            //保存选择的语言
            saveLangCode(language) {
                this.currentLang = language;
            },
            getUiWord(lang = '', UiWordList = []) {
                var _this = this;
                const Variable = UiWordList.map(item => ({
                    Name: item,
                }));
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetUiWordReq",
                        "MessageBody": {
                            "LangCode": lang,
                            "VariableList": {
                                Variable,
                            },
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };
                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetUiWordReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode === 200) {
                                // console.log("UiWord获取数据成功!");
                                _msgBody.VariableList.Variable.map(item => {
                                    _this.UiWord[lang][item.Name] = item.Value;
                                });

                                if (sessionStorage.getItem('WelcomePageGroupPath') === 'test') {
                                    _this.EPGLog({
                                        OperationCode: 'getUiWord',
                                        Detail: 'success',
                                    });
                                }
                            } else {
                                console.log("UiWord获取数据失败!");
                            }
                        } else {
                            console.log("UiWord网络请求失败");
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    },

                });
            },
            changeChinese() {
                this.saveLangCode("chi");
            },

            changeEnglish() {
                this.saveLangCode("eng");
            },

            handleData({
                OperationTips,
                WelcomeWords,
                SubscriberName,
                PictureList,
                VideoArea
            }) {
                // 操作提示
                if ((typeof(OperationTips) == undefined) || null == OperationTips) {
                    console.log("操作提示为空");
                } else {
                    OperationTips.MultiLangInfo.map(item => this.UiWord[item.LangCode].OperationTips = item.Word);
                }

                // 欢迎语
                if ((typeof(WelcomeWords) == undefined) || null == WelcomeWords) {
                    console.log("欢迎语为空");
                } else {
                    WelcomeWords.MultiLangInfo.map(item => this.UiWord[item.LangCode].WelcomeWords = item.Word);
                }

                // 客人姓名
                if ((typeof(SubscriberName) == undefined) || null == SubscriberName) {
                    console.log("客人姓名为空");
                } else {
                    SubscriberName.MultiLangInfo.map(item => {
                        let tmp = '';
                        let name = '';
                        if (!!this.RoomInfo.GuestList.Guest[0] && !!this.RoomInfo.GuestList.Guest[0].Name) {
                            name = item.Name;
                            if (item.LangCode === 'chi') {
                                tmp = '尊敬的';
                            } else if (item.LangCode === 'eng') {
                                tmp = 'Dear ';
                            }
                        }
                        this.UiWord[item.LangCode].SubscriberName = `${tmp}${name}`;
                    });
                }

                //轮播图片
                if ((typeof(PictureList) == "undefined") || null == PictureList) {
                    console.log("图片列表是空");
                    this.hasVideo = true;
                } else {
                    this.hasVideo = false;
                    this.pictureList = PictureList.ImageList;
                    setInterval(() => {
                        this.picIndex = ++this.picIndex % this.pictureList.length;
                    }, 3000)
                }

                //视频区域
                if ((typeof(VideoArea) == "undefined") || null == VideoArea) {
                    console.log("视频内容是空");
                } else {
                    this.contentID = VideoArea.IdList;
                    sessionStorage.setItem("welcomeMediaUrl",this.contentID);
                    this.getWelcomeMediaUrl();
                }
            },
            listenBackKey() {
                document.onkeypress = (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (sessionStorage.getItem('WelcomePageGroupPath') === 'test') {
                        this.EPGLog({
                            OperationCode: 'welcome_' + keyEvent.type,
                            Detail: 'keyvalue: ' + keyvalue,
                        });
                    }

                    switch (keyvalue) {
                        // 返回
                        case 8:
                            if (this.canNotGoBack) {
                                event.preventDefault();
                                e.keyCode = 0;
                                e.returnValue = false;
                            } else {
                                e.returnValue = true;
                            }
                            break;
                            // left
                        case 37:
                            this.tabIndex = 0;
                            this.changeChinese();
                            break;
                            // right
                        case 39:
                            this.tabIndex = 1;
                            this.changeEnglish();
                            break;
                    }
                };

            },
            gotoMainLayout() {
                sessionStorage.setItem("currLangCode", this.currentLang);
                clearInterval(this.timeInterval);

                let path = '../../epggroup_mains/main_default/';
                let file = 'main.html';
                const {
                    vendor,
                    appName,
                    userAgent
                } = navigator;

                if (/^https?:\/\//.test(sessionStorage.getItem("MainPath"))) {
                    // 链接跳转
                    location.replace(sessionStorage.getItem("MainPath"));
                    return;
                } else if (sessionStorage.getItem("MainPath") == "test") {
                    // 测试路径
                    path = '../../epggroup_mains/main_test/';
                } else {
                    // 正式路径
                }
                // UT盒子：MC8638
                if (vendor === 'Apple Inc.' && appName === 'EIS iPanel' && userAgent === 'Sunniwell') {
                    file = 'main_outer.html?currLangCode=' + this.currentLang;
                }
                location.replace(path + file);
            },
            getWelcomeData() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetWelcomePageReq",
                        "MessageBody": {
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "UserID": sessionStorage.getItem("UserID"),
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetWelcomePageReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode === 200) {
                                _this.isRequestStatus = false;
                                _this.handleData(Object.freeze(_msgBody));
                                _this.changeTime(new Date(data.getResponseHeader('Date')));
                                if (sessionStorage.getItem('WelcomePageGroupPath') === 'test') {
                                    _this.EPGLog({
                                        OperationCode: 'getWelcomeData',
                                        Detail: 'success',
                                    });
                                }
                            } else {
                                _this.isRequestStatus = false;
                                console.log("获取数据失败");
                            }
                        } else {
                            _this.isRequestStatus = false;
                            console.log("网络请求失败");
                            //欢迎页异常处理
                            _this.handleTimeout();
                        }
                    }

                });
            },
            getHereWeatherInfo() {
                var _this = this;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetHereWeatherInfoReq",
                        "MessageBody": {
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "LangCode": this.currentLang,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetHereWeatherInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode === 200) {
                                _this.isRequestStatus = false;
                                // 第一天天气
                                if (!!_msgBody.WeatherList.Weather && _msgBody.WeatherList.Weather.length > 0) {
                                    _this.weather = _msgBody.WeatherList.Weather[0];
                                    _this.weather.SmallImageUrl = `${_this.weatherRoot}${_this.weather.SmallImageUrl.match(/\/(\w*\.(?:gif|png|jpg))$/)[1]}`;
                                } else {
                                    _this.weather = null;
                                }
                                if (sessionStorage.getItem('WelcomePageGroupPath') === 'test') {
                                    _this.EPGLog({
                                        OperationCode: 'getHereWeatherInfo',
                                        Detail: 'success',
                                    });
                                }
                            } else {
                                console.log("获取天气数据失败");
                            }
                        } else {
                            _this.isRequestStatus = false;
                            console.log("天气网络请求失败");
                            //欢迎页异常处理
                        }
                    }

                });
            },
            getObjStr(obj) {
                let str = '';
                for (const key in obj) {
                    str += key + ': ' + obj[key] + '; ';
                }
                return str;
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

            getRoomInfoReq() {
                var _this = this;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetRoomInfoReq",
                        "MessageBody": {
                            "UserID": sessionStorage.getItem("UserID"),
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetRoomInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode === 200) {
                                _this.RoomInfo = _msgBody;
                                _this.getWelcomeData();
                            } else {
                                console.log("获取入住信息数据失败");
                            }
                        } else {
                            console.log("入住信息网络请求失败");
                        }
                    }

                });
            },


            getChannelList() {

                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                const userID = sessionStorage.getItem("userid") || Authentication.CUGetConfig("UserID");
                this.isRequestStatus == true;
                const lang = sessionStorage.getItem("currLangCode") || 'chi';
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetChannelListReq",
                        "MessageBody": {
                            "UserID": userID,
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "LangCode": lang,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                // 下发频道信息
                function setChannels(channels) {

                    var len = channels.length;
                    Authentication.CUSetConfig('ChannelCount', len);

                    console.log('channel count: ' + len);

                    var obj = null,
                        channel = null,
                        listChannels = [];
                    for (let i = 0; i < len; i++) {
                        channel = channels[i];

                        let value = '' + 'ChannelID="' + (i + 1) + '",ChannelName="' + channel.ChannelName + '",UserChannelID="' + channel.ChannelNumber + '",ChannelURL="' + channel.LiveUrl + ',TimeShift="0",TimeShiftLength="10800"' + ',ChannelSDP="' + channel.LiveUrl + '",TimeShiftURL="",ChannelType="1",IsHDChannel="2",PreviewEnable="0"' + ',ChannelPurchased="1",ChannelLocked="0"' + ',ChannelLogURL="' + channel.LogoUrl + '",PositionX="null",PositionY="null",BeginTime="null",Interval="null"' + ',Lasting="null",ActionType="1",FCCEnable="0",ChannelFECPort="0"';

                        listChannels.push({
                            ChannelID: i + 1,
                            ChannelName: channel.ChannelName,
                            UserChannelID: channel.ChannelNumber,
                            ChannelURL: channel.LiveUrl
                        });

                        Authentication.CUSetConfig('Channel', value);
                        value = '';
                    }

                    console.log('first channel: ' + JSON.stringify(listChannels[0]));

                    // 将第一个频道保存到session
                    sessionStorage.setItem('FirstChannel', JSON.stringify(listChannels[0]));
                    sessionStorage.setItem('AllChannels', JSON.stringify(listChannels));

                    console.log('all channels: ' + JSON.stringify(listChannels));
                }

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetChannelListReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                let channel = _msgBody.ChannelList.Channel;
                                console.log('post channel list: ' + channel.length);
                                if (channel && channel.length > 0) {
                                    setChannels(channel);
                                } else {
                                    console.log('频道列表为空');
                                    _this.goToIptv('频道列表为空');
                                }

                            } else {
                                console.log("频道数据获取失败");
                                _this.goToIptv("频道数据获取失败");
                            }
                        } else {
                            console.log("频道网络请求失败");
                            _this.goToIptv("频道网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                        _this.goToIptv(err);
                    },
                });
            },

            getWelcomeMediaUrl() {
                if (!!this.contentID && this.contentID !== '0') {
                    this.hasVideo = true;
                    var zhongxingMediaUrlOrigin = sessionStorage.getItem('zhongxingMediaUrlOrigin');
                    var huaweiMediaUrlOrigin = sessionStorage.getItem('huaweiMediaUrlOrigin');
                    var urls = '';
                    switch (sessionStorage.getItem('province')) {
                        case '云南':
                            //云南的视频暂时还不完善，所以先注释掉
                            // this.getProgramInfo();
                            break;
                        case '湖北':
                            if (sessionStorage.getItem("partner") === "HUAWEI") {
                                urls = huaweiMediaUrlOrigin + '/EPG/MediaService/SmallScreen.jsp?ContentID=' + this.contentID + '&GetCntFlag=1';
                                this.mediaurl = urls;
                            } else {
                                urls = zhongxingMediaUrlOrigin + '/MediaService/SmallScreen?ContentID=' + this.contentID + '&GetCntFlag=1';
                                this.mediaurl = urls;
                            }
                            this.$dispatch('setMediaUrl', this.mediaurl);
                            break;
                        default:
                            break;
                    }
                }

            }
        },

        components: {

        },

        ready() {
            document.querySelector("#defaultLang").focus();
            this.canNotGoBack = true;
            this.listenBackKey();
            this.getUiWord('chi', ['wifi_where_tip']);
            this.getUiWord('eng', ['wifi_where_tip']);
            this.getHereWeatherInfo();
            this.getRoomInfoReq();
            setTimeout(() => {
                this.tabIndex = 0;
            }, 100);

            const province = sessionStorage.getItem('province');
            // 河南的需要频道列表
            if (province === '河南') {
                this.getChannelList();
            }
            this.getWelcomeMediaUrl();
        },
        directives: {
            focus(val) {
                if (val) {
                    this.el.classList.add('focus');
                } else {
                    this.el.classList.remove('focus');
                }
            }
        }
}
</script>
