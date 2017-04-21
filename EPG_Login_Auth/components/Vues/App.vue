<style>
html {
    font-size: 100px;
}

#app {
    width: 19.2rem;
    height: 10.8rem;
}
</style>
<template>
    <div id="app">
    </div>
</template>
<script>
import Http from '../../assets/lib/Http';
export default {
    data() {
            return {
                isRequestStatus: false,
            };
        },
        methods: {

            getRelativePath() {
                sessionStorage.setItem("relativePath", "/iptv/ppthdplay/SYHOTEL/");
            },

            doLogin() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus == true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "STBLoginReq",
                        "MessageBody": {
                            "STBID": Authentication.CTCGetConfig("STBID"),
                            "USERID": Authentication.CTCGetConfig("UserID"),
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=STBLoginReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                sessionStorage.setItem("HostID", _msgBody.HostID);
                                sessionStorage.setItem("UserID", _msgBody.UserID);
                                sessionStorage.setItem("AdPath", _msgBody.AdPath);
                                sessionStorage.setItem("MainPath", _msgBody.MainPath);
                                sessionStorage.setItem("WelcomePageGroupPath", _msgBody.WelcomePageGroupPath);
                                _this.doAuth();
                            } else {
                                console.log("doLogin请求数据失败");
                                _this.goToIptv();

                            }
                        } else {
                            console.log("doLogin网络请求失败");
                            _this.goToIptv();
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        _this.goToIptv();
                    },
                });
            },

            doAuth() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus == true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "DoAuthReq",
                        "MessageBody": {
                            "HostID": sessionStorage.getItem("HostID"),
                            "UserID": sessionStorage.getItem("UserID"),
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=DoAuthReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                sessionStorage.setItem("EPGDirectory", _msgBody.EPGDirectory);
                                sessionStorage.setItem("EPGTemplateType", _msgBody.EPGTemplateType);
                                sessionStorage.setItem("EpgGroupID", _msgBody.EpgGroupID);
                                sessionStorage.setItem("LoginID", _msgBody.LoginID);
                                sessionStorage.setItem("RootCategoryID", _msgBody.RootCategoryID);
                                sessionStorage.setItem("Token", _msgBody.Token);
                                // _this.getVideoAddr();
                                _this.goToWelcome();
                            } else {
                                console.log("Auth请求数据失败");
                                _this.goToIptv();
                            }
                        } else {
                            _this.goToIptv();

                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                        _this.goToIptv();
                    },
                });
            },

            getVideoAddr() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus == true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetSysParamReq",
                        "MessageBody": {
                            "ParamList": {
                                "Param": [{
                                    "Name": "bg_media_url"
                                }]
                            },
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetSysParamReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                var videoUrl = (_msgBody.ParamList.Param[0].Value);

                                if (videoUrl == "undefined" || null == videoUrl) {
                                    console.log("背景视频暂时没有");

                                } else {
                                    console.log("有视频链接");
                                    sessionStorage.setItem("EPGVideoUrl", videoUrl);
                                }

                                _this.goToWelcome();

                            } else {
                                console.log("数据获取失败");
                                _this.goToIptv();
                            }
                        } else {
                            console.log("网络请求失败");
                            _this.goToIptv();
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                        _this.goToIptv();
                    },
                });


            },

            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }, 

            goToIptv() {
                window.location.href = sessionStorage.getItem("indexUrl");
            },

            goToWelcome() {
                if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                    console.log("测试路径");
                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                } else if (/^https?:\/\//.test(sessionStorage.getItem("WelcomePageGroupPath"))) {
                    console.log("是链接");
                    location.replace(sessionStorage.getItem("WelcomePageGroupPath"));
                } else {
                    console.log("正式路径");
                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                }
            },

        },

        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';

            /*存储跳转IPTV首页的地址
             *http:222.221.25.243:6166/iptv/ppthdplay/apps/index/index_epg.html
             */

            var indexUrl = this.GetQueryString("indexUrl");
            sessionStorage.setItem("indexUrl", indexUrl);

            this.getRelativePath();
            this.doLogin();

        },
}
</script>
