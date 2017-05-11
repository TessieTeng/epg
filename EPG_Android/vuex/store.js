import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    firstVideoPlay: true,
    firstClassTab: 0,
    secondClassTab: 0,
    classTabList: [],
    lastPicList: [],
    isMainLayout: true,
    scaleImgUrl: null,
    lastStore: 0
}

const mutations = {
    updateFirstVideoPlay(state, newVal) {
        state.firstVideoPlay = newVal;
    },
    updateFirstClassTab(state, newVal) {
        state.firstClassTab = newVal;
    },
    updateSecondClassTab(state, newVal) {
        state.secondClassTab = newVal;
    },
    updateClassTabList(state, newVal) {
        state.classTabList = newVal;
    },
    updateLastPicList(state, newVal) {
        state.lastPicList = newVal;
    },
    updateIsMainLayout(state, newVal) {
        state.isMainLayout = newVal;
    },
    updateScaleImgUrl(state, newVal) {
        state.scaleImgUrl = newVal;
    },
    updateLastStore(state, newVal) {
        state.lastStore = newVal;
    },
}

export default new Vuex.Store({
    state,
    mutations
})
