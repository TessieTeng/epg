<style>
</style>
<template>
    <!-- 路由外链 -->
    <div>
    <router-view></router-view>
    <div>
</template>
<script>
// import { updateHometab } from "../vuex/actions.js";
// import { getHometab } from '../vuex/getters.js';
import store from '../vuex/store.js';
export default{
  store:store
}
</script>
