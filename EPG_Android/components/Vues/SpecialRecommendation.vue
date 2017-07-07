<style scoped>
* {
    margin: 0;
    padding: 0
}

div.rootView {
    position: relative;
    background-color: transparent;
    height: 720px;
    width: 1280px;
    background-color: black;
}

.content {
    position: fixed;
    width: 100%;
    height: 660px;
    padding-top: 10px;
}

.footers {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0px;
    background-image:url("../../assets/images/bg_path1.png");
}

.content ul li {
    list-style-type: none;
}

.a {
    position: absolute;
    top: 54px;
    left: 42px;
    bottom: 54px;
    width: 279.5px;
    height: 552px;
    text-align: center;
}

.a a img {
    width: 279.5px;
    height: 552px;
}

.b {
    position: absolute;
    top: 54px;
    left: 347.5px;
    height: 263.5px;
    width: 585px;
    bottom: 54px;
    text-align: center;
}

.b a img {
    height: 263.5px;
    width: 585px;
}

.c {
    position: absolute;
    top: 54px;
    right: 42px;
    width: 279.5px;
    height: 263px;
}

.c a img {
    width: 279.5px;
    height: 263px;
}

.d {
    position: absolute;
    top: 343px;
    left: 347.5px;
    width: 279.5px;
    height: 263px;
}

.d a img {
    width: 279.5px;
    height: 263px;
}

.e {
    position: absolute;
    top: 343px;
    left: 653px;
    width: 279.5px;
    height: 263px;
}

.e a img {
    width: 279.5px;
    height: 263px;
}

.f {
    position: absolute;
    top: 343px;
    right: 42px;
    width: 279.5px;
    height: 263px;
}

.f a img {
    width: 279.5px;
    height: 263px;
}

.content ul li a:focus {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.content ul li a:focus img {
    box-shadow: 0 0 6.67px 6.67px blue, inset 0px 0px 1.34px 3.34px rgb(255, 255, 255);
    border-radius: 12px;
}


.lefts {
    position: fixed;
    z-index: 5;
    bottom: 1.34px;
    margin-left: 66.67px;
}

.hint {
    position: fixed;
    z-index: 5;
    bottom: 10px;
    margin-left: 140px;
    font-size: 20px;
    color: white;
}

.rights {
    position: fixed;
    right: 100px;
    z-index: 5;
    bottom: 10px;
    font-size: 20px;
    color: white;
}
</style>
<template>
    <div class="rootView">
        <div class="content">
            <ul id="recommend">
                <li class="a">
                    <a href="javascript:;" class="first">
                        <img src="../../assets/images/tab_a.png">
                    </a>
                </li>
                <li class="b">
                    <a href="javascript:;">
                        <img src="../../assets/images/tab_b.png">
                    </a>
                </li>
                <li class="c">
                    <a href="javascript:;">
                        <img src="../../assets/images/tab_c.png">
                    </a>
                </li>
                <li class="d">
                    <a href="javascript:;">
                        <img src="../../assets/images/tab_d.png">
                    </a>
                </li>
                <li class="e">
                    <a href="javascript:;">
                        <img src="../../assets/images/tab_e.png">
                    </a>
                </li>
                <li class="f">
                    <a href="javascript:;">
                        <img src="../../assets/images/tab_f.png">
                    </a>
                </li>
            </ul>
        </div>
        <div class="footers">
            <img class="lefts" src="../../assets/images/img_portal.png">
            <span class="hint">{{lefthint}}</span>
            <span class="rights">{{righthint}}</span>
        </div>
    </div>ss
</template>
<script>
export default {


    data() {
            return {
                lefthint: "特别推荐",
                righthint: '"确定"进入,"返回"退出',
            };
        },


        ready() {
           document.querySelector("#recommend").children[0].children[0].focus();
        }

}
</script>
