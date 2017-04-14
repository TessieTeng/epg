<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 4;
    left: 0rem;
    top: 0rem;
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
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
    padding-top: 0.3rem;
}

.currentcategory {
    font-size: 0.38rem;
    color: #FFF;
    float: left;
}

.currentpage {
    font-size: 0.38rem;
    color: #FFF;
    float: right;
}

a {
    display: inline-block;
    -webkit-transition: all .3s ease-in;
    list-style: none;
    text-decoration: none;
}

a:focus .one {
    border-radius: 0.1rem;
    border: 0.01rem solid white;
    box-shadow: 0 0 0.5rem 0 #609EDE, inset 0px 0px 0.02rem .05rem rgb(255, 255, 255);
    -webkit-transform: scale(1.1);
}

a:focus .two {
    border-radius: 0.1rem;
    border: 0.01rem solid white;
    box-shadow: 0 0 0.5rem 0 #609EDE, inset 0px 0px 0.02rem .05rem rgb(255, 255, 255);
    -webkit-transform: scale(1.1);
}

.left {
    display: inline-block;
    float: left;
    width: 40%;
    height: 98%;
    max-height: 8rem;
    max-width: 8rem;
    box-sizing: border-box;
}

.le {
    margin-left: 0.08rem;
    float: left;
    width: 19%;
    height: 98%;
}

.middle {
    margin-left: 0.08rem;
    width: 19%;
    height: 98.95%;
    float: left;
    padding-top: 0.05rem;
}

.right {
    margin-left: 0.08rem;
    height: 98%;
    width: 19%;
    float: left;
}

.common {
    display: block;
    height: 50%;
    font-size: 0.5rem;
    padding: 0.05rem 0;
}

.leftleft {
    display: inline;
    width: 50%;
    font-size: 0.5rem;
}

.aa {
    background: #FF5D72;
}

.aaa {
    background: #44ED9A;
}

.aab {
    background: #FF8C4B;
    margin-left: -0.15rem !important
}

.bba {
    background: #7ADCFF;
}

.bbb {
    background: #5E01FF;
}

.m {
    display: block;
    background: #64F053;
    height: 120%;
}

.cca {
    background: #FF8C4B;
}

.ccb {
    background: #FF5D72;
}

.one {
    height: 100%;
}

.special {
    display: block;
    height: 100%;
    font-size: 0.5rem;
}

.citya {
    position: absolute;
    color: white;
    font-size: 0.4rem;
    margin-left: 0.4rem;
    margin-top: 1.4rem;
}

.datea {
    position: absolute;
    color: white;
    font-size: 0.4rem;
    margin-left: 0.4rem;
    margin-top: 2.0rem;
}

.weeka {
    position: absolute;
    color: white;
    font-size: 0.4rem;
    margin-left: 2.2rem;
    margin-top: 2.0rem;
}

.timea {
    position: absolute;
    color: white;
    font-size: 0.9rem;
    margin-left: 3.7rem;
    margin-top: 1.5rem;
}

.cityb {
    position: absolute;
    color: white;
    font-size: 0.4rem;
    margin-left: 0.3rem;
    margin-top: 2.8rem;
}

.dateb {
    position: absolute;
    color: white;
    font-size: 0.3rem;
    margin-left: 0.3rem;
    margin-top: 3.4rem;
}

.weekb {
    position: absolute;
    color: white;
    font-size: 0.3rem;
    margin-left: 1.6rem;
    margin-top: 3.4rem;
}

.timeb {
    position: absolute;
    color: white;
    font-size: 0.9rem;
    margin-left: 0.4rem;
    margin-top: 0.8rem;
}

.cityc {
    position: absolute;
    color: white;
    font-size: 0.4rem;
    margin-left: 0.3rem;
    margin-top: 6.8rem;
}

.datec {
    position: absolute;
    color: white;
    font-size: 0.3rem;
    margin-left: 0.3rem;
    margin-top: 7.4rem;
}

.weekc {
    position: absolute;
    color: white;
    font-size: 0.3rem;
    margin-left: 1.6rem;
    margin-top: 7.4rem;
}

.timec {
    position: absolute;
    color: white;
    font-size: 0.9rem;
    margin-left: 0.5rem;
    margin-top: 2.8rem;
}

.other {
    display: inline-block;
    height: 50%;
    width: 48%;
    margin: 0.05rem 0 0;
    font-size: 0;
    box-sizing: border-box;
    text-align: center;
    margin-left: -0.02rem;
    vertical-align: center;
}

.hintimg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 0.3rem;
    height: 0.6rem;
}
</style>
<!--******************世界时间*******************-->
<template>
    <html>
    <div class="info">
        <div class="main" v-if='isShowRightLayout'>
             <img class="hintimg" v-if=showhint src="/assets/images/hint.png" />
            <div class="conent">
                <div class="left">
                    <a href="#" class="common" id="first">
                        <div class="one aa">
                            <div class="citya">北京</div>
                            <div class="datea">7月20日</div>
                            <div class="weeka">星期三</div>
                            <div class="timea">15:30</div>
                        </div>
                    </a>
                    <a href="#" class="other">
                        <div class="one  aaa">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                    <a href="#" class="other">
                        <div class="one aab">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                </div>
                <div class="le">
                    <a href="#" class="common">
                        <div class="one bba">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                    <a href="#" class="common">
                        <div class="one bbb">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                </div>
                <div class="middle">
                    <a href="#" class="special">
                        <div class="one m">
                            <div class="cityc">北京</div>
                            <div class="datec">7月20日</div>
                            <div class="weekc">星期三</div>
                            <div class="timec">15:30</div>
                        </div>
                    </a>
                </div>
                <div class="right">
                    <a href="#" class="common">
                        <div class="one cca">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                    <a href="#" class="common">
                        <div class="one ccb">
                            <div class="cityb">北京</div>
                            <div class="dateb">7月20日</div>
                            <div class="weekb">星期三</div>
                            <div class="timeb">15:30</div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="footer">
                <div class="currentcategory">旅行空间/世界时间</div>
                <div class="currentpage">1/5</div>
            </div>
        </div>
    </div>

    </html>
</template>
<script>
export default {
    data() {
            return {
                isShowRightLayout: true,
                name: 'name',
            };
        },

        methods: {

        },

        events: {
            test: function(currentItem) {
                this.currentItem = currentItem;
            },
            name: function(name) {
                this.name = name;
            },
            isShowRightLayout() {
                this.isShowRightLayout = false;
            },

        },

        watch: {
            'showCategory': function(newValue) {
                console.log(newValue);
                console.log("XXXXXXXXXXXX");
                if (newValue == false) {
                    document.getElementById("first").focus();
                }

            },

        },

        props: [
            'showhint',
            'title',
            'showCategory',

        ],

        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
