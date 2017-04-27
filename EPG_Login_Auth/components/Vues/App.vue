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
import xml2json from '../../assets/lib/xml2json.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                totalUrl: '',
                server_ip: '',
                group_name: '',
                group_path: '',
                oss_user_id: '',
                page_url: '',
                partner: '',
                group_id: '',
                cdc_group_id: '',
                area_id: '',
                csm_id: '',
            };
        },
        methods: {
            //获取武汉链接参数
            getUrlParams() {
                var x2js = new xml2json();
                this.totalUrl = decodeURIComponent(location.href);
                console.log("this.totalUrl:", this.totalUrl);
                var param = decodeURIComponent(this.totalUrl.split("#!/app?")[1]);
                console.log("param是：", param);
                if (param) {
                    var xmlSource = param.split("=")[1];
                    console.log("获取到的参数：", xmlSource);
                    var xmlText = "<xml>" + xmlSource + "</xml>";
                    var jsonObj = x2js.xml_str2json(xmlText);
                    console.log("最终获得的参数Json对象是:", jsonObj);

                    this.server_ip = jsonObj.xml.server_ip;
                    this.group_name = jsonObj.xml.group_name;
                    this.group_path = jsonObj.xml.group_path;
                    this.oss_user_id = jsonObj.xml.oss_user_id;
                    this.page_url = jsonObj.xml.page_url;
                    this.partner = jsonObj.xml.partner;
                    this.group_id = jsonObj.xml.group_id;
                    this.cdc_group_id = jsonObj.xml.cdc_group_id;
                    this.area_id = jsonObj.xml.area_id;
                    this.csm_id = jsonObj.xml.csm_id;

                    this.doLogin();

                }
                this.pushLogToServer();
            },

            //收集日志
            pushLogToServer() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus == true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "EPGLogReq",
                        "MessageBody": {
                            "STBID": "123456",
                            "HostID": 52,
                            "OperationCode": "add",
                            "Detail": this.totalUrl,
                            "Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJIb3N0SUQiOiI1MiIsIlVzZXJJRCI6IjIxMDIifQ.T_bGMwT6jE3f-f3g7t8m6liEp0RFXHec-VzJLQLQZhQ"
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: '/epgservice/index.php?MessageType=EPGLogReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("push Log 成功");
                        } else {
                            console.log("push log 失败");
                        }
                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {},
                });

            },

            //登陆
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
                            "STBID": '',
                            "USERID": _this.oss_user_id,
                            "HotelGroupName": this.group_name,
                            "HotelGroupID": this.cdc_group_id,
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: '/epgservice/index.php?MessageType=EPGLogReq',
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
                                }
                                _this.doAuth();
                            } else {
                                console.log("doLogin请求数据失败");

                            }
                        } else {
                            console.log("doLogin网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {},
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

                console.log("HostID>>>>>>", sessionStorage.getItem("HostID"));
                console.log("UserID>>>>>>", sessionStorage.getItem("UserID"));

                Http({
                    type: 'POST',
                    url: '/epgservice/index.php?MessageType=EPGLogReq',
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
                                }

                                _this.goToWelcomePage();

                            } else {
                                console.log("Auth请求数据失败");
                            }
                        } else {
s
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
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
            //         url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetSysParamReq',
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

            //                     sessionStorage.setItem("EPGDirectory", "epggroup_test");
            //                     // if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
            //                     //     location.replace("./epggroup_ads/ad_default/ad.html");
            //                     // } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
            //                     //     location.replace("./epggroup_ads/ad_test/ad.html");
            //                     // }

            //                     if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
            //                         location.replace("./epggroup_welcomes/welcome_default/welcome.html");
            //                     } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
            //                         location.replace("./epggroup_welcomes/welcome_test/welcome.html");
            //                     }


            //                 } else {
            //                     console.log("请求数据失败");
            //                     console.log("数据获取失败");
            //                 }
            //             } else {
            //                 console.log("网络请求失败");
            //                 window.location.href = sessionStorage.getItem("indexUrl");
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


            goToWelcomePage() {
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

            this.getUrlParams();

        },
}
</script>
