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
            //获取湖北链接参数
            getUrlParams() {
                var x2js = new xml2json();
                this.totalUrl = decodeURIComponent(location.href);
                // this.totalUrl = decodeURIComponent("http://218.17.162.117:10003/iptv/portal.html?epg_info=%3Cserver_ip%3E27.31.32.37%3C%2Fserver_ip%3E%3Cgroup_name%3Ehbgd%3C%2Fgroup_name%3E%3Cgroup_path%3Ehttp%3A%2F%2F27.31.32.37%3A33200%2FEPG%2Fjsp%2Fhbgd%3C%2Fgroup_path%3E%3Coss_user_id%3Ehwxf150423204%3C%2Foss_user_id%3E%3Cpage_url%3Ehttp%3A%2F%2F27.31.32.37%3A33200%2FEPG%2Fjsp%2Fhbgd%2Fen%2Fau_PlayFilm.jsp%3C%2Fpage_url%3E%3Cpartner%3EHUAWEI%3C%2Fpartner%3E%3Cgroup_id%3E323%3C%2Fgroup_id%3E%3Carea_id%3E10004%3C%2Farea_id%3E%3Ccsm_id%3EHBGD%3C%2Fcsm_id%3E%3Ccdc_group_id%3E639893a00e18451eb6a69110da086401%3C%2Fcdc_group_id%3E#!/app?epg_info=%253Cserver_ip%253E27.31.32.37%253C%252Fserver_ip%253E%253Cgroup_name%253Ehbgd%253C%252Fgroup_name%253E%253Cgroup_path%253Ehttp%253A%252F%252F27.31.32.37%253A33200%252FEPG%252Fjsp%252Fhbgd%253C%252Fgroup_path%253E%253Coss_user_id%253Ehwxf150423204%253C%252Foss_user_id%253E%253Cpage_url%253Ehttp%253A%252F%252F27.31.32.37%253A33200%252FEPG%252Fjsp%252Fhbgd%252Fen%252Fau_PlayFilm.jsp%253C%252Fpage_url%253E%253Cpartner%253EHUAWEI%253C%252Fpartner%253E%253Cgroup_id%253E323%253C%252Fgroup_id%253E%253Carea_id%253E10004%253C%252Farea_id%253E%253Ccsm_id%253EHBGD%253C%252Fcsm_id%253E%253Ccdc_group_id%253E639893a00e18451eb6a69110da086401%253C%252Fcdc_group_id%253E");
                console.log("this.totalUrl:", this.totalUrl);
                // var param = decodeURIComponent(this.totalUrl.split("#!/app?")[1]);
                var param = this.totalUrl;
                console.log("param是：", param);
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

                    this.doLogin();
                } else {
                    this.goToIptv('获取不了url参数');
                }
            },

            getConfig() {
                for (const key in Config) {

                    // 如果是对象转成 json 存储，用的时候请使用 JSON.parse 解析后使用
                    if (typeof(Config[key]) === 'object') {
                        sessionStorage.setItem(key, JSON.stringify(Config[key]));
                    } else {
                        sessionStorage.setItem(key, Config[key]);
                    }
                }
                // sessionStorage.setItem("relativePath", Config.relativePath);
                // sessionStorage.setItem("province", Config.province);

                if (!!window.Authentication) {
                    const epgdomain = Authentication.CTCGetConfig('EPGDomain');
                    //中兴平台
                    const last = epgdomain.lastIndexOf("/");
                    const zhongxingMediaUrlOrigin = epgdomain.substr(0, last);
                    //华为平台
                    const str = epgdomain.indexOf('/',10);
                    const huaweiMediaUrlOrigin = epgdomain.substr(0, str);

                    sessionStorage.setItem("huaweiMediaUrlOrigin", huaweiMediaUrlOrigin);
                    sessionStorage.setItem("zhongxingMediaUrlOrigin", zhongxingMediaUrlOrigin);
                    sessionStorage.setItem("EPGDomain", Authentication.CTCGetConfig('EPGDomain'));
                    sessionStorage.setItem("UrlOrigin", Authentication.CTCGetConfig('EPGDomain').match(/^(https?:\/\/.*:\d+)\//)[1]);
                    sessionStorage.setItem("UserToken", Authentication.CTCGetConfig('UserToken'));
                    sessionStorage.setItem("USERID", Authentication.CTCGetConfig("UserID"));
                    sessionStorage.setItem("STBID", Authentication.CTCGetConfig("STBID"));
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
                        tmpBOdy.USERID = this.userid;
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
                        console.log(err);
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
                // alert(str);
                location.href = sessionStorage.getItem("indexUrl");
            },

            goToWelcome() {
                if (/^https?:\/\//.test(sessionStorage.getItem("WelcomePageGroupPath"))) {
                    // 链接跳转
                    location.replace(sessionStorage.getItem("WelcomePageGroupPath"));
                } else if (sessionStorage.getItem("WelcomePageGroupPath") == "test") {
                    // 测试路径
                    location.replace("./epggroup_welcomes/welcome_test/welcome.html");
                } else {
                    // 正式路径
                    location.replace("./epggroup_welcomes/welcome_default/welcome.html");
                }
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
                location.replace(path + file);
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

                this.userid = paramObj.userid;
                this.userGroup = paramObj.userGroup;
                this.areaID = paramObj.areaID;
                this.servername = paramObj.servername;
                this.serverport = paramObj.serverport;
                this.remoteaddr = paramObj.remoteaddr;

                sessionStorage.setItem('userid', this.userid);
                sessionStorage.setItem('userGroup', this.userGroup);
                sessionStorage.setItem('areaID', this.areaID);
                sessionStorage.setItem('servername', this.servername);
                sessionStorage.setItem('serverport', this.serverport);
                sessionStorage.setItem('remoteaddr', this.remoteaddr);

                /* IPTV 首页地址，ywbz是测试分组，后面根据需求会发生改变 */
                const serverip = this.servername || '113.136.96.196';
                const serverport = this.serverport || '8282';
                sessionStorage.setItem("indexUrl", "http://" + serverip + ':' + serverport + "/EPG/jsp/ywbz/en/Category.jsp");

                const currUrl = window.location.href;

                // 将当前 url 保存为首页地址，113.136.46.37是模板中的服务器地址
                console.log('location: ' + currUrl + ', iptv: ' + sessionStorage.getItem('indexUrl'));

                // 这里固定写死，只要不包含查找的字符串，就直接重新设置
                // 这里也可以不用添加该判断，因为只会在开机的时候执行一次
                if (currUrl.indexOf('113.136.46.37/iptv/portal.html') === -1) {
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
        },

        ready() {

            var _this = this;

            this.getConfig();

            const province = sessionStorage.getItem('province');

            // 标识是不是第一次开机进入欢迎页，后面走portal就不用再认证登录，直接进入主页
            var isFirstStart = sessionStorage.getItem('ISFIRSTSTART');
            console.log('isFirstStart: ' + isFirstStart);
            if (isFirstStart !== '1') {
                sessionStorage.setItem('ISFIRSTSTART', '1');
            } else { // 直接进入主页面
                this.gotoMainLayout();
                return;
            }

            // 茁壮中间件默认焦点框问题
            console.log('ipanel: ' + iPanel);
            if (!!window.iPanel) {
                iPanel.focusWidth = 0;
            }

            // 保存当前地址的 IP + Port
            let epgIp = window.location.href.replace(/http:\/\/|https:\/\//, '');
            if (epgIp.indexOf('/') > -1) {
                epgIp = epgIp.substring(0, ip.indexOf('/'));
            }
            sessionStorage.setItem('EPGIP', ip);

            switch (sessionStorage.getItem('province')) {
                case '云南':
                    if (!sessionStorage.getItem("indexUrl") && !!this.GetQueryString("indexUrl")) {
                        sessionStorage.setItem("indexUrl", this.GetQueryString("indexUrl"));
                    }
                    this.doLogin();
                    break;
                case '湖北':
                    sessionStorage.setItem("indexUrl", "http://116.210.255.120:8080/HBEpg/epg/broadBandTV.jsp");
                    this.getUrlParams();
                    break;
                case '陕西':
                    this.configShanxiParams();
                    break;
                case '河南':
                    //TODO 区分中兴和华为
                    if (!sessionStorage.getItem("from") && !!this.GetQueryString("from")) {
                        sessionStorage.setItem("from", this.GetQueryString("from"));
                    } else if (!sessionStorage.getItem("userid") && !!this.GetQueryString("userid")) {
                        sessionStorage.setItem("userid", this.GetQueryString("userid"));
                    }
                    this.doLogin();
                    break;
                default:
                    break;
            }

        },
}
</script>
