// import Promise from 'bluebird';
import Vue from 'vue';
import Resource from 'vue-resource';
import VueRouter from 'vue-router';

import App from "Vues/App";

Vue.use(Resource);
Vue.use(VueRouter);
var router = new VueRouter();
router.map({
    "/app": {
        component: App,
    },
});

router.redirect({ '/': '/app' });
router.start(App, '#app');
