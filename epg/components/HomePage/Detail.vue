<style>
html {
    font-size: 100px;
}

#detailMain {
    width: 19.2rem;
    height: 10.8rem;
    background: url("/assets/images/background.png");
    background-size: 19.2rem 10.8rem;
}

#detailMainContent {
    display: inline-block;
}

#detailTop {
    width: 19.2rem;
    height: 1.5rem;
}

#detailMiddle {
    width: 19.2rem;
    height: 7.5rem;
}

#detailBottom {
    position: fixed;
    bottom: 0;
    width: 19.2rem;
    /*background-color: green;*/
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
}


#detailMiddleContent {
    width: 17.2rem;
    height: 7.5rem;
    font-size: 0;
    margin: 0 auto;
}

.detailLeftTopArea {
    width: 11.57rem;
    height: 6.3rem;
}

.detailLeftBottomArea {
    width: 11.57rem;
    height: 1.1rem;
}

#detailLeftBottom {
    margin-top: 0.1rem;
}

#detailLeft {
    font-size: 0;
    float: left;
}

#detailRight {
    width: 5.33rem;
    height: 7.5rem;
    float: left;
    font-size: 0;
    margin-left: 0.3rem;
}

#detailRightTop {
    width: 5.33rem;
    height: 6.3rem;
}

#detailRightBottom {
    width: 5.33rem;
    height: 0.8rem;
    font-size: 0;
    margin-top: 0.4rem;
}

#detailTitle {
    color: white;
    font-size: 0.3rem;
}

#detailScore {
    font-size: 0.28rem;
    color: #C9A324;
    margin-left: 0.1rem;
}

#detailInfo {
    display: block;
    font-size: 0.28rem;
    color: #488DDB;
    margin-top: 0.2rem;
}

#detailDirector {
    font-size: 0.28rem;
    color: #488DDB;
}

#detailIntroduction {
    font-size: 0.28rem;
    color: white;
    margin-top: 0.1rem;
    display: block;
}

.detailPayBtn {
    width: 2.55rem;
    height: 0.8rem;
}

#detailPayForPlay {
    float: left;
}

#detailBack {
    float: left;
    margin-left: 0.23rem;
}

a.aDetailBtn {
    display: inline-block;
    font-size: 0;
}

a.aDetailBtn:focus {
    outline: none;
    outline-style: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a.aDetailBtn:focus img {
    display: inline-block;
    z-index: 100;
    -webkit-border-radius: 0.1rem;
    box-shadow: 0 0 0.2rem 0 #609EDE, inset 0px 0px 0.02rem 0.05rem rgb(255, 255, 255);
    -webkit-transform: scale(1.1);
}

#detailBottomContent{
  width: 17.2rem;
  margin: auto;
  color: white;
  text-align: left;
  height: 1.8rem;
  line-height: 1.8rem;font-size: 0.4rem;
}

#rate{
    display: inline-block;
}
</style>
<template>
    <div id="detailMain">
        <div id="detailMainContent">
            <div id="detailTop">
            </div>
            <div id="detailMiddle">
                <div id="detailMiddleContent">
                    <div id="detailLeft" class="detailLeftTopArea">
                        <div id="detailLeftTop" class="detailLeftTopArea">
                            <img class="detailLeftTopArea" src="../assets/images/video_window.png">
                        </div>
                        <div id="detailLeftBottom" class="detailLeftBottomArea">
                            <img class="detailLeftBottomArea" src="../assets/images/Advertising_play.png">
                        </div>
                    </div>
                    <div id="detailRight">
                        <div id="detailRightTop">
                            <span id="detailTitle">独立日：卷土重来</span>
                            <span id="detailScore"> 8.8</span>
                            <span id="detailStarRate">
                             <rate :label.sync='3' :point.sync='4.5' id='rate'></rate>
                            </span></br>
                            <span id="detailInfo">120分钟 2016年 美国</span></br>
                            <span id="detailDirector">导演：罗兰.艾默里奇</span></br>
                            <span id="detailIntroduction">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span></br>
                        </div>
                        <div id="detailRightBottom">
                            <div id="detailPayForPlay" class="detailPayBtn">
                                <a class="aDetailBtn" href="#">
                                    <span><img class="detailPayBtn" src="/assets/images/Buy.png"> </span>
                                </a>
                            </div>
                            <div id="detailBack" class="detailPayBtn">
                                <a class="aDetailBtn" href="#">
                                    <span><img class="detailPayBtn" src="/assets/images/Return.png"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detailBottom">
              <div id="detailBottomContent">
               电影世界/热播大片/独立日
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import Rate from './Rate'
export default {

    data() {
            return {};
        },
        components: {
            Rate,
        },
        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            console.log(width);
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
