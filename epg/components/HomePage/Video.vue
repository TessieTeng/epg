<style>
html, body {
  background-color: rgba(0,0,0,0);
  margin-left: 100px;
}
html {
    font-size: 100px;
}

#videoPlay {
  position: relative;
    width: 10.2rem;
    height: 7.5rem;
    background-color: transparent;
    z-index: 99999999;
    /*margin-top: 0.5rem;*/
}

a {
    display: inline-block;
}

a:focus {
    background-color: pink;
}

#control {
    width: 10.2rem;
    height: 1rem;
    float: left;
    background-color: transparent;
    font-size: 0.5rem;
    text-align: center;
}
</style>
<template>
    <div>

            <div id="control">
              <a href="#" @click="playControl()">播放/暂停
              </a>
              </div>


        <div>

                <!-- <video id="videoPlay"  src="/assets/video/demo.mp4" controls="controls"> -->
                     <!-- <video id="videoPlay"  src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" controls="controls"> -->

                     <video id="videoPlay"  src="http://uwifi.oss-cn-shenzhen.aliyuncs.com/video/1.mp4" controls="controls">


                      <!-- <a href="#">
                       </a> -->
                    your browser does not support the video tag
                </video>

        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {};
        },
        components: {},
        methods: {
            playControl() {
               // var control = document.getElementById("control");
               // control.style.backgroundColor= "red";


                var myVideo = document.getElementsByTagName('video')[0];
                if (myVideo.paused) {
                    myVideo.play();
                    setTimeout(() => {
                      myVideo.webkitExitFullScreen();
                    }, 1000)
                    console.log("播放");
                } else {
                    myVideo.pause()
                    console.log("暂停");
                }
            }
        },
        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            console.log(width);
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
