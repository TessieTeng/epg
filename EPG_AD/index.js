// import Promise from 'bluebird';
import Vue from 'vue';
import Resource from 'vue-resource';
import VueRouter from 'vue-router';

import App from "App";
import Advertisement from "Vues/Advertisement";


Vue.use(Resource);
Vue.use(VueRouter);

var router = new VueRouter();
router.map({
    "/app": {
        component: App,
    },
    "/advertisement": {
        component: Advertisement,
    },
});

router.redirect({ '/': '/advertisement' });
router.start(App, '#app');
