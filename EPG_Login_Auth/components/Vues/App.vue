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
            getUrlParamsTwo() {
                this.getRelativePath();
                var x2js = new xml2json();
                // this.totalUrl = decodeURIComponent(location.href);
                this.totalUrl = decodeURIComponent("http://218.17.162.117:10003/iptv/portal.html?epg_info=%3Cserver_ip%3E27.31.32.37%3C%2Fserver_ip%3E%3Cgroup_name%3Ehbgd%3C%2Fgroup_name%3E%3Cgroup_path%3Ehttp%3A%2F%2F27.31.32.37%3A33200%2FEPG%2Fjsp%2Fhbgd%3C%2Fgroup_path%3E%3Coss_user_id%3Ehwxf150423204%3C%2Foss_user_id%3E%3Cpage_url%3Ehttp%3A%2F%2F27.31.32.37%3A33200%2FEPG%2Fjsp%2Fhbgd%2Fen%2Fau_PlayFilm.jsp%3C%2Fpage_url%3E%3Cpartner%3EHUAWEI%3C%2Fpartner%3E%3Cgroup_id%3E323%3C%2Fgroup_id%3E%3Carea_id%3E10004%3C%2Farea_id%3E%3Ccsm_id%3EHBGD%3C%2Fcsm_id%3E%3Ccdc_group_id%3E639893a00e18451eb6a69110da086401%3C%2Fcdc_group_id%3E#!/app?epg_info=%253Cserver_ip%253E27.31.32.37%253C%252Fserver_ip%253E%253Cgroup_name%253Ehbgd%253C%252Fgroup_name%253E%253Cgroup_path%253Ehttp%253A%252F%252F27.31.32.37%253A33200%252FEPG%252Fjsp%252Fhbgd%253C%252Fgroup_path%253E%253Coss_user_id%253Ehwxf150423204%253C%252Foss_user_id%253E%253Cpage_url%253Ehttp%253A%252F%252F27.31.32.37%253A33200%252FEPG%252Fjsp%252Fhbgd%252Fen%252Fau_PlayFilm.jsp%253C%252Fpage_url%253E%253Cpartner%253EHUAWEI%253C%252Fpartner%253E%253Cgroup_id%253E323%253C%252Fgroup_id%253E%253Carea_id%253E10004%253C%252Farea_id%253E%253Ccsm_id%253EHBGD%253C%252Fcsm_id%253E%253Ccdc_group_id%253E639893a00e18451eb6a69110da086401%253C%252Fcdc_group_id%253E");
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

                    console.log("helo>>>>", this.server_ip);

                    var indexUrl = this.GetQueryString("indexUrl");
                    sessionStorage.setItem("indexUrl", indexUrl);
                    this.doLogin();

                }
                this.pushLogToServer();
            },

            //获取武汉链接参数
            getUrlParams() {
                console.log("test");
                this.totalUrl = location.href;
                console.log("this.totalUrl:", this.totalUrl);
                var param = this.totalUrl.split("?")[1];
                console.log("param是：", param);
                if (param) {
                    var xmlSource = param.split("=")[1];
                    console.log("获取到的参数：", xml);
                    // var xmlSource = '<server_ip>play_vod</server_ip><group_name>group</group_name><group_path>group_path</group_path><oss_user_id>888888</oss_user_id><page_url>http://epgURL</page_url>';
                    var xml = "<rss version='2.0'><channel>" + xmlSource + "</channel></rss>";
                    var xmlDoc = $.parseXML(xml),
                        $xml = $(xmlDoc),
                        $server_ip = $xml.find("server_ip"),
                        $group_name = $xml.find("group_name"),
                        $group_path = $xml.find("group_path"),
                        $oss_user_id = $xml.find("oss_user_id"),
                        $page_url = $xml.find("page_url"),
                        $partner = $xml.find("partner"),
                        $group_id = $xml.find("group_id"),
                        $cdc_group_id = $xml.find("cdc_group_id");

                    this.server_ip = $server_ip.text();
                    this.group_name = $group_name.text();
                    this.group_path = $group_path.text();
                    this.oss_user_id = $oss_user_id.text();
                    this.page_url = $page_url.text();
                    this.partner = $partner.text();
                    this.group_id = $group_id.text();
                    this.cdc_group_id = $cdc_group_id.text();


                    console.log("to server_ip -> %s", $server_ip.text());
                    console.log("to group_name -> %s", $group_name.text());
                    console.log("to group_path -> %s", $group_path.text());
                    console.log("to oss_user_id -> %s", $oss_user_id.text());
                    console.log("to page_url -> %s", $page_url.text());
                    console.log("to partner -> %s", $partner.text());
                    console.log("to group_id -> %s", $group_id.text());
                    console.log("to cdc_group_id -> %s", $cdc_group_id.text());


                    var indexUrl = this.GetQueryString("indexUrl");
                    sessionStorage.setItem("indexUrl", indexUrl);

                    this.getRelativePath();
                    this.doLogin();

                }
                this.pushLogToServer();
            },

            xml2Json(xml) {
                var obj = {};
                if (xml.nodeType == 1) { // element
                    // do attributes
                    console.log("1>>");
                    if (xml.attributes.length > 0) {
                        obj["@attributes"] = {};
                        for (var j = 0; j < xml.attributes.length; j++) {
                            var attribute = xml.attributes.item(j);
                            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                } else if (xml.nodeType == 3) { // text
                    console.log("2>>");
                    obj = xml.nodeValue;
                } else {
                    console.log("55>>", xml);
                }

                // do children
                console.log("3>>");
                if (xml.hasChildNodes()) {
                    console.log("4>>");
                    for (var i = 0; i < xml.childNodes.length; i++) {
                        var item = xml.childNodes.item(i);
                        var nodeName = item.nodeName;
                        if (typeof(obj[nodeName]) == "undefined") {
                            obj[nodeName] = xmlToJson(item);
                        } else {
                            if (typeof(obj[nodeName].push) == "undefined") {
                                var old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(xmlToJson(item));
                        }
                    }
                }
                return obj;
            },

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
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=EPGLogReq',
                    // url: '/iptv/service/epgservice/index.php?MessageType=EPGLogReq', //sessionStorage.getItem("relativePath") + 
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
            assignResult(result) {
                this.server_ip = result.server_ip;
                this.group_name = result.group_name;
                this.group_path = result.group_path;
                this.oss_user_id = result.oss_user_id;
                this.page_url = result.page_url;
                this.partner = result.partner;
                this.group_id = result.group_id;
                this.cdc_group_id = result.cdc_group_id;
            },
            getRelativePath() {
                //var pathName = location.pathname;
                //var relativePath = pathName.replace("portal.html", "");
                console.log("888888", relativePath);
                var relativePath = "/iptv/";
                // var relativePath = "/iptv/ppthdplay/SYHOTEL/";
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
                            // "USERID": !!window.Authentication ? Authentication.CTCGetConfig("UserID") : "123456",
                            "USERID": _this.oss_user_id,
                            "HotelGroupName": this.group_name,
                            "HotelGroupID": this.cdc_group_id,
                        },
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=STBLoginReq',
                    // url: '/iptv/service/epgservice/index.php?MessageType=STBLoginReq',
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
                                // window.location.href = sessionStorage.getItem("indexUrl");

                            }
                        } else {
                            console.log("doLogin网络请求失败");
                            // window.location.href = sessionStorage.getItem("indexUrl");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        // window.location.href = sessionStorage.getItem("indexUrl");
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
                    // url: '/iptv/service/epgservice/index.php?MessageType=DoAuthReq',
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
                                // window.location.href = sessionStorage.getItem("indexUrl");
                            }
                        } else {
                            // window.location.href = sessionStorage.getItem("indexUrl");

                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        console.log(err);
                        // window.location.href = sessionStorage.getItem("indexUrl");
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
            this.getUrlParamsTwo();
            // this.getUrlParams();


            // var indexUrl = this.GetQueryString("indexUrl");
            // sessionStorage.setItem("indexUrl", indexUrl);

            // this.getRelativePath();
            // this.doLogin();

        },
}
</script>
