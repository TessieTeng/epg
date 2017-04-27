<style scoped>
.singleRootDiv {
    width: 19.2rem;
    height: 10.8rem;
    background-color: black;
    line-height: 10.8rem;
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
                document.querySelector('#singleRootDiv').addEventListener('keypress', (keyEvent) => {
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
