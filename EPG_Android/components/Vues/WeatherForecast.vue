<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 2;
    left: 0rem;
    top: 0rem;
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
    width: 19.2rem;
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
    float: left;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: url(../../assets/images/bg_portal_bottom.png);
}

.city ul {
    list-style: none;
    top: 0;
    margin: 0;
    padding: 0;
    margin-left: 0.8rem;
}

.city ul li {
    float: left;
    padding: 0.04rem 0.5rem;
    height: 1.2rem;
    line-height: 1.2rem;
}

.city ul li a img {
    height: 0.9rem;
    width: 1.95rem;
    border-radius: 0.1rem;
}

.city ul li a {
    display: inline-block;
    font-size: 0;
    height: 0.8rem;
}

.city ul li a:focus img {
    box-shadow: 0.005rem 0.005rem 0.02rem 0.1rem #1A7FD2;
}

.common {
    width: 25%;
    float: left;
    height: 100%;
    text-align: center;
}

.cityinfo {
    margin-top: 1.8rem;
    color: white;
    font-size: 0.6rem;
}

.citytem {
    margin-top: 0.8rem;
    color: white;
    font-size: 0.6rem;
}

.date {
    margin-top: 2.4rem;
    font-size: 0.4rem;
    color: white;
}

.weatherimg {
    margin-top: 0.8rem;
    width: 2.5rem;
    height: 2.5rem;
}

.other {
    margin-top: 1.6rem;
    font-size: 0.4rem;
    color: white;
}

.weatherimgother {
    margin-top: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
}

.special {
    font-size: 0.4rem;
    color: white;
    margin-top: 0.25rem;
}

.cityImg {
    font-size: 0.5rem;
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
                <div class="conent weatherMain" v-bind:style="{ 'background-image': 'url('+ './'+currentItem.WeatherList.Weather[0].BigImageUrl+')'}">
                    <div class="common">
                        <div class="cityinfo">{{currentItem.CityName}}</div>
                        <div class="citytem">{{currentItem.temprature}}</div>
                    </div>
                    <div class="common">
                        <div class="date">{{today}}</div>
                        <div><img class="weatherimg" v-bind:src="'./'+currentItem.WeatherList.Weather[0].SmallImageUrl"></div>
                    </div>
                    <div class="common">
                        <div class="other">{{tomorrow}}</div>
                        <div><img id="tomorrowTemprature" class="weatherimgother" v-bind:src="'./'+currentItem.WeatherList.Weather[1].SmallImageUrl"></div>
                        <div class="special">{{getTomorrowTemperature(currentItem.WeatherList.Weather[1])}}</div>
                    </div>
                    <div class="common">
                        <div class="other">{{others}}</div>
                        <div><img id="thirdDayTemprature" class="weatherimgother" v-bind:src="'./'+currentItem.WeatherList.Weather[2].SmallImageUrl"></div>
                        <div class="special">{{getThirdDayTemp(currentItem.WeatherList.Weather[2])}}</div>
                    </div>
                </div>
                <div class="footer">
                    <!--   <div class="adv">
                    <img src="/assets/images/ad_small.png">
                </div> -->
                    <div class="city">
                        <ul id="weatherListUl">
                            <li v-for="item in WeatherCityList">
                                <a href="javascript:;" v-on:focus="changeCity(item)">
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

                WeatherCityList: [],
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

            };
        },


        methods: {
            changeCity(item) {
                this.currentItem = item;
                this.currentItem.temprature = item.WeatherList.Weather[0].LowTemperature + "℃ - " + item.WeatherList.Weather[0].HighTemperature + "℃";


             //图片地址设置
             /*   var url = item.CityImageUrl;
                console.log('url########'+ url);
                if (url == "") {
                   console.log(url);
                } else if (url.length > 0 && url.indexOf("iptv") >=0) {

                    return "http://222.221.25.243:6166" + url;

                } else {
                 
                    return url;

                }*/


            },
            getTomorrowTemperature(tomorrowTemprature) {
                return tomorrowTemprature.LowTemperature + "℃ - " + tomorrowTemprature.HighTemperature + "℃";
            },
            getThirdDayTemp(thirdDayTemprature) {
                return thirdDayTemprature.LowTemperature + "℃ - " + thirdDayTemprature.HighTemperature + "℃";
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
                            "LangCode": DataSource.currLangCode,
                            "EpgGroupID": 1,
                            "Token": DataSource.Token,
                        }
                    }
                };

                Http({
                    type: 'POST',
                    url: DataSource.relativePath + 'service/epgservice/index.php?MessageType=GetWeatherInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                const tempPicList = [];
                                for (var i = 0; i < _msgBody.CityList.City.length; i++) {
                                    tempPicList.push(_msgBody.CityList.City[i].WeatherList.Weather[0])
                                }
                                // console.log(tempPicList);
                                ImageLoader({
                                    data: tempPicList,
                                    onFinish: function() {
                                        _this.showLoading = false;
                                        _this.showLayout = true;
                                        _this.WeatherCityList = _msgBody.CityList.City;

                                        console.log("MMM");
                                        console.log(_this.WeatherCityList);
                                        console.log("EEE");
                                        _this.changeCity(_this.WeatherCityList[0]);
                                        _this.$nextTick(() => {
                                            var weatherUl = document.getElementById("weatherListUl");
                                            weatherUl.children[0].children[0].focus();
                                        });
                                    },
                                    onProgress: function(precent) {
                                        console.log("加载中" + precent);
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
            var hint = DataSource.currLangCode;
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
            //this.$dispatch("pauseVideo");
        },
}
</script>
