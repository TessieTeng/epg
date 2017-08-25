<style>
 #sc-debug {
     position: fixed;
     right: 0;
     top: 0;
     width: 40%;
     height: 100%;
     background-color: black;
     color: white;
     z-index: 10000000;
     word-wrap: break-word;
     opacity: 0.6;
     overflow: scroll;
 }
</style>
<template>
    <div>
        <div class="rootDiv">
            <div class="bgimg" :style='{"background-image": "url(" + bgimg +  ")"}' v-if='!hasVideo'></div>
            <div class="menuTab">
                <div class="advertisement">
                    <img class="advertisement" v-bind:src='adPic'>
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
        <div id="sc-debug" v-if="isDebug"></div>
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
     updateIsMainLayout,
     updateIsVideoPlay,
 } from '../../vuex/actions.js';
 import {
     getSecondClassTab,
     getIsVideoPlay,
 } from '../../vuex/getters.js';
 export default {
     data() {
         return {
             isRequestStatus: false,
             hasVideo: false,
             bgimg: '',
             adPic: '',
             showLoading: true,
             categoryList: [{
                 PictureList: {
                     Picture: [{
                         PictureUrl: '',
                     }]
                 }
             }],
             childObj: {},
             isDebug: false,
             backObjId: -1
         };
     },
     methods: {
         shanxiSecondPlay(contentID, routeInfo) {
             this.$nextTick(() => {
                 let plat = sessionStorage.getItem('from');
                 let urls = '';
                 let hwOrigin = sessionStorage.getItem('huaweiMediaUrlOrigin');
                 let zteOrigin = sessionStorage.getItem('zhongxingMediaUrlOrigin');
                 if (plat.toLowerCase() === "huawei") {
                     urls = (hwOrigin
                           + '/EPG/MediaService/SmallScreen.jsp?ContentID='
                           + contentID + '&GetCntFlag=1');
                 } else {
                     urls = (zteOrigin
                           + '/MediaService/SmallScreen?ContentID='
                           + contentID + '&GetCntFlag=1');
                 }
                 console.log(urls);
                 this.$dispatch('setMediaUrl', urls);
                 this.$dispatch('efromsecond', {
                     contentID,
                     routeInfo
                 });
             });
         },

         debug(obj) {

             // config.js 中配置
             //  && isDebug !== 1
             if (!this.isDebug) { return; }

             const debug = document.getElementById('sc-debug');

             let str = '';

             if (typeof(obj) === 'object') {
                 str = JSON.stringify(obj);
             } else {
                 str = '' + obj;
             }

             debug.innerHTML += '[' + str + ']';
         },

         //取正常图片
         getNormalIcon(item) {
             var tempPicList = item.PictureList.Picture;
             for (var i = 0; i < tempPicList.length; i++) {
                 if (tempPicList[i].PictureType == 13) {
                     return tempPicList[i].PictureUrl;
                 }
             }
         },
         //取高亮图片
         getFocusIcon(item) {
             var tempPicList = item.PictureList.Picture;
             for (var i = 0; i < tempPicList.length; i++) {
                 if (tempPicList[i].PictureType == 14) {
                     return tempPicList[i].PictureUrl;
                 }
             }

         },

         excuteAction(item) {
             var _this = this;
             this.updateSecondClassTab(item.ObjectID);

             this.debug('item:' + JSON.stringify(item));
             /* this.isDebug = false;*/
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
                 case "vod_play":
                     let _this = this;
                     this.updateIsVideoPlay(false);
                     this.isVideoPlay = false;
                     sessionStorage.getItem('isVideoPlay', '0');
                     this.$dispatch('stopVideo');
                     this.debug('url:' + item.RelatedInfo);
                     console.log(item.RelatedInfo);
                     let routeInfo = {
                         path: '/mplayer',
                         params: {
                             id: item.ObjectID,
                         },
                         query: {
                             playUrl: item.RelatedInfo,
                             backUrl: '/secondcategory',
                             objId: this.backObjId,
                             isEnablePlayControl: 'disable',
                         },
                     };
                     if (sessionStorage.getItem('province') === '陕西') {
                         this.shanxiSecondPlay(item.RelatedInfo, routeInfo);
                         return false;
                     }
                     this.$router.replace(routeInfo);
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
                         "LangCode": sessionStorage.getItem("currLangCode"),
                         "EpgGroupID": sessionStorage.getItem("EpgGroupID"),
                         "UserID": sessionStorage.getItem("UserID"),
                         "Token": sessionStorage.getItem("Token"),
                     }
                 }
             };
             Http({
                 type: 'POST',
                 url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetObjectInfoReq',
                 data: JSON.stringify(tmpObj),
                 complete: function(data) {
                     if (data.status === 200) {
                         console.log("请求成功");
                         const _data = JSON.parse(data.response);
                         const _msgBody = _data.Message.MessageBody;
                         if (_msgBody.ResultCode == 200) {
                             _this.adPic = _msgBody.AdList.Ad;

                             const tmpFullScreenImgs = _this.adPic.filter(item => {
                                 return item.AdPosNo === "pos00";
                             });
                             const tmpLeftBottomImgs = _this.adPic.filter(item => {
                                 return item.AdPosNo === "pos03";
                             });
                             // 暂时只取了第一张
                             if (tmpFullScreenImgs.length > 0) {
                                 _this.bgimg = tmpFullScreenImgs[0].AdUrl;
                             }
                             if (tmpLeftBottomImgs.length > 0) {
                                 _this.adPic = tmpLeftBottomImgs[0].AdUrl;
                             }

                             _this.categoryList = _msgBody.ChildrenObjectList.Object;
                             _this.childObj = _data.Message.MessageBody;

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
     },
     store: store,

     vuex: {
         actions: {
             updateLastPicList,
             updateSecondClassTab,
             updateIsMainLayout,
             updateIsVideoPlay,
         },
         // getters: {
         //     secondClassTab: getSecondClassTab,
         //     isVideoPlay: getIsVideoPlay,

         // },

     },
     components: {
         Loading,
     },

     ready() {

         this.$nextTick(() => {
             this.secondClassTab = getSecondClassTab(store.state);
             this.isVideoPlay = getIsVideoPlay(store.state);

             this.isDebug = sessionStorage.getItem('EPG_DEBUG_SWITCHER') === 'open';
             this.updateIsMainLayout(false);
             this.getRootCategoryData(this.$route.params.id);
             var bgMediaUrl=sessionStorage.getItem('bg_media_url');
             this.debug('location:' + window.location.href);
             this.debug('id:' + this.$route.params.id);
             this.backObjId = this.$route.params.id;
             console.log('---------------------------',
                         bgMediaUrl, this.isVideoPlay,
                         '---------------------------'
             );
             // 判断是否有视频
             if (!!bgMediaUrl && bgMediaUrl!=='0' && bgMediaUrl.indexOf("rtsp")==-1) {
                 this.hasVideo = true;
                 if (sessionStorage.getItem('province') === '陕西') {
                     this.$dispatch('eshanxiplay');
                     this.updateIsVideoPlay(true);
                 } else {
                     if (!this.isVideoPlay) {
                         this.$dispatch("replay");
                         this.updateIsVideoPlay(true);
                     }
                 }
             }

             this.tempList == [];
         });
     }

 }
</script>
