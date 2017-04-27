<style scoped>
.rootView {
    width: 19.2rem;
    height: 10.8rem;
    position: relative;
}

.swiperLevel {
    position: absolute;
    z-index: 1;
}

.contentLevel {
    z-index: 2;
    position: absolute;
}

.bottom {
    position: absolute;
    width: 19.2rem;
    height: 1.82rem;
    bottom: 0;
}

.wifi {
    width: 16rem;
    height: 1.2rem;
    position: relative;
    padding-left: 0.2rem;
    line-height: 1.2rem;
    float: left;
    display: none;
}

#wifiaccount {
    display: block;
    font-size: 0.5rem;
    color: white;
}

.time {
    width: 3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    position: relative;
    float: right;
}

#timetext {
    font-size: 0.3rem;
    color: white;
}

.langBtn {
    width: 2.2rem;
    float: left;
    border-radius: 0.5rem;
    height: 0.8rem;
    font-size: 0.35rem;
    background-color: black;
    color: white;
    border: none;
    text-align: center;
}

.bottomTip {
    width: 6rem;
    padding-left: 2rem;
    height: 0.8rem;
    font-size: 0.35rem;
    line-height: 0.8rem;
}

.english {
    margin-left: 0.2rem;
}

.bottomTip span {
    color: white;
}

.surfaceLevel {
    width: 19.2rem;
    height: 9.6rem;
    position: absolute;
}

.rightWelcome {
    width: 5rem;
    height: 0.6rem;
    float: right;
    padding-top: 0.2rem;
    line-height: 2rem;
    font-size: 0.4rem;
    text-align: center;
}

.choice {
    width: 8rem;
    height: 2rem;
    float: left;
}

.rightWelcome span {
    color: white;
}

:focus {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.topBtn {
    width: 7rem;
    height: 0.9rem;
    margin-top: 0.2rem;
    padding-left: 1rem;
    line-height: 0.9rem;
}

a:focus .breatheFrame {
    box-shadow: 0 0.01rem 0.1rem rgba(6, 127, 210, 1);
    border-radius: 0.5rem;
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
</style>
<template>
    <div class="rootView" id="welcomeLayout">
        <div class="rootView swiperLevel">
            <div style="width: 19.2rem; height: 10.8rem; position: relative;">
                <img style="transition: all 1s; position: absolute;" :style="{ opacity: $index === picIndex ? 1 : 0 }" v-for="item in pictureList" :src="item.ImageUrl">
            </div>
        </div>
        <div class="rootView contentLevel">
            <div class="top">
                <div class="top wifi">
                    <span id="wifiaccount">{{wifiTip}}</span>
                </div>
                <div class="top time">
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
                        <span>{{opretorGuide}}</span>
                    </div>
                </div>
                <div class="rightWelcome">
                    <!-- <span>欢迎下榻本酒店</span> -->
                    <span>{{welcomeData}}</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import Http from '../../assets/lib/Http';

export default {
    data() {
            const _this = this;
            return {
                tabIndex: -1,
                isRequestStatus: false,
                canNotGoBack: false,
                showBreathe: false,
                totalPictureList: [],
                pictureList: [],
                wifiTip: "WIFI:******密码:******",
                welcomeData: "欢迎下榻本酒店",
                opretorGuide: "请按“OK”键进入主菜单",
                currentTime: '',
                opretorObj: null,
                welcomeObj: null,
                currentLang: 'chi',
                options: {
                    autoplay: 4000,
                    loop: true,
                    keyboardControl: false,
                    lazyLoading: true,
                },
                picIndex: 0,
            };

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

            changeTime() {
                var _this = this;
                this.timeInterval = setInterval(function() {
                    var time = new Date();
                    // 程序计时的月从0开始取值后+1
                    var myMonth = _this.formats(time.getMonth() + 1);
                    var myDate = _this.formats(time.getDate());
                    var myHours = _this.formats(time.getHours());
                    var myMinutes = _this.formats(time.getMinutes());
                    var mySeconds = _this.formats(time.getSeconds());
                    var fullTime = time.getFullYear() + "/" + myMonth + "/" + myDate + " " + myHours + ":" + myMinutes + ":" + mySeconds;
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
            getWifiInfo() {
                var _this = this;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetWifiInfoReq",
                        "MessageBody": {
                            "UserID": sessionStorage.getItem("UserID"),
                            "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                            "LangCode": this.currentLang,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };
                Http({
                    type: 'post',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetWifiInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            console.log(_data);
                            if (_msgBody.ResultCode === 200) {
                                console.log("wifi请求成功!");
                                console.log(_msgBody);
                            } else {
                                console.log("wifi请求失败!");
                                console.log("数据获取失败");
                            }
                        } else {
                            console.log("网络请求失败");
                            document.querySelector(".wifi").style.visibility = 'hidden';

                        }
                    },
                    error: function(err) {
                        console.log(err);
                    },

                });
            },
            changeChinese() {
                this.saveLangCode("chi");
                this.wifiTip = "Wifi:******密码:****** ";

                console.log("中文");
                console.log(this.opretorObj);
                if (this.opretorObj == undefined || null == this.opretorObj) {
                    console.log("操作词为空");
                } else {
                    var langData = this.opretorObj.MultiLangInfo;

                    if (langData == undefined || null == langData) {
                        console.log("OperationTips无-chi");
                    } else {
                        for (var i = 0; i < langData.length; i++) {
                            if (langData[i].LangCode == 'chi') {
                                this.opretorGuide = langData[i].Word;
                            }
                        }
                    }
                }

                // 欢迎词
                if (this.welcomeObj == undefined || null == this.welcomeObj) {
                    console.log("欢迎词为空");
                } else {
                    var tempWelcomeData = this.welcomeObj.MultiLangInfo;
                    if (tempWelcomeData == undefined || null == tempWelcomeData) {
                        console.log("WelcomeWords无-chi");
                    } else {
                        for (var i = 0; i < tempWelcomeData.length; i++) {
                            if (tempWelcomeData[i].LangCode == 'chi') {
                                this.welcomeData = tempWelcomeData[i].Word;
                            }
                        }
                    }
                }
            },

            changeEnglish() {
                this.saveLangCode("eng");
                this.wifiTip = "Wifi:******Password:****** ";
                if (this.opretorObj == undefined || null == this.opretorObj) {
                    console.log("操作词为空");
                } else {
                    var langData = this.opretorObj.MultiLangInfo;

                    if (langData == undefined || null == langData) {
                        console.log("OperationTips无");
                    } else {
                        for (var i = 0; i < langData.length; i++) {
                            if (langData[i].LangCode == 'eng') {
                                this.opretorGuide = langData[i].Word;
                            }
                        }
                    }
                }

                if (this.welcomeObj == undefined || null == this.welcomeObj) {
                    console.log("欢迎词为空");
                } else {
                    var tempWelcomeData = this.welcomeObj.MultiLangInfo;
                    if (tempWelcomeData == undefined || null == tempWelcomeData) {
                        console.log("WelcomeWords无");
                    } else {
                        for (var i = 0; i < tempWelcomeData.length; i++) {
                            if (tempWelcomeData[i].LangCode == 'eng') {
                                this.welcomeData = tempWelcomeData[i].Word;
                            }
                        }
                    }

                }


            },
            handleData(obj) {
                var _this = this;
                // 操作提示
                if ((typeof(obj.OperationTips) == undefined) || null == obj.OperationTips) {
                    console.log("操作提示为空");
                } else {
                    this.opretorObj = Object.freeze(obj.OperationTips);
                }

                // 欢迎语
                if ((typeof(obj.WelcomeWords) == undefined) || null == obj.WelcomeWords) {
                    console.log("欢迎语为空");
                } else {
                    this.welcomeObj = Object.freeze(obj.WelcomeWords);
                }

                //轮播图片
                if ((typeof(obj.PictureList) == "undefined") || null == obj.PictureList) {
                    console.log("图片列表是空");
                } else {
                    this.pictureList = Object.freeze(obj.PictureList.ImageList);
                    setInterval(() => {
                        this.picIndex = ++this.picIndex % this.pictureList.length;
                    }, 2000)
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
                    if (keyvalue == 8) {
                        if (this.canNotGoBack) {
                            event.preventDefault();
                            e.keyCode = 0;
                            e.returnValue = false;
                        } else {
                            e.returnValue = true;
                        }
                    }

                    switch (keyvalue) {
                        case 37: // left
                            this.tabIndex = 0;
                            this.changeChinese();
                            break;
                        case 39: // right
                            this.tabIndex = 1;
                            this.changeEnglish();
                            break;
                        case 13: // 确认/OK
                            // 根据浏览器判断某盒子才做这个跳转
                            // this.gotoMainLayout();
                            break;
                    }
                };

            },
            gotoMainLayout() {
                sessionStorage.setItem("currLangCode", this.currentLang);
                clearInterval(this.timeInterval);

                let path = '../../epggroup_mains/main_default/';
                let file = 'main.html';
                const {vendor, appName, userAgent} = navigator;

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
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetWelcomePageReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode === 200) {
                                _this.isRequestStatus = false;
                                _this.handleData(_msgBody);
                            } else {
                                _this.isRequestStatus = false;
                                console.log("获取数据失败");
                                console.log("数据获取失败");

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
            getObjStr(obj) {
                let str = '';
                for (const key in obj) {
                    str += key + ': ' + obj[key] + '; ';
                }
                return str;
            },
            EPGLog(params = {OperationCode: '', Detail: ''}) {
                const tmpObj = {
                    "Message": {
                        "MessageType": "EPGLogReq",
                        "MessageBody": {
                            "USERID": Authentication.CTCGetConfig("STBID"),
                            "HostID": sessionStorage.getItem("HostID"),
                            "OperationCode": params.OperationCode,
                            "Detail": params.Detail,
                        },
                    }
                };
                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=EPGLogReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                    },
                    error: function(err) {
                    },
                });
            },

        },

        components: {

        },

        ready() {
            document.querySelector("#defaultLang").focus();
            this.changeTime();
            this.canNotGoBack = true;
            this.listenBackKey();
            // this.getWifiInfo();
            this.getWelcomeData();
            setTimeout(() => {
                this.tabIndex = 0;
            }, 100)
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
<style scoped>
.rootView {
    width: 19.2rem;
    height: 10.8rem;
    position: relative;
}

.swiperLevel {
    position: absolute;
    z-index: 1;
}

.contentLevel {
    z-index: 2;
    position: absolute;
}

.bottom {
    position: absolute;
    width: 19.2rem;
    z-index: 100000;
    height: 1.82rem;
    bottom: 0;
}

.wifi {
    width: 16rem;
    height: 1.2rem;
    position: relative;
    padding-left: 0.2rem;
    line-height: 1.2rem;
    float: left;
    display: none;
}

#wifiaccount {
    display: block;
    font-size: 0.5rem;
    color: white;
}

.time {
    width: 3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    position: relative;
    float: right;
}

#timetext {
    font-size: 0.3rem;
    color: white;
}

.langBtn {
    width: 2.2rem;
    float: left;
    border-radius: 0.5rem;
    height: 0.8rem;
    font-size: 0.3rem;
    background-color: black;
    color: white;
}

.bottomTip {
    width: 6rem;
    padding-left: 2rem;
    height: 0.8rem;
    font-size: 0.35rem;
    line-height: 0.8rem;
}

.english {
    margin-left: 0.2rem;
}

.bottomTip span {
    color: white;
}

.surfaceLevel {
    width: 19.2rem;
    height: 9.6rem;
    position: absolute;
}

.rightWelcome {
    width: 5rem;
    height: 0.6rem;
    float: right;
    padding-top: 0.2rem;
    line-height: 2rem;
    font-size: 0.4rem;
}

.choice {
    /*width: 8rem;*/
    height: 2rem;
    float: left;
}

.rightWelcome span {
    color: white;
}

:focus {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.topBtn {
    width: 7rem;
    height: 0.8rem;
    margin-top: 0.2rem;
    margin-left: .5rem;
    line-height: 0.9rem;
    display: -webkit-box;
}

.topBtn a {
    display: block;
    margin-left: .3rem;
    width: 2.3rem;
    border-radius: 0.5rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    text-decoration: none;
    font-size: 0.4rem;
    background-color: black;
    color: white;
}

.topBtn a div {
    height: 0.7rem;
    line-height: 0.7rem;
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
        box-shadow: 0 0.01rem 0.3rem rgba(6, 127, 210, 1);
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
        box-shadow: 0 0.01rem 0.3rem rgba(6, 127, 210, 1);
    }
    100% {
        box-shadow: 0 0 0 rgba(6, 127, 210, 1);
    }
}


/*
a:focus .breatheFrame {
    box-shadow: 0 0.01rem 0.1rem rgba(6, 127, 210, 1);
    border-radius: 0.5rem;
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
}*/
</style>
