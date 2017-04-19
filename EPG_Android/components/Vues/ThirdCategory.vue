<style>
</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="menuTab">
                <div class="advertisement">
                    <img class="advertisement" v-bind:src='adPic[0].AdUrl'>
                </div>
                <ul id="thirdTabItem">
                    <li v-for="item in categoryList">
                        <a href="javascript:;" id={{item.ObjectID}} @click="excuteAction(item)" @focus="isFoucs=true" @blurs="isFoucs=false">
                            <div class="imgFrame">
                                <img v-bind:src='item.PictureList.Picture[0].PictureUrl'>
                                <img v-bind:src='item.PictureList.Picture[1].PictureUrl'>
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
import {
    updateLastPicList
} from '../../vuex/actions.js';
import Http from '../../assets/lib/Http';
export default {
    data() {
            return {
                adPic: [],
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
            excuteAction(item) {
                var _this = this;
                switch (item.RelatedAction) {
                    case "weather_list":
                        this.$router.go("/weatherforecast");
                        break;
                    case "global_time":
                        this.$router.go("/worldtime");
                        break;
                    case "hotel_mall":
                        this.$router.go("/singleimg");
                        break;
                    case "recomm_list":
                        this.$router.go("/recommendlist");
                        break;
                    case 'show_category':
                    case '':
                        switch (item.ObjectType) {
                            case 1:
                                this.$router.go({
                                    name: "forthcategory",
                                    params: {
                                        id: item.ObjectID
                                    }
                                });
                                break;
                            case 6:
                                var _this = this;
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
                                ImageLoader({
                                    data: temArr,
                                    onFinish: function() {
                                        _this.updateLastPicList(temArr);
                                        _this.$router.go("/detail");
                                    },
                                    onProgress: function(precent) {
                                        console.log("加载中" + precent);
                                    }
                                });
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
                            "EpgGroupID": 1,
                            "UserID": 1001,
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
                                _this.$nextTick(() => {
                                    if (!_this.secondClassTab == 0) {
                                        document.getElementById("_" + _this.secondClassTab).focus();
                                    } else {
                                        var categary = document.getElementById("thirdTabItem");
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

        },


        vuex: {
            actions: {
                updateLastPicList,
            }
        },

        ready() {
            this.getRootCategoryData(this.$route.params.id);
           // this.$dispatch("resmeVideo");
        }
}
</script>
