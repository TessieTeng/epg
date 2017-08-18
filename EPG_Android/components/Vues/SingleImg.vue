<style scoped>
.singleRootDiv {
    width: 1280px;
    height: 720px;
    background-color: black;
    line-height: 720px;
    text-align: center;
}

.qrcode {
    width: 1133.34px;
    height: 533.34px;
    margin-top: 93.34px;
    z-index: 50;
    position: relative;
}
</style>
<template>
    <div>
        <div class="singleRootDiv" id="singleRootDiv">
            <img class="qrcode" v-bind:src='qrCode'>
        </div>
        <!-- <loading v-if="showLoading"></loading> -->
    </div>
</template>
<script>
import store from '../../vuex/store';
import Loading from '../Tools/Loading.vue';
import Http from '../../assets/lib/Http';
import {
    updateIsMainLayout,
    updateIsVideoPlay,
} from '../../vuex/actions.js';
import {
    getIsVideoPlay,
} from '../../vuex/getters.js';
export default {
    data() {
            return {
                isRequestStatus: false,
                qrCode: null,
                showLoading: true,
            };

        },
        methods: {
            getQrCode(categoryid) {
                var _this = this;
                if (this.isRequestStatus) {
                    return;
                }

                this.isRequestStatus = true;
                const tmpObj = {
                    "Message": {
                        "MessageType": "GetObjectInfoReq",
                        "MessageBody": {
                            "ObjectID": categoryid,
                            "ObjectType": 1,
                            "ChildrenLevel": 1,
                            "LangCode": window.sessionStorage ? sessionStorage.getItem("currLangCode") : Cookie.read("currLangCode"),
                            "EpgGroupID": 1,
                            "UserID": "888888",
                            "Token": window.sessionStorage ? sessionStorage.getItem("Token") : Cookie.read("Token"),
                        }
                    }
                };
                Http({
                    type: 'POST',
                    url: sessionStorage.getItem("relativePath") + '/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        if (data.status === 200) {
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                _this.qrCode = _msgBody.ChildrenObjectList.Object[0].PictureList.Picture[0].PictureUrl;
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
                updateIsMainLayout,
                updateIsVideoPlay,
            },
            // getters: {
            //     isVideoPlay: getIsVideoPlay,
            // },
        },

        ready() {
            this.isVideoPlay = getIsVideoPlay(store.state);
            this.updateIsMainLayout(false);
            this.getQrCode(this.$route.params.id);
            if(this.isVideoPlay){
                this.$dispatch("stopVideo");
                this.updateIsVideoPlay(false);
            }
        }

}
</script>
