<style>
html {
    font-size: 100px;
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

.weatherDiv {
    width: 100%;
    height: 100%;
    padding-top: 1.5rem;
}

.weatherConent {
    width: 17.2rem;
    height: 8rem;
    margin: auto;
}
.weatherFooter{
  width:17.2rem;
  height: 1.3rem;
  margin:auto;
}

.weatherUl{
  float: left;
}

.weatherItem{   width: 2.765rem;   height: 4rem;   float: left;   margin-left:
0.57rem;   font-size: 0; } .weatherImg{   width: 2.765rem;   height: 3.7rem;
background:url("../../assets/images/movie_poster2.png");   background-size:
2.765rem 3.7rem; } .weatherName{   height: 0.3rem;   font-size: 0.7rem; }

.weatherUl li{
  display: inline;
}

</style>
<template>
    <div class="info">
        <div class="weatherDiv">
            <div class="weatherConent">
            <ul class="weatherUl">
              <li v-for='1 in 10'>
                <div class='weatherItem'>
                    <div>
                    <img class="weatherImg" >
                    </div>
                    <div class="weatherName">电影</div>
                </div>
              </li>
            </ul>
            </div>
            <div class="weatherFooter">
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
