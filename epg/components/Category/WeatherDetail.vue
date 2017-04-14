<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 3;
    left: 0rem;
    top: 0rem;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    color: #999;
    background-image: url(/assets/images/background.png);
}

.main {
    width: 100%;
    height: 100%;
    padding-top: 1.5rem;
}

.conent {
    width: 17.2rem;
    height: 8rem;
    margin: auto;
}

.footer {
    width: 17.2rem;
    height: 1.3rem;
    margin: auto;
}

.detail {
    width: 14rem;
    height: 8rem;
    margin: auto;
    background-image: url(/assets/images/background_c.png);
    background-size: 14rem 8rem;
}

.left {
    width: 4.66rem;
    height: 8rem;
    float: left;
}

.top {
    height: 22%;
    width: 100%;
}

.middle {
    width: 4.66rem;
    height: 8rem;
    float: left;
}

.right {
    width: 4.66rem;
    height: 8rem;
    float: right;
}

.city {
    font-size: 0.4rem;
    color: white;
    font-weight: bold;
}

.aa {
    font-size: 0.3rem;
    color: white;
}

.this {
    font-size: 0.4rem;
    color: white;
    font-weight: bold;
    vertical-align: top;
}

.other {
    font-size: 0.35rem;
    color: white;
}

.thisimg {
    text-align: center;
}

.weatherinfo {
    height: 78%;
    width: 100%;
}

.weatherimg {
    width: 1.6rem;
    height: 1.8rem;
}
</style>
<template>
    <div class="info">
        <div class="main">
            <div class="conent">
                <div class="detail">
                    <div class="left">
                        <div class="top">
                            <span class="city">北京</span>
                            <span class="aa">今天10月20日</span>
                            <span class="aa">星期四</span>
                        </div>
                        <div class="weatherinfo">
                            <div class="this">今天</div>
                            <div class="thisimg">
                                <img src="/assets/images/weather/d02.png" class="weatherimg">
                            </div>
                            <div class="this">阴</div>
                            <div class="this">31℃-25℃</div>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="top"></div>
                        <div class="weatherinfo">
                            <div class="other">明天</div>
                            <div class="thisimg">
                                <img src="/assets/images/weather/d03.png" class="weatherimg">
                            </div>
                            <div class="other">雷阵雨</div>
                            <div class="other">28℃-20℃</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="top"></div>
                        <div class="weatherinfo">
                            <div class="other">后天</div>
                            <div class="thisimg">
                                <img src="/assets/images/weather/d04.png" class="weatherimg">
                            </div>
                            <div class="other">雷阵雨</div>
                            <div class="other">28℃-22℃</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
    </div>
</template>
<script>
export default {

    ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            console.log(width);
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },

}
</script>
