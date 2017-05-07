<style scoped>
.info {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    background-image: url(../../assets/images/bg_time.png);
    background-size: 100%;
    background-color: black;
}

.main {
    width: 100%;
    height: 100%;
    padding-top: 100px;
}

.conent {
    width: 1066.67px;
    height: 400px;
    margin: auto;
}

.capitaltime {
    text-align: center;
    height: 12%;
    font-size: 30px;
    color: #FFC90E;
}

.detail {
    height: 88%;
    text-align: center;
    width: 100%;
}

.other {
    height: 33.34px;
    width: 100%;
    font-size: 23.34px;
    color: white;
}

.time {
    height: 33.34px;
    width: 100%;
    font-size: 23.34px;
    color: #FF8000;
}

.detail ul li {
    padding: 0 0.1066.67px;
    text-align: 400px;
    list-style: none;
    float: left;
    height: 120px;
    width: 333.34px;
    margin: auto;
}
</style>
<!--******************世界时间*******************-->
<template>
    <div>
        <div class="info" v-if='showWTimeLayout'>
            <div class="main">
                <div class="conent">
                    <div class="capitaltime">{{hint}}: {{getCurrTime}}</div>
                    <div class="detail">
                        <ul>
                            <li v-for="item in TimeData.CityList.City">
                                <div class="other">{{item.CityName}}</div>
                                <div class="other">{{switchTime(item.TimeZone)}}</div>
                                <div class="time">{{getHourMinute(item.TimeZone)}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer">
                    <!--   <img src="/assets/images/img_portal.png">
                  <div class="hint">>世界时间</div> -->
                </div>
            </div>
        </div>
        <!-- <loading v-if="showLoading"></loading> -->
    </div>
</template>
<script>
import moment from 'moment';
import Loading from '../Tools/Loading.vue';
import Http from '../../assets/lib/Http';
export default {
    data() {
            return {
                isRequestStatus: false,
                showLoading: true,
                showWTimeLayout: false,
                TimeData: {},
                z: 0,
                currentTime: 0,
                hint: "",
            };
        },

        computed: {
            getCurrTime() {
                var tempCurrTime = moment(this.currentTime).format('YYYY-MM-DD HH:mm:ss');
                var hint = sessionStorage.getItem("currLangCode");
                if (hint == "chi") {
                    tempCurrTime = moment(this.currentTime).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    tempCurrTime = moment(this.currentTime).format('MM/DD/YYYY HH:mm:ss');
                }
                return tempCurrTime;
            },
        },
        methods: {
            //转换时间
            switchTime(timeZone) {
                var localTime = this.currentTime;
                var longTimestamp = localTime + (timeZone - 8) * 60 * 60 * 1000;
                var longDate = moment(longTimestamp).format('YYYY年MM月DD日');
                var hint = sessionStorage.getItem("currLangCode");
                if (hint == "chi") {
                    longDate = moment(longTimestamp).format('YYYY年MM月DD日');
                } else {
                    longDate = moment(longTimestamp).format('MM/DD/YYYY');
                }
                return longDate;
            },
            getHourMinute(timeZone) {
                var localTime = this.currentTime;
                var longTimestamp = localTime + (timeZone - 8) * 60 * 60 * 1000;
                var longDate = moment(longTimestamp).format('HH:mm');
                return longDate;
            },

            addSecond() {
                this.currentTime += 1000;
            },
            listenBackKey() {
                document.addEventListener('keydown', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        this.$dispatch("stopVideo");
                        history.back();
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
            //获取世界时间
            getTimeData() {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetWorldTimeListReq",
                        "MessageBody": {
                            "LangCode": sessionStorage.getItem("currLangCode"),
                            "EpgGroupID": 1,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetWorldTimeListReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        // console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.TimeData = _msgBody;
                                _this.showWTimeLayout = true;
                                console.log(_this.TimeData.CurrentTime);
                                var arr = _this.TimeData.CurrentTime.split(" ");
                                var arrDate = arr[0].split("-");
                                var arrTime = arr[1].split(":");
                                // console.log(arrDate[0] + ">>" + arrDate[1] + ">>" + arrDate[2] + ">>" + arrTime[0] + ">>" + arrTime[1] + ">>" + arrTime[2]);
                                _this.currentTime = new Date(arrDate[0], arrDate[1] - 1, arrDate[2], arrTime[0], arrTime[1], arrTime[2]).getTime();
                                /**
                                 * _this.TimeData.CityList.City[0].CityName字段格式
                                 * {
                                 *      wordid: '733',
                                 *      variablename: 'beijing_time',
                                 *      chiword: '北京时间',
                                 *      engword: 'Beijing time',
                                 *      jpnword: '北京時間',
                                 *      ... ...
                                 * }
                                */
                                var firstTimeZone = parseInt(_this.TimeData.CityList.City[0].TimeZone);
                                _this.currentTime = _this.currentTime + firstTimeZone * 60 * 60 * 1000;
                                _this.z = setInterval(() => {
                                    _this.addSecond();
                                }, 1000);
                            } else {
                                console.log("请求数据失败");
                            }
                        } else {
                            console.log("网络请求失败");
                        }

                        _this.isRequestStatus = false;
                        _this.showLoading = false;

                    },
                    error: function(err) {
                        console.log(err);
                    },
                });


                // this.$http.post("/epgservice/index.php?MessageType=GetWorldTimeListReq", JSON.stringify(msgBody), {
                //         headers: {
                //             'Cache-Control': 'no-cache'
                //         },
                //     })
                //     .then((data) => {
                //         const _data = JSON.parse(data.body);
                //         const _msgBody = _data.Message.MessageBody;

                //         if (_msgBody.ResultCode == 200) {
                //             // console.log("请求成功");
                //             this.showLoading = false;
                //             this.TimeData = _msgBody;
                //             this.currentTime = new Date(this.TimeData.CurrentTime).getTime();
                //             var firstTimeZone = this.TimeData.CityList.City[0].TimeZone;
                //             this.currentTime = this.currentTime + firstTimeZone * 60 * 60 * 1000;

                //             this.z = setInterval(() => {
                //                 this.addSecond();
                //             }, 1000);
                //         } else {
                //             console.log("请求失败");
                //         }

                //         this.isRequestStatus = false;
                //         this.showLoading = false;
                //         this.showWTimeLayout = true;
                //     })
                //     .catch((e) => {
                //         // console.log('ajax error:', e);
                //         this.isRequestStatus = false;
                //     });

            },

        },

        events: {

        },

        components: {
            Loading,
        },

        ready() {
            var hint = sessionStorage.getItem("currLangCode");
            if (hint === "eng") {
                this.hint = "Current  Time";
            } else {
                this.hint = "当前时间";
            }  
            

            this.listenBackKey();
            this.getTimeData();
           this.$dispatch("pauseVideo");
        },

}
</script>
