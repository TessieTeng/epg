<!-- <style>
</style>
<template>
    <div class="rootDiv">
        <div class="menuTab">
            <ul>
                <li v-for="item in categoryList">
                    <a href="javascript:;" id={{item.ObjectID}} @click="excuteAction(item.ObjectID)">
                        <div class="imgFrame">
                            <div class="breatheFrame">
                            </div>
                            <img v-bind:src='item.PictureList.Picture[0].PictureUrl'>
                            <img v-bind:src='item.PictureList.Picture[1].PictureUrl'>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    updateLevelTag
} from '../../vuex/actions.js'
export default {
    data() {
            return {
                categoryList: [],
                childObj: {},
            };
        },

        methods: {
            excuteAction(newId) {
                this.getRootCategoryData(newId, true);
            },
            getRootCategoryData(categoryId, isClick) {
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
                            "LangCode": window.localStorage ? localStorage.getItem("currLangCode") : Cookie.read("currLangCode"),
                            "EpgGroupID": 3,
                            "UserID": DataSource.UserID,
                        }
                    }
                };
                this.$http.post(`/epgservice/index.php?MessageType=GetObjectInfoReq`, JSON.stringify(tmpObj), {
                        headers: {
                            'Cache-Control': 'no-cache'

                        },
                    })
                    .then((data) => {
                        const _data = JSON.parse(data.body);
                        const _msgBody = _data.Message.MessageBody;
                        if (_msgBody.ResultCode == 200) {
                            this.categoryList = _msgBody.ChildrenObjectList.Object;
                            this.childObj = _data.Message.MessageBody;
                            if (isClick == true && this.childObj.ChildrenObjectList.Object.length === 0) {
                                // alert("3点击的请求");
                                this.$router.go({
                                    name: "detail",
                                    params: {
                                        id: categoryId
                                    }
                                });
                            }
                        } else {
                            console.log("第五级目录请求失败");
                        }

                        this.isRequestStatus = false;
                        this.showLoading = false;
                    })
                    .catch((e) => {
                        this.isRequestStatus = false;
                    });

            },

        },


        vuex: {
            actions: {
                updateLevelTagValue: updateLevelTag,
            }

        },

        ready() {
            this.updateLevelTagValue(4);
            this.getRootCategoryData(this.$route.params.id, false);
            this.$dispatch("resumeVideo");
        }
}
</script>
 -->
