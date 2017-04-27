<style scoped>
.singleRootDiv {
    width: 19.2rem;
    height: 10.8rem;
    line-height: 10.8rem;
    background-color: black;
    text-align: center;
}

.qrcode {
    width: 17rem;
    height: 8rem;
    margin-top: 1.4rem;
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
import Loading from '../Tools/Loading.vue';
import Http from '../../assets/lib/Http';
import {
    updateIsMainLayout
} from '../../vuex/actions.js';

export default {
    data() {
            return {
                isRequestStatus: false,
                qrCode: null,
                showLoading: true,
            };

        },
        methods: {
            listenBackKey() {
                document.querySelector('#singleRootDiv').addEventListener('keypress', (keyEvent) => {
                    keyEvent = keyEvent ? keyEvent : window.event;
                    var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                    if (keyvalue == 8) {
                        history.back();
                    }
                });
            },
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
                    url: sessionStorage.getItem("relativePath") + 'service/epgservice/index.php?MessageType=GetObjectInfoReq',
                    data: JSON.stringify(tmpObj),
                    complete: function(data) {
                        console.log(data);
                        if (data.status === 200) {
                            console.log("请求成功");
                            const _data = JSON.parse(data.response);
                            const _msgBody = _data.Message.MessageBody;
                            if (_msgBody.ResultCode == 200) {
                                console.log(_msgBody);
                                _this.qrCode = _msgBody.ChildrenObjectList.Object[0].PictureList.Picture[0].PictureUrl;
                                console.log(_this.qrCode);
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
                updateIsMainLayout,
            }
        },

        ready() {
            this.listenBackKey();
          //  this.$dispatch("pauseVideo");
            this.updateIsMainLayout(false);
            this.getQrCode(this.$route.params.id);
        }

}
</script>
