<style scoped>
 .vol-wrapper {
     position: fixed;
     left: 240px;
     bottom: 50px;
     /*margin: 0 auto;*/
     width: 800px;
     height: 50px;
     line-height: 50px;
     background-color: #B5EEEB;
     border-radius: 5px;
     padding: 5px;
     z-index: 1000000;
 }

 .vol-bar {
     position: relative;
     margin: 0 auto;
     width: 700px;
     height: 5px;
     margin-top: 20px;
     background-color: #fff;
 }

 .vol-line {
     position: absolute;
     left: 0px;
     top: 0px;
     width: 0px;
     height: 5px;
     background-color: #F3F213;
 }

 .vol-value {
     position: absolute;
     right: 20px;
     top: 0;
     height: 100%;
 }

</style>
<template>
    <div class="vol-wrapper" v-show="isVolShow">
        <div class="vol-bar">
            <div class="vol-line" :style="{'width':volBarWidth + 'px'}"></div>
            <div class="vol-ball"></div>
        </div>
        <div class="vol-value">{{currVolume}}</div>
    </div>
</template>
<script>

 export default {
     data() {
         return {
             currVolume: 0,
             volBarWidth: 0,
             volStep: 5,
             volTimer: null,
             isVolShow: false,
             isMute: 0,
         };
     },

     props: ['mp'],

     methods: {

         showVolumeBar() {
             this.isVolShow = true;
             clearTimeout(this.volTimer);
             this.volTimer = setTimeout(() => {
                 this.isVolShow = false;
             }, 4000);
         },

         volume() {
             var args = arguments;
             var vol = this.mp.getVolume();

             this.showVolumeBar();

             if (args.length <= 0) {
                 return vol;
             } else if (args[0] > 0) { // volume +
                 vol += this.volStep;
             } else if (args[0] < 0) { // volume -
                 vol -= this.volStep;
             }

             // 设置每次加减，按5递增递减
             if (vol % 10 < this.volStep) {
                 vol = vol - vol % 10;
             } else if ( vol % 10 > this.volStep ) {
                 vol = vol - vol % 10 + this.volStep;
             }

             vol = vol > 100 ? 100
                 : vol < 0 ? 0
                 : vol;

             this.currVolume = vol;
             this.isMute = 0;
             this.mp.setVolume(vol);
         },

         volumeUp() {
             this.volume(5);
         },

         volumeDown() {
             this.volume(-5);
         },

         setMute(flag) {
             this.isMute = !this.isMute;
             this.mp.setMuteFlag(this.isMute);
         },
     },

     watch: {
         "currVolume": function (newV, oldV) {
             const vbar = document.querySelector('.vol-bar');
             const vbarW = vbar.offsetWidth;
             let w = this.currVolume / 100 * vbarW;
             let stepW = this.volStep / 100 * vbarW;
             let deltaW = 0;

             if (w < stepW) {
                 w = 0;
             } else if (vbarW - w < stepW) {
                 w = vbarW
             }
             this.debug('vol:' + newV);
             this.volBarWidth = w;
         },
     },

     events: {
         evolume(vol) {
             if (vol < 0) { this.volumeDown(); }
             else if (vol === 0) { this.setMute(1); }
             else { this.volumeUp(); }
         },
     },
 }
</script>
