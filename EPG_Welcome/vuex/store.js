import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)


const state = {
    welcomeObj: null,

}

const mutations = {
    updateWelcomeObj(state, newVal) {
        state.welcomeObj = newVal;
    },
}

export default new Vuex.Store({
    state,
    mutations
})
