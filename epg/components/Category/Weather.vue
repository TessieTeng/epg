<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 3;
    left: 0px;
    top: 0px;
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

.weatherUl {
    float: left;
    width: 100%;  
}

.weatherItem {
    width: 2.765rem; 
    height: 4rem;
    float: left;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    padding-bottom: 0.15rem;
    font-size: 0;
}

.weatherImg {
    width: 2.765rem;
    height: 3.5rem;
    border-radius: 0.1rem;
}

.weatherName {
    height: 0.3rem;
    font-size: 0.3rem;
    color: white;
}

.weatherUl li {
    display: inline;
    width: 100%;
}

a {
    display: inline-block;
    -webkit-transition: all .3s ease-in;
    list-style: none;
    text-decoration: none;
}

a:focus .weatherImg {
    border-radius: 0.1rem;
    border: 0.05rem solid white;
    box-shadow: 0 0 0.5rem 0 #609EDE, inset 0px 0px 0.02rem .05rem rgb(255, 255, 255);
    -webkit-transform: scale(1.1);
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
<!--******************天气预报*******************-->
<template>
    <html>
    <div class="info">
        <div class="main">
         <img class="hintimg" v-if=showhint src="/assets/images/hint.png" />
            <div class="conent">
                <ul class="weatherUl">
                    <li v-for="item in data[1].weather_city_list">
                        <div class='weatherItem'>
                            <a href="#">
                                <div>
                                    <img class="weatherImg" v-bind:src=item.city_image_url>
                                </div>
                            </a>
                            <div class="weatherName">{{item.city_name}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <div class="currentcategory">{{title}}/天气预报</div>
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
                currentItem: 0,
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

        props: [
            'data',
            'title',
            'showhint',
        ],

        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
