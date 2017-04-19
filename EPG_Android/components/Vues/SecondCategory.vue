<style>
</style>
<template>
    <div>
        <div class="rootDiv">
        <div class ="bgimg"></div>
            <div class="menuTab">
                <div class="advertisement">
                    <img class="advertisement" v-bind:src='adPic[0].AdUrl'>
                </div>
                <ul id="secondTabItem">
                    <li v-for="item in categoryList">
                        <a href="javascript:;" id='_{{item.ObjectID}}' @click="excuteAction(item)" @focus="isFoucs=true" @blurs="isFoucs=false">
                            <div class="imgFrame">
                                <img v-bind:src='getNormalIcon(item)'>
                                <img v-bind:src='getFocusIcon(item)'>
                                <div class="breatheFrame">
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <loading v-if="showLoading"></loading> -->
    </div>
</template>
<script>
import store from "../../vuex/store.js";
import Loading from '../Tools/Loading.vue';
import ImageLoader from '../../assets/lib/ImageLoader.js';
import Http from '../../assets/lib/Http';
import {
    updateLastPicList,
    updateSecondClassTab,
    updateIsMainLayout
} from '../../vuex/actions.js';
import {
    getSecondClassTab,
} from '../../vuex/getters.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                adPic: [{
                    AdUrl: '../../assets/images/ad_s.jpg'
                }],
                showLoading: true,
                categoryList: [{
                    PictureList: {
                        Picture: [{
                            PictureUrl: '',
                        }]
                    }
                }],
                childObj: {},
            };
        },
        methods: {
            //取正常图片
            getNormalIcon(item) {
                var tempPicList = item.PictureList.Picture;
                for (var i = 0; i < tempPicList.length; i++) {
                    if (tempPicList[i].PictureType == 13) {
                        console.log(tempPicList[i].PictureUrl);
                        return tempPicList[i].PictureUrl;
                    }
                }
            },
            //取高亮图片
            getFocusIcon(item) {
                var tempPicList = item.PictureList.Picture;
                for (var i = 0; i < tempPicList.length; i++) {
                    if (tempPicList[i].PictureType == 14) {
                        console.log(tempPicList[i].PictureUrl);
                        return tempPicList[i].PictureUrl;
                    }
                }

            },
            excuteAction(item) {
                var _this = this;
                console.log(item);
                console.log(item.ObjectID);
                console.log(item.RelatedAction);
                this.updateSecondClassTab(item.ObjectID);

                switch (item.RelatedAction) {
                    case "weather_list":
                        this.$router.go("/weatherforecast");
                        break;
                    case "global_time":
                        this.$router.go("/worldtime");
                        break;
                    case "hotel_mall":
                        this.$router.go({
                            name: "singleimg",
                            params: {
                                id: item.ObjectID
                            }
                        });
                        break;
                    case "recomm_list":
                        this.$router.go({
                            name: "recommendlist",
                            params: {
                                id: item.ObjectID
                            }
                        });

                        break;
                    case 'show_category':
                    case '':
                        switch (item.ObjectType) {
                            case 1:
                                this.$router.go({
                                    name: "thirdcategory",
                                    params: {
                                        id: item.ObjectID
                                    }
                                });
                                break;
                            case 6:
                                const temArr = [];
                                for (var i = 0; i < item.PictureList.Picture.length; i++) {
                                    if (item.PictureList.Picture[i].PictureType == 15) {
                                        temArr.push(item.PictureList.Picture[i]);
                                    }
                                }
                                if (temArr.length == 0) {
                                    console.log("暂时没有详情数据");
                                    return;
                                }

                                this.updateLastPicList(temArr);
                                this.$router.go("/detail");
                                // ImageLoader({ // data: temArr, // onFinish: function() { // _this.updateLastPicList(temArr); // _this.$router.go("/detail"); // }, // onProgress: function(precent) { // console.log("加载中" + precent); // } // });
                                break;
                        }
                        break;
                    default:
                        break;
                }


            },
            getRootCategoryData(categoryId) {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }

                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetObjectInfoReq",
                        "MessageBody": {
                            "ObjectID": categoryId,
                            "ObjectType": 1,
                            "ChildrenLevel": 1,
                            "LangCode": window.currLangCode,
                            "EpgGroupID": window.EpgGroupID,
                            "UserID": window.UserID,
                            "Token": window.Token,
                        }
                    }
                };
                Http({
                    type: 'POST',
                    url: window.relativePath + 'service/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.adPic = _msgBody.AdList.Ad;
                                _this.categoryList = _msgBody.ChildrenObjectList.Object;
                                _this.childObj = _data.Message.MessageBody;

                                console.log(_this.childObj);
                                console.log("KKK");
                                console.log(_this.categoryList);
                                _this.$nextTick(() => {
                                    if (!_this.secondClassTab == 0) {
                                        document.getElementById("_" + _this.secondClassTab).focus();
                                    } else {
                                        var categary = document.getElementById("secondTabItem");
                                        categary.children[0].children[0].focus();
                                    }
                                })

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
                document.querySelector('#secondTabItem').addEventListener('keypress', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        history.back();
                    }
                });
            },


        },

        vuex: {
            actions: {
                updateLastPicList,
                updateSecondClassTab,
                updateIsMainLayout
            },
            getters: {
                secondClassTab: getSecondClassTab
            },

        },
        components: {
            Loading,
        },


        ready() {
            this.listenBackKey();
            this.updateIsMainLayout(false);
            this.getRootCategoryData(this.$route.params.id);
            //this.$dispatch("resumeVideo");

            this.tempList == [];
        }

}
</script>
