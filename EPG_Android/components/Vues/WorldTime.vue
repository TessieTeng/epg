<style scoped>
html {
    font-size: 100px;
}

.info {
    position: fixed;
    z-index: 2;
    left: 0rem;
    top: 0rem;
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
    padding-top: 1.5rem;
}

.conent {
    width: 16rem;
    height: 6rem;
    margin: auto;
}

.capitaltime {
    text-align: center;
    height: 12%;
    font-size: 0.45rem;
    color: #FFC90E;
}

.detail {
    height: 88%;
    text-align: center;
    width: 100%;
}

.other {
    height: 0.5rem;
    width: 100%;
    font-size: 0.35rem;
    color: white;
}

.time {
    height: 0.5rem;
    width: 100%;
    font-size: 0.35rem;
    color: #FF8000;
}

.detail ul li {
    padding: 0 0.16rem;
    text-align: center;
    list-style: none;
    float: left;
    height: 1.8rem;
    width: 5.0rem;
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
                var tempCurrTime = moment(this.currentTime).format('YYYY-MM-DD hh:mm:ss');
                var hint = DataSource.currLangCode;
                if (hint == "chi") {
                    tempCurrTime = moment(this.currentTime).format('YYYY-MM-DD hh:mm:ss');
                } else {
                    tempCurrTime = moment(this.currentTime).format('MM/DD/YYYY hh:mm:ss');
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
                var hint = DataSource.currLangCode;
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
                var longDate = moment(longTimestamp).format('hh:mm');
                return longDate;
            },

            addSecond() {
                this.currentTime += 1000;
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
                            "LangCode": DataSource.currLangCode,
                            "EpgGroupID": 1,
                            "Token": DataSource.Token,
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: DataSource.relativePath + 'service/epgservice/index.php?MessageType=GetWorldTimeListReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
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
                                console.log(arrDate[0] + ">>" + arrDate[1] + ">>" + arrDate[2] + ">>" + arrTime[0] + ">>" + arrTime[1] + ">>" + arrTime[2]);
                                _this.currentTime = new Date(arrDate[0], arrDate[1] - 1, arrDate[2], arrTime[0], arrTime[1], arrTime[2]).getTime();

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
            var _this = this;
            var hint = DataSource.currLangCode;
            if (hint === "chi") {
                _this.hint = "当前时间";

            } else if (hint === "eng") {
                _this.hint = "Current  Time";
            }


            this.getTimeData();
           // this.$dispatch("pauseVideo");
        },

}
</script>
