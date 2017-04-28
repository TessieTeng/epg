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
    updateIsMainLayout,
} from '../../vuex/actions.js';

import {
    getScaleImgUrl
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
            listenBackKey() {
                window.onkeydown = function(event) {
                    var e = event || window.event;
                    if (e.keyCode == 8) {
                        history.back();
                    }
                };
            },

        },

        vuex: {
            actions: {
                updateIsMainLayout,

            },
            getters: {
                getScaleImgUrl,
            }
        },

        ready() {
            this.listenBackKey();
            this.updateIsMainLayout(false);
            this.qrCode = this.getScaleImgUrl;
           //this.$dispatch("pauseVideo");
        }

}
</script>
