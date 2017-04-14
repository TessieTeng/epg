import 'babel-polyfill';

import Vue from 'vue';
import Resource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuex from 'vuex';


// import App from 'HomePage/Video';

import App from "App";
import Router from "HomePage/Router";
import HApp from "HomePage/HomePageApp";
import HContent from "HomePage/HomepageContent";
import Test from 'HomePage/Test';
import CApp from 'Category/CategoryApp';
import LList from 'Category/LeftList';
import WorldTime from 'Category/WorldTime.vue';
import Weather from 'Category/Weather';
import Scenery from 'Category/Scenery';
import Food from 'Category/Food';


Vue.use(Resource);
Vue.use(VueRouter);
Vue.use(Vuex);

var router = new VueRouter();
router.map({
    "/app": {
        component: App,
    },
    "/router": {
        component: Router,
    },
    '/happ': {
        component: HApp,
    },
    '/hcontent': {
        component: HContent,
    },
    '/test': {
        component: Test,
    },
    '/capp': {
        component: CApp,
        subRoutes: {
            '/cwordtime': {
                component: WorldTime,
            },
            '/cweather': {
                component: Weather,
            },
            '/cscenery':{
                component:Scenery,
            },
            '/cfood':{
                component:Food,
            },
        }
    },
    '/llist': {
        component: LList,
    },
});

router.redirect({ '/': '/happ' });
router.start(App, '#app');

// router.redirect({ '/': '/test' });
// router.start(Router, '#app');
