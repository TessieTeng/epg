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
    </div>
</template>
<script>
import Loading from '../Tools/Loading.vue';
import store from '../../vuex/store';
import Http from '../../assets/lib/Http';
import {
    updateIsMainLayout,
    updateIsVideoPlay,
} from '../../vuex/actions.js';

import {
    getScaleImgUrl,
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

        vuex: {
            actions: {
                updateIsMainLayout,
                updateIsVideoPlay,

            },
            // getters: {
            //     getScaleImgUrl,
            //     isVideoPlay: getIsVideoPlay,
            // }
        },

        ready() {
            this.getScaleImgUrl = getScaleImgUrl(store.state);
            this.updateIsMainLayout(false);
            this.qrCode = this.getScaleImgUrl;

        }

}
</script>
