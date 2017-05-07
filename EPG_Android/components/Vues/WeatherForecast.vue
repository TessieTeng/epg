<style scoped>
.info {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
}

.one {
    width: 100%;
    height: 100%;
}

.main {
    width: 100%;
    height: 100%;
}

.conent {
    width: 1280px;
    height: 75%;
    margin: auto;
    background: no-repeat;
    background-size: 100%;
}

.footer {
    width: 100%;
    height: 25%;
    margin: auto;
}


/*.adv { margin: 0.3rem 0; float: left; width: 20%; height: 100%; text-align: center; }*/

.city {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-image: url(../../assets/images/bg_portal_bottom.png);
}

.city ul {
    list-style: none;
    padding-top: 20px;
    margin-left: 53px;
}

.city ul:after {
    content: '';
    display: block;
    clear: both;
}

.city ul li {
    float: left;
    padding: 0 33.34px 20px;
}

.city ul li a {
    display: block;
}

.city ul li a img {
    height: 60px;
    width: 130px;
    border-radius: 6.67px;
    vertical-align: middle;
}

.city ul li a:focus img {
    box-shadow: 0.34px 0.34px 1.34px 6.67px #1A7FD2;
}

.common {
    width: 25%;
    float: left;
    height: 100%;
    text-align: center;
}

.cityinfo {
    margin-top: 120px;
    color: white;
    font-size: 40px;
}

.citytem {
    margin-top: 53.34px;
    color: white;
    font-size: 40px;
}

.date {
    margin-top: 160px;
    font-size: 26.67px;
    color: white;
}

.weatherimg {
    margin-top: 53.34px;
    width: 150px;
    height: 150px;
}

.other {
    margin-top: 106.67px;
    font-size: 26.67px;
    color: white;
}

.weatherimgother {
    margin-top: 33.34px;
    width: 100px;
    height: 100px;
}

.special {
    font-size: 26.67px;
    color: white;
    margin-top: 16.67px;
}

.cityImg {
    font-size: 33.34px;
    text-align: center;
    background-color: #ccc;
    color: black;
}
</style>
<!--******************天气预报*******************-->
<template>
    <div>
        <div class="info" v-if='showLayout'>
            <div class="main">
                <div class="conent weatherMain" v-bind:style="{ 'background-image': 'url(' + getImgFromUrl(currentItem.WeatherList.Weather[0].BigImageUrl) + ')'}">
                    <div class="common">
                        <div class="cityinfo">{{currentItem.CityName}}</div>
                        <div class="citytem">{{currentItem.temprature}}</div>
                    </div>
                    <div class="common">
                        <div class="date">{{today}}</div>
                        <div><img class="weatherimg" v-bind:src="getImgFromUrl(currentItem.WeatherList.Weather[0].SmallImageUrl)"></div>
                    </div>
                    <div class="common">
                        <div class="other">{{tomorrow}}</div>
                        <div><img id="tomorrowTemprature" class="weatherimgother" v-bind:src="getImgFromUrl(currentItem.WeatherList.Weather[1].SmallImageUrl)"></div>
                        <div class="special">{{formatTemperature(currentItem.WeatherList.Weather[1])}}</div>
                    </div>
                    <div class="common">
                        <div class="other">{{others}}</div>
                        <div><img id="thirdDayTemprature" class="weatherimgother" v-bind:src="getImgFromUrl(currentItem.WeatherList.Weather[2].SmallImageUrl)"></div>
                        <div class="special">{{formatTemperature(currentItem.WeatherList.Weather[2])}}</div>
                    </div>
                </div>
                <div class="footer">
                    <!--   <div class="adv">
                    <img src="/assets/images/ad_small.png">
                </div> -->
                    <div class="city">
                        <ul id="weatherListUl">
                            <li v-for="(index, item) in CurList" track-by='$index'>
                                <a href="javascript:;" @focus="changeCity(item)" @keydown='changeCurList($event, index)'>
                                    <img :src="item.CityImageUrl" class="cityImg" :alt="item.CityName">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <loading v-if="showLoading"></loading> -->
    </div>
</template>
<script>
import ImageLoader from '../../assets/lib/ImageLoader.js';
import Loading from '../Tools/Loading.vue';
import Http from '../../assets/lib/Http';
export default {
    data() {
            return {
                isRequestStatus: false,
                showLayout: false,
                showLoading: true,
                currentItem: {
                    WeatherList: {
                        Weather: [{
                            SmallImageUrl: ""
                        }, {
                            SmallImageUrl: ""
                        }, {
                            SmallImageUrl: ""
                        }]
                    }
                },
                today:"",
                tomorrow:"",
                others:"",
                weatherRoot: '../../assets/images/weather/',
                WeatherCityList: [],
                curListPage: 1,
                CurListLen: 12,
            };
        },
        computed: {
            CurList() {
                return this.WeatherCityList.slice((this.curListPage - 1) * this.CurListLen, this.curListPage * this.CurListLen);
            },
        },
        watch: {
            curListPage() {
                this.$nextTick(() => {
                    document.querySelector('#weatherListUl li a').focus();
                });
            }
        },
        methods: {
            changeCity(item) {
                this.currentItem = item;
                this.currentItem.temprature = this.formatTemperature(item.WeatherList.Weather[0]);
            },
            changeCurList(event, index) {
                if (event.keyCode === 38 && index < 6 && this.curListPage > 1) {
                    this.curListPage--;
                }
                if (event.keyCode === 40 && index >= 6 && this.curListPage < Math.ceil(this.WeatherCityList.length / this.CurListLen)) {
                    this.curListPage++;
                }
            },
            formatTemperature(temperature) {
                return temperature.LowTemperature + "℃ - " + temperature.HighTemperature + "℃";
            },
            getRootCategoryData(categoryId) {
                var _this = this;

                if (this.isRequestStatus) {
                    return;
                }

                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetWeatherInfoReq",
                        "MessageBody": {
                            "LangCode": sessionStorage.getItem("currLangCode"),
                            "EpgGroupID": 1,
                            "Token": sessionStorage.getItem("Token"),
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetWeatherInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        // console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                const tempPicList = [];
                                tempPicList.push(_this.getImgFromUrl(_msgBody.CityList.City[0].WeatherList.Weather[0].BigImageUrl));
                                // for (var i = 0; i < _msgBody.CityList.City.length; i++) {
                                //     tempPicList.push(_msgBody.CityList.City[i].CityImageUrl);
                                // }
                                ImageLoader({
                                    data: tempPicList,
                                    onFinish: function() {
                                        _this.showLoading = false;
                                        _this.showLayout = true;
                                        _this.WeatherCityList = _msgBody.CityList.City;
                                        _this.$nextTick(() => {
                                            document.querySelector('#weatherListUl li a').focus();
                                        });
                                    },
                                    onProgress: function(precent) {
                                        // console.log("加载中" + precent);
                                    }
                                });
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
            },
            listenBackKey() {
                window.onkeydown = function(event) {
                    var e = event || window.event;
                    if (e.keyCode == 8) {
                        history.back();
                    }
                };
            },
            getImgFromUrl(url) {
                if (!url) {
                    return '';
                }
                return `${this.weatherRoot}${url.match(/\/(\w*\.(?:gif|png|jpg))$/)[1]}`;
            },
        },

        events: {

        },

        components: {
            Loading,
        },

        props: [

        ],

        destroyed: function() {

        },

        ready() {
            var _this = this;
            var hint = sessionStorage.getItem("currLangCode");
            if (hint === "chi") {
                _this.today = "今天";
                _this.tomorrow = "明天";
                _this.others = "后天";


            } else if (hint === "eng") {
                _this.today = "today";
                _this.tomorrow = "tomorrow";
                _this.others = "the day after tomorrow";
            }

            this.getRootCategoryData();
            this.listenBackKey();
            this.$dispatch("pauseVideo");
        },
}
</script>
