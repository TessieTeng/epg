<style>
.advertisement {
    width: 19.2rem;
    height: 10.8rem;
    text-align: center;
    background-color: transparent;
}

.one {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div class="advertisement" @click="gotoMainApp()">
        <swiper-a-d :options='options' :ad='ad' class='one'></swiper-a-d>
    </div>
</template>
<script>
import SwiperAD from './SwiperAD.vue';
import Http from './../../assets/lib/Http.js';
export default {
    data() {
            const _this = this;
            return {
                isEnd: 0,
                showLoading: true,
                isRequestStatus: false,
                ad: [],
                options: {
                    autoplay: 2000,
                    loop: false,
                    keyboardControl: false,
                    onSlideChangeEnd(swiper) {
                        console.log(swiper.activeIndex);
                        if (swiper.isEnd) {
                            setTimeout(function() {
                                if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
                                    location.replace("../../epggroup_welcomes/welcome_default/welcome.html");
                                } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
                                    location.replace("../../epggroup_welcomes/welcome_test/welcome.html");
                                }
                            }, 2000);
                        }
                    }
                }
            };
        },
        methods: {
            gotoMainApp() {
                this.$router.go('/firstcategory');
            },
            //监听返回键
            listenBackKey() {
                window.document.onkeypress = function(keyEvent) {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    console.log(keyvalue);
                    if (keyvalue == 8) {
                        history.go(-1);
                    }
                }
            },

            getAdData() {
                if (this.isRequestStatus) {
                    return;
                }
                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetStartupAdReq",
                        "MessageBody": {
                            "LangCode": "chi",
                            // "LangCode": window.sessionStorage ? sessionStorage.getItem("currLangCode") : Cookie.read("currLangCode"),
                            "EpgGroupID": window.sessionStorage ? sessionStorage.getItem("EpgGroupID") : Cookie.read("EpgGroupID"),
                            "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
                        }
                    }
                };
                const _this = this;
                console.log("token++" + tmpObj.Message.MessageBody.Token);
                console.log("EpgGroupID++" + tmpObj.Message.MessageBody.EpgGroupID);
                console.log("relativePath++" + sessionStorage.getItem("relativePath"));

                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetStartupAdReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            console.log(_msgBody);
                            console.log("AAA");
                            if (_msgBody.ResultCode == 200) {
                                _this.ad = _msgBody.AdList.Ad;
                                if (_this.ad.length == 0) {
                                    if (sessionStorage.getItem("EPGDirectory") == "epggroup_default") {
                                        location.replace("../../epggroup_welcomes/welcome_default/welcome.html");
                                    } else if (sessionStorage.getItem("EPGDirectory") == "epggroup_test") {
                                        location.replace("../../epggroup_welcomes/welcome_test/welcome.html");
                                    }
                                }
                            } else {
                                console.log("请求数据失败");
                                alert("数据获取失败--->" + MessageBody.ResultDesc);

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

        },
        components: {
            SwiperAD,
        },


        ready() {
            console.log("广告");
            this.listenBackKey();
            this.getAdData();
        }
}
</script>
