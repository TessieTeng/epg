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
                //var pathName = location.pathname;
                //var relativePath = pathName.replace("portal.html", "");
                console.log("888888", relativePath);
                var relativePath = "/iptv/ppthdplay/SYHOTEL/";
                sessionStorage.setItem("relativePath", relativePath);
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
                            "STBID": !!window.Authentication ? Authentication.CTCGetConfig("STBID") : '0010039901049500164574FF4C691FFE',
                            "USERID": !!window.Authentication ? Authentication.CTCGetConfig("UserID") : "123456",
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=STBLoginReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("doLogin请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            console.log(_msgBody);
                            if (_msgBody.ResultCode == 200) {
                                if (window.sessionStorage) {
                                    sessionStorage.setItem("HostID", _msgBody.HostID);
                                    sessionStorage.setItem("UserID", _msgBody.UserID);
                                    sessionStorage.setItem("AdPath", _msgBody.AdPath);
                                    sessionStorage.setItem("MainPath", _msgBody.MainPath);
                                    sessionStorage.setItem("WelcomePageGroupPath", _msgBody.WelcomePageGroupPath);
                                } else {
                                    Cookie.write("HostID", _msgBody.HostID);
                                    Cookie.write("UserID", _msgBody.UserID);
                                    Cookie.write("AdPath", _msgBody.AdPath);
                                    Cookie.write("MainPath", _msgBody.MainPath);
                                    Cookie.write("WelcomePageGroupPath", _msgBody.WelcomePageGroupPath);
                                }
                                _this.doAuth();
                            } else {
                                console.log("doLogin请求数据失败");
                                window.location.href = sessionStorage.getItem("indexUrl");

                            }
                        } else {
                            console.log("doLogin网络请求失败");
                            window.location.href = sessionStorage.getItem("indexUrl");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        window.location.href = sessionStorage.getItem("indexUrl");
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
                            "HostID": window.sessionStorage ? sessionStorage.getItem("HostID") : Cookie.read("HostID"),
                            "UserID": window.sessionStorage ? sessionStorage.getItem("UserID") : Cookie.read("UserID"),
                        },
                    }
                };

                console.log("HostID>>>>>>", window.sessionStorage ? sessionStorage.getItem("HostID") : Cookie.read("HostID"));
                console.log("UserID>>>>>>", window.sessionStorage ? sessionStorage.getItem("UserID") : Cookie.read("UserID"));

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=DoAuthReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("Auth请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            console.log(_msgBody);
                            if (_msgBody.ResultCode == 200) {
                                console.log("验证成功");
                                if (window.sessionStorage) {
                                    sessionStorage.setItem("EPGDirectory", _msgBody.EPGDirectory);
                                    sessionStorage.setItem("EPGTemplateType", _msgBody.EPGTemplateType);
                                    sessionStorage.setItem("EpgGroupID", _msgBody.EpgGroupID);
                                    sessionStorage.setItem("LoginID", _msgBody.LoginID);
                                    sessionStorage.setItem("RootCategoryID", _msgBody.RootCategoryID);
                                    sessionStorage.setItem("Token", _msgBody.Token);
                                } else {
                                    Cookie.write("EPGDirectory", _msgBody.EPGDirectory);
                                    Cookie.write("EPGTemplateType", _msgBody.EPGTemplateType);
                                    Cookie.write("EpgGroupID", _msgBody.EpgGroupID);
                                    Cookie.write("LoginID", _msgBody.LoginID);
                                    Cookie.write("Token", _msgBody.Token);
                                }

                                // _this.getVideoAddr();
                                if (sessionStorage.getItem("WelcomePageGroupPath") == "welcome_test") {
                                    console.log("测试路径");
                                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                                } else if (sessionStorage.getItem("WelcomePageGroupPath") == "") {
                                    console.log("正式路径");
                                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                                } else if (sessionStorage.getItem("WelcomePageGroupPath").indexOf("http") >= 0) {
                                    console.log("是链接", sessionStorage.getItem("WelcomePageGroupPath"));
                                    window.location = sessionStorage.getItem("WelcomePageGroupPath");
                                }
                            } else {
                                console.log("Auth请求数据失败");
                                window.location.href = sessionStorage.getItem("indexUrl");
                            }
                        } else {
                            window.location.href = sessionStorage.getItem("indexUrl");

                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                        window.location.href = sessionStorage.getItem("indexUrl");
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
                            "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetSysParamReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
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

                                sessionStorage.setItem("EPGDirectory", "epggroup_test");
                                // if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
                                //     location.replace("./epggroup_ads/ad_default/ad.html");
                                // } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
                                //     location.replace("./epggroup_ads/ad_test/ad.html");
                                // }

                                if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
                                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                                } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
                                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                                }


                            } else {
                                console.log("请求数据失败");
                                console.log("数据获取失败");
                            }
                        } else {
                            console.log("网络请求失败");
                            window.location.href = sessionStorage.getItem("indexUrl");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                    },
                });


            },

            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }

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
