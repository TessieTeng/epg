<style>
</style>
<template>
    <div id="app">
    </div>
</template>
<script>
import Http from '../../assets/lib/Http';
import xml2json from '../../assets/lib/xml2json.min';
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

                // 陕西参数
                userid: '',
                userGroup: '',
                areaID: '',
                servername: '',
                serverport: '',
                remoteaddr: '',
            };
        },
        methods: {
            EPGLog(params = {
                OperationCode: '',
                Detail: '',
            }) {

                const path = sessionStorage.getItem("WelcomePageGroupPath");

                // if (sessionStorage.getItem("WelcomePageGroupPath") !== 'test') {
                //     return;
                // }

                const tmpObj = {
                    "Message": {
                        "MessageType": "EPGLogReq",
                        "MessageBody": {
                            "USERID": sessionStorage.getItem("USERID"),
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
            //获取湖北链接参数
            getUrlParams() {
                var x2js = new xml2json();
                var _this = this;
                this.totalUrl = decodeURIComponent(location.href);

                var param = this.totalUrl;
                if (param) {
                    var xmlSource = param.split("=")[1];
                    console.log("获取到的参数：", xmlSource);
                    var xmlText = "<xml>" + xmlSource + "</xml>";
                    var jsonObj = x2js.xml_str2json(xmlText);
                    console.log("最终获得的参数Json对象是:", jsonObj);

                    // 如果这种方法不支持，就改回一个个赋值吧
                    // 里面包含字段：server_ip, group_name, group_path, oss_user_id, page_url, partner, group_id, cdc_group_id, area_id, csm_id,
                    // for (const key in jsonObj.xml) {
                    //     if (jsonObj.xml.hasOwnProperty(key)) {
                    //         this.$set(this, key, jsonObj.xml[key]);
                    //     }
                    // }

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

                    sessionStorage.setItem("server_ip", this.server_ip); //用户访问的EPG服务器IP地址
                    sessionStorage.setItem("group_name", this.group_name); //EPG模板名称
                    sessionStorage.setItem("group_path", this.group_path); //用户分组所对应得Epg路径名
                    sessionStorage.setItem("oss_user_id", this.oss_user_id); //IPTV账号
                    sessionStorage.setItem("page_url", this.page_url); //在第三方页面视频播放URL
                    sessionStorage.setItem("partner", this.partner); //厂商平台参数，以ZTE、HUAWEI打头
                    sessionStorage.setItem("group_id", this.group_id); //用户分组ID
                    sessionStorage.setItem("cdc_group_id", this.cdc_group_id);
                    sessionStorage.setItem("area_id", this.area_id);
                    sessionStorage.setItem("csm_id", this.csm_id);

                    // 后期如果从url参数拿到indexUrl，则要在这里set到sessionStorage里面

                    this.EPGLog({
                        OperationCode: 'getUrlParams',
                        Detail: JSON.stringify(jsonObj),
                    });

                    this.doLogin();
                } else {
                    this.goToIptv('获取不了url参数');
                }
            },

            setConfig(config) {

                var setOne = function(cfg) {

                    for (let key in cfg) {
                        if (typeof(cfg[key]) === 'object') {
                            sessionStorage.setItem(key, JSON.stringify(cfg[key]));
                        } else {
                            sessionStorage.setItem(key, cfg[key]);
                        }
                    }
                };

                if (Object.prototype.toString.call(config) === '[object Array]') {
                    for (let i = 0; i < config.length; i++) {
                        setOne(config[i]);
                    }
                } else {
                    setOne(config);
                }
            },

            getConfig() {

                this.setConfig(Config);
                sessionStorage.setItem('EpgVersion', JSON.stringify(EpgVersion));
                if (!!window.Authentication) {
                    const epgdomain = Authentication.CTCGetConfig('EPGDomain');
                    //中兴平台
                    const last = epgdomain.lastIndexOf("/");
                    const zhongxingMediaUrlOrigin = epgdomain.substr(0, last);
                    //华为平台
                    const str = epgdomain.indexOf('/', 10);
                    const huaweiMediaUrlOrigin = epgdomain.substr(0, str);

                    sessionStorage.setItem("huaweiMediaUrlOrigin", huaweiMediaUrlOrigin);
                    sessionStorage.setItem("zhongxingMediaUrlOrigin", zhongxingMediaUrlOrigin);
                    sessionStorage.setItem("EPGDomain", Authentication.CTCGetConfig('EPGDomain'));
                    sessionStorage.setItem("UrlOrigin", Authentication.CTCGetConfig('EPGDomain').match(/^(https?:\/\/.*:\d+)\//)[1]);
                    sessionStorage.setItem("UserToken", Authentication.CTCGetConfig('UserToken'));
                    sessionStorage.setItem("USERID", Authentication.CTCGetConfig("UserID"));
                    sessionStorage.setItem("STBID", Authentication.CTCGetConfig("STBID"));

                    this.EPGLog({
                        OperationCode: 'getConfig',
                        Detail: JSON.stringify({
                            EpgVersion: EpgVersion,
                            zhongxingMediaUrlOrigin: sessionStorage.getItem('zhongxingMediaUrlOrigin'),
                            huaweiMediaUrlOrigin: sessionStorage.getItem('huaweiMediaUrlOrigin'),
                            UserToken: Authentication.CTCGetConfig('UserToken'),
                            USERID: Authentication.CTCGetConfig("UserID"),
                            STBID: Authentication.CTCGetConfig("STBID"),
                            UrlOrigin: Authentication.CTCGetConfig('EPGDomain').match(/^(https?:\/\/.*:\d+)\//)[1],
                        }),
                    });
                }
            },

            doLogin() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus == true;
                const tmpBody = {
                    "STBID": window.Authentication ? Authentication.CTCGetConfig("STBID") : '',
                }

                switch (sessionStorage.getItem('province')) {
                    case '云南':
                        tmpBody.USERID = window.Authentication ? Authentication.CTCGetConfig("UserID") : '';
                        break;
                    case '湖北':
                        tmpBody.USERID = this.oss_user_id;
                        tmpBody.HotelGroupName = this.group_name;
                        tmpBody.HotelGroupID = this.cdc_group_id;
                        break;
                    case '陕西':
                        tmpBody.USERID = this.userid || sessionStorage.getItem('userid') || Authentication.CTCGetConfig("UserID");
                        break;
                    case '河南':
                        if (sessionStorage.getItem('from') === 'huawei') {
                            tmpBody.USERID = sessionStorage.getItem('userid') || Authentication.CUGetConfig("UserID");
                        } else {
                            tmpBody.USERID = window.Authentication ? Authentication.CTCGetConfig("UserID") : '';
                        }
                        break;
                    default:
                        break;
                }
                const tmpObj = {
                    "Message": {
                        "MessageType": "STBLoginReq",
                        "MessageBody": tmpBody,
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=STBLoginReq',
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
                                _this.EPGLog({
                                    OperationCode: 'STBLoginReq',
                                    Detail: JSON.stringify({
                                        reqBody: tmpObj,
                                        data: data.response,
                                    }),
                                });
                                _this.doAuth();
                            } else {
                                console.log("doLogin请求数据失败");
                                _this.goToIptv("doLogin请求数据失败");

                            }
                        } else {
                            console.log("doLogin网络请求失败");
                            _this.goToIptv("doLogin网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        _this.goToIptv(err);
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
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=DoAuthReq',
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

                                _this.EPGLog({
                                    OperationCode: 'DoAuthReq',
                                    Detail: JSON.stringify({
                                        reqBody: tmpObj,
                                        data: data.response,
                                    }),
                                });


                                _this.getSysParam();
                            } else {
                                console.log("Auth请求数据失败");
                                _this.goToIptv("Auth请求数据失败");
                            }
                        } else {
                            console.log("Auth网络请求失败");
                            _this.goToIptv("Auth网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;
                    },
                    error: function(err) {
                        _this.goToIptv(err);
                    },
                });
            },

            getSysParam() {
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
                                    "Name": "bg_media_url",
                                }]
                            },
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetSysParamReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _msgBody.ParamList.Param.map(item => {
                                    sessionStorage.setItem(item.Name, item.Value);
                                });

                                _this.EPGLog({
                                    OperationCode: 'GetSysParamReq',
                                    Detail: JSON.stringify({
                                        reqBody: tmpObj,
                                        data: data.response,
                                    }),
                                });

                                if (_this.GetQueryString("cKey") === 'back') {
                                    _this.gotoMainLayout();
                                } else {
                                    _this.goToWelcome();
                                }
                            } else {
                                console.log("视频数据获取失败");
                                _this.goToIptv("视频数据获取失败");
                            }
                        } else {
                            console.log("视频网络请求失败");
                            _this.goToIptv("视频网络请求失败");
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

            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },

            getObjStr(obj) {
                let str = '';
                for (const key in obj) {
                    str += key + ': ' + obj[key] + '; ';
                }
                return str;
            },

            goToIptv(err) {

                let str = '';
                if ((typeof err).toLowerCase() === 'string') {
                    str = err;
                } else {
                    str = this.getObjStr(err);
                }

                this.EPGLog({
                    OperationCode: 'goToIptv-request broken',
                    Detail: str,
                });

                // alert(str);
                location.href = sessionStorage.getItem("indexUrl");
            },

            gotoAd() {
                // location.replace("./epggroup_ads/ad_test/ad.html");
                this.goToWelcome();

                /*
                   if (/^https?:\/\//.test(sessionStorage.getItem("AdPageGroupPath"))) {
                   // 链接跳转
                   location.replace(sessionStorage.getItem("AdPageGroupPath"));
                   } else if (sessionStorage.getItem("AdPageGroupPath") == "test") {
                   // 测试路径
                   location.replace("./epggroup_ads/ad_test/ad.html");
                   } else {
                   // 正式路径
                   location.replace("./epggroup_ads/ad_default/ad.html");
                   }*/
            },

            runTestWelcome() {
                const toLinkPath = sessionStorage.getItem('toLinkPath') === '1';

                // 之前跳转过链接
                if (toLinkPath) {
                    sessionStorage.setItem('WelcomePageGroupPath', 'test');
                }

                const welPath = sessionStorage.getItem('WelcomePageGroupPath');
                const isWelLink = /^https?:\/\//.test(welPath);
                if (!toLinkPath && isWelLink) {
                    sessionStorage.setItem(
                        'isFromTestLink',
                        sessionStorage.getItem('WelcomePageGroupPath')
                    );
                    sessionStorage.setItem('toLinkPath', '1');
                    // 链接跳转
                    location.replace(welPath);
                } else if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                    // 测试路径
                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                } else {
                    // 正式路径
                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                }
            },

            runNormalWelcome() {
                const welPath = sessionStorage.getItem('WelcomePageGroupPath');
                if (/^https?:\/\//.test(welPath)) {
                    // 链接跳转
                    location.replace(welPath);
                } else if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                    // 测试路径
                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                } else {
                    // 正式路径
                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                }
            },

            goToWelcome() {
                this.EPGLog({
                    OperationCode: 'goToWelcome-path',
                    Detail: JSON.stringify({
                        welcomePath: sessionStorage.getItem("WelcomePageGroupPath"),
                        location: window.location.href,
                    })
                });

                /*
                   警告：测试时使用 runTestWelcome，正式环境使用 runNormalWelcome，
                   提交时请注释 this.runTestWelcome();, 放开 this.runNormalWelcome();
                 */
                /* this.runTestWelcome();*/
                this.runNormalWelcome();
            },

            gotoMainLayout() {
                let path = './epggroup_mains/main_default/';
                let file = 'main.html';
                const {
                    vendor,
                    appName,
                    userAgent
                } = navigator;

                // 这里注释链接跳转，是因为这里为了处理IPTV按返回键做返回处理，忽略在后台配置的链接跳转
                /*if (/^https?:\/\//.test(sessionStorage.getItem("MainPath"))) {
                   // 链接跳转
                   location.replace(sessionStorage.getItem("MainPath"));
                   return;
                   } else */

                if (sessionStorage.getItem("MainPath") == "test") {
                    // 测试路径
                    path = './epggroup_mains/main_test/';
                } else {
                    // 正式路径
                }
                // UT盒子：MC8638
                if (vendor === 'Apple Inc.' && appName === 'EIS iPanel' && userAgent === 'Sunniwell') {
                    const lang = sessionStorage.getItem("currLangCode") || 'chi';
                    file = `main_outer.html?currLangCode=${lang}`;
                }

                let targetUrl = path + file;

                this.EPGLog({
                    OperationCode: 'gotoMainLayout',
                    Detail: JSON.stringify({
                        targetUrl: targetUrl,
                        navigator: navigator,
                    })
                });

                location.replace(targetUrl);
            },

            configShanxiParams() {
                // var domain = Authentication.CTCGetConfig('EPGDomain');
                /*
                   这里可以直接使用 location.href，因为ready里面做了判断，只有第一次开机
                   才会到这个配置函数，即不会重复配置
                 */
                const domain = window.location.href;
                console.log('domain: ' + domain);
                let paramObj = null;
                let params = domain.split('?')[1].split('&');
                let param = null;

                console.log('params: ' + JSON.stringify(params));
                if (!params || params.length <= 0) {
                    this.goToIptv('获取不了url参数');
                    return;
                } else {
                    paramObj = {};
                }

                for (let i = 0; i < params.length; i++) {
                    param = params[i].split('=');
                    paramObj[param[0]] = param[1];
                }

                this.userid = paramObj.userid || this.GetQueryString('userid');
                this.userGroup = paramObj.userGroup || this.GetQueryString('userGroup');
                this.areaID = paramObj.areaID || this.GetQueryString('areaID');
                this.servername = paramObj.servername || this.GetQueryString('servername');
                this.serverport = paramObj.serverport || this.GetQueryString('serverport');
                this.remoteaddr = paramObj.remoteaddr || this.GetQueryString('remoteaddr');
                this.from = paramObj.from || this.GetQueryString('from');

                sessionStorage.setItem('userid', this.userid);
                sessionStorage.setItem('userGroup', this.userGroup);
                sessionStorage.setItem('areaID', this.areaID);
                sessionStorage.setItem('servername', this.servername);
                sessionStorage.setItem('serverport', this.serverport);
                sessionStorage.setItem('remoteaddr', this.remoteaddr);
                sessionStorage.setItem('from', this.from);

                /* IPTV 首页地址，ywbz是测试分组，后面根据需求会发生改变 */
                const serverip = this.servername || '113.136.96.196';
                const serverport = this.serverport || '8282';
                let indexUrl = '',
                    key = '';
                // 根据平台从config.js里取出配置
                key = sessionStorage.getItem('from') + 'Path';
                // 拼接 iptv 地址
                indexUrl = "http://" + serverip + ':' + serverport + sessionStorage.getItem(key);
                sessionStorage.setItem("indexUrl", indexUrl);

                this.EPGLog({
                    OperationCode: '模板参数',
                    Detail: JSON.stringify({
                        userid: sessionStorage.getItem('userid'),
                        userGroup: sessionStorage.getItem('userGroup'),
                        servername: sessionStorage.getItem('servername'),
                        serverport: sessionStorage.getItem('serverport'),
                        remoteaddr: sessionStorage.getItem('remoteaddr'),
                        from: sessionStorage.getItem('from'),
                        indexUrl: sessionStorage.getItem('indexUrl'),
                    })
                });

                const currUrl = window.location.href;

                // 这里固定写死，只要不包含查找的字符串，就直接重新设置
                // 这里也可以不用添加该判断，因为只会在开机的时候执行一次
                if (currUrl.indexOf('113.136.46.40/iptv/portal.html') === -1) {
                    sessionStorage.setItem('EPGDomain', currUrl);

                    // 保障起见，将首页地址和272热键地址都修改成我们的portal地址
                    Authentication.CTCSetConfig('EPGDomain', currUrl);
                    Authentication.CTCSetConfig(
                        'ServiceEntry',
                        'URL=' + currUrl + ',HotKey="272",Desc="酒店EPG首页"'
                    );
                }

                this.doLogin();
            },

            configYunnanParams() {

                var ynIndexUrl = '';
                var relativePath = sessionStorage.getItem('relativePath');
                var localIp = sessionStorage.getItem('EPGIP');

                relativePath = relativePath.replace(/\/service/, '');

                // Authentication.CTCSetConfig('EPGDomain', 'http://' + localIp + relativePath + '/portal.html');
                // UT 盒子会自己下发，创维的不行，所以兼容没有returnUrl情况
                if (!sessionStorage.getItem("indexUrl") && !!this.GetQueryString("indexUrl")) {
                    ynIndexUrl = this.GetQueryString("indexUrl");
                    sessionStorage.setItem("indexUrl", ynIndexUrl);
                } else {

                    // ynIndexUrl = 'http://' + localIp + '/iptv/ppthdplay/apps/index/index_epg.html';
                    sessionStorage.setItem(
                        "indexUrl",
                        "http://182.245.29.132:78/iptv/ppthdplay/hotelapps/index/index_epg.html"
                    );
                }

                this.EPGLog({
                    OperationCode: '模板参数',
                    Detail: JSON.stringify({
                        localIp: sessionStorage.getItem('localIp'),
                        relativePath: sessionStorage.getItem('relativePath'),
                        indexUrl: sessionStorage.getItem('indexUrl'),
                    })
                });

                this.doLogin();
            },

            configHenanParams() {

                //TODO 区分中兴和华为
                if (!sessionStorage.getItem("from") && !!this.GetQueryString("from")) {
                    sessionStorage.setItem("from", this.GetQueryString("from"));
                } else if (!sessionStorage.getItem("userid") && !!this.GetQueryString("userid")) {
                    sessionStorage.setItem("userid", this.GetQueryString("userid"));
                }

                let userId = sessionStorage.getItem('USERID') || Authentication.CUGetConfig('UserID');
                let ip = sessionStorage.getItem('EPGIP') || "10.253.255.4";
                let indexUrl = '' + 'http://10.254.191.10:35807/hnlthotel/topSkip.html?userId=' + userId + '&carrierId=204&industry=hotel&state=1&categoryid=dc00005224&backtovideo=false&' + 'returnurl=http%3A%2F%2F' + ip + '%2Fiptv%2Fportal.html';
                /*
                   + 'http://202.99.114.71:40001/hnlthotel/homePage.html?'
                   + 'userId=' + userId
                   + '&carrierId=204&industry=hotel&state=1&categoryid=dc00005223&'
                   + 'returnurl=http%3A%2F%2F'
                   + ip + '%2Fiptv%2Fportal.html'; */

                if (!sessionStorage.getItem('indexUrl') && !!this.GetQueryString('indexUrl')) {
                    sessionStorage.setItem('indexUrl', this.GetQueryString('indexUrl'));
                } else {
                    sessionStorage.setItem('indexUrl', indexUrl);
                }

                this.EPGLog({
                    OperationCode: '模板参数',
                    Detail: JSON.stringify({
                        from: sessionStorage.getItem('from'),
                        userid: sessionStorage.getItem('userid'),
                        indexUrl: sessionStorage.getItem('indexUrl'),
                    })
                });

                //处理河南华为平台机顶盒按首页键和选项键界面卡死问题
                if (!!window.Authentication) {
                    Authentication.CUSetConfig('EPGDomain', 'http://10.253.255.4/iptv/epggroup_mains/main_default/main.html');
                }

                this.doLogin();
            },
        },

        ready() {

            var _this = this;

            this.getConfig();

            const province = sessionStorage.getItem('province');

            // 标识是不是第一次开机进入欢迎页，后面走portal就不用再认证登录，直接进入主页
            var isFirstStart = sessionStorage.getItem('ISFIRSTSTART');


            // 湖北和云南不采用此功能，且不能是链接路径
            if (province !== '湖北' && province !== '云南') {
                if (!isFirstStart && isFirstStart !== '1') {
                    sessionStorage.setItem('ISFIRSTSTART', '1');
                } else { // 直接进入主页面
                    this.gotoMainLayout();
                    return;
                }
            }

            // 茁壮中间件默认焦点框问题
            if (!!window.iPanel) {
                iPanel.focusWidth = 0;
            }

            // 保存当前地址的 IP + Port
            let epgIp = window.location.href.replace(/https?\:\/\//, '').replace(/(\/|\?).+/, '');
            // if (epgIp.indexOf('/') > -1 || epgIp.indexOf('?')) {
            // epgIp = epgIp.substring(0, epgIp.indexOf('/'));
            // }
            sessionStorage.setItem('EPGIP', epgIp);

            let indexUrl = '';
            switch (sessionStorage.getItem('province')) {
                case '云南':
                    this.configYunnanParams();
                    break;
                case '湖北':
                    indexUrl = "http://116.210.255.120:8080/HBEpg/epg/broadBandTV.jsp";
                    sessionStorage.setItem("indexUrl", indexUrl);
                    this.getUrlParams();
                    break;
                case '陕西':
                    this.configShanxiParams();
                    break;
                case '河南':
                    this.configHenanParams();
                    break;
                default:
                    break;
            }

            this.EPGLog({
                OperationCode: '开机配置',
                Detail: JSON.stringify({
                    EPGIP: sessionStorage.getItem('EPGIP'),
                    indexUrl: JSON.stringify({
                        indexUrl: sessionStorage.getItem('indexUrl'),
                        EPGIP: sessionStorage.getItem('EPGIP'),
                        MainPath: sessionStorage.getItem("MainPath"),
                        isFirstStart: isFirstStart,
                    }),
                })
            });

        },
}
</script>
