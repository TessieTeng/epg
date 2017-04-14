<style>

</style>
<template>
<div  @click="gotoApp()">

<h1>Hello App!</h1>
  <p>
    <!-- 使用指令 v-link 进行导航。 -->
    <a v-link="{ path: '/foo' }">Go to Foo</a>
    <!-- <a v-link="{ path: '/bar' }">Go to Bar</a> -->
  </p>
</div>


</template>
<script >
export default{
  data(){
    return{

    };



  },
   destroyed:function () {
      console.log("test结束了destroyed了");
    },
  methods:{
    gotoApp(){
      console.log("ppppppppppppp");
      console.log(this.$router);
      this.$router.go("/happ");
    }
  }

}


</script>
