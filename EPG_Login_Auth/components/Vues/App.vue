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
                indexUrl: "",
                relativePath: "",
                HostID: "",
                UserID: "",
                AdPath: "",
                MainPath: "",
                WelcomePageGroupPath: "",

                EPGDirectory: "",
                EPGTemplateType: "",
                EpgGroupID: "",
                LoginID: "",
                RootCategoryID: "",
                Token: "",
                Num: 0,
            };
        },
        methods: {

            getRelativePath() {
                //var pathName = location.pathname;
                //var relativePath = pathName.replace("portal.html", "");
                return "/iptv/ppthdplay/SYHOTEL/";
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
                    url: _this.relativePath + 'service/epgservice/index.php?MessageType=STBLoginReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("doLogin请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            console.log(_msgBody);
                            if (_msgBody.ResultCode == 200) {
                                _this.HostID = _msgBody.HostID;
                                _this.UserID = _msgBody.UserID;
                                _this.AdPath = _msgBody.AdPath;
                                _this.MainPath = _msgBody.MainPath;
                                _this.WelcomePageGroupPath = _msgBody.WelcomePageGroupPath;

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
                            "HostID": _this.HostID,
                            "UserID": _this.UserID,
                        },
                    }
                };

                console.log("HostID>>>>>>", _this.HostID);
                console.log("UserID>>>>>>", _this.UserID);

                Http({
                    type: 'POST',
                    url: _this.relativePath + 'service/epgservice/index.php?MessageType=DoAuthReq',
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

                                _this.EPGDirectory = _msgBody.EPGDirectory;
                                _this.EPGTemplateType = _msgBody.EPGTemplateType;
                                _this.EpgGroupID = _msgBody.EpgGroupID;
                                _this.LoginID = _msgBody.LoginID;
                                _this.Token = _msgBody.Token;

                                // _this.getVideoAddr();
                                alert(++_this.Num);
                                if (this.Num === 1) {
                                    DoAuthReq();
                                } else {
                                    return;
                                }
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

            // getVideoAddr() {
            //     var _this = this;
            //     if (this.isRequestStatus) {
            //         return;
            //     }
            //     this.isRequestStatus == true;
            //     const tmpObj = {
            //         "Message": {
            //             "MessageType": "GetSysParamReq",
            //             "MessageBody": {
            //                 "ParamList": {
            //                     "Param": [{
            //                         "Name": "bg_media_url"
            //                     }]
            //                 },
            //                 "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
            //             }
            //         }
            //     };

            //     Http({
            //         type: 'POST',
            //         url: _this.relativePath + 'service/epgservice/index.php?MessageType=GetSysParamReq',
            //         data: JSON.stringify(tmpObj),
            //         complete: function(data) {
            //             console.log(data);
            //             if (data.status === 200) {
            //                 console.log("请求成功");
            //                 const _data = JSON.parse(data.response);
            //                 const _msgBody = _data.Message.MessageBody;
            //                 if (_msgBody.ResultCode == 200) {
            //                     var videoUrl = (_msgBody.ParamList.Param[0].Value);

            //                     if (videoUrl == "undefined" || null == videoUrl) {
            //                         console.log("背景视频暂时没有");

            //                     } else {
            //                         console.log("有视频链接");
            //                         sessionStorage.setItem("EPGVideoUrl", videoUrl);
            //                     }

            //                     //sessionStorage.setItem("EPGDirectory", "epggroup_test");
            //                     // if (_this.EPGDirectory == "epggroup_default") {
            //                     //     location.replace("./epggroup_ads/ad_default/ad.html");
            //                     // } else if (_this.EPGDirectory == "epggroup_test") {
            //                     //     location.replace("./epggroup_ads/ad_test/ad.html");
            //                     // }

            //                     if (_this.EPGDirectory == "epggroup_default") {
            //                         location.replace("./epggroup_welcomes/welcome_default/welcome.html");
            //                     } else if (_this.EPGDirectory == "epggroup_test") {
            //                         location.replace("./epggroup_welcomes/welcome_test/welcome.html");
            //                     }


            //                 } else {
            //                     console.log("请求数据失败");
            //                     console.log("数据获取失败");
            //                 }
            //             } else {
            //                 console.log("网络请求失败");
            //                 _this.goToIptv();
            //             }

            //             _this.isRequestStatus = false;
            //             _this.showLoading = false;
            //         },
            //         error: function(err) {
            //             console.log(err);
            //         },
            //     });


            // },

            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            goToIptv() {
                window.location.href = this.indexUrl;

            },

            addParams() {
                var params = "EPGDirectory=" + this.EPGDirectory + "&" +
                    "EPGTemplateType=" + this.EPGTemplateType + "&" +
                    "EpgGroupID=" + this.EpgGroupID + "&" +
                    "LoginID=" + this.LoginID + "&" +
                    "Token=" + this.Token + "&" +
                    "UserID=" + this.UserID + "&" +
                    "indexUrl=" + this.indexUrl + "&" +
                    "relativePath=" + this.getRelativePath() + "&" +
                    "HostID=" + this.HostID + "&" +
                    "AdPath=" + this.AdPath + "&" +
                    "MainPath=" + this.MainPath + "&" +
                    "WelcomePageGroupPath=" + this.WelcomePageGroupPath;

                return params;

            },

            goToWelcome() {
                if (this.WelcomePageGroupPath == "test") {
                    console.log("测试路径");
                    location.replace("./epggroup_welcomes/welcome_test/welcome.html?" + this.addParams());
                } else if (this.WelcomePageGroupPath.indexOf("http") >= 0) {
                    console.log("是链接", this.WelcomePageGroupPath);
                    window.location = this.WelcomePageGroupPath;
                } else {
                    console.log("正式路径");
                    location.replace("./epggroup_welcomes/welcome_default/welcome.html" + this.addParams());
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

            this.indexUrl = this.GetQueryString("indexUrl");
            this.relativePath = this.getRelativePath();
            this.doLogin();

        },
}
</script>
