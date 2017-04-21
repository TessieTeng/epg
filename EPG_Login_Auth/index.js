// import Promise from 'bluebird';
import Vue from 'vue';
import VueRouter from 'vue-router';
import './assets/lib/sessionStorage';

import App from "Vues/App";

Vue.use(VueRouter);
var router = new VueRouter();
router.map({
    "/app": {
        component: App,
    },
});

router.redirect({ '/': '/app' });
router.start(App, '#app');
