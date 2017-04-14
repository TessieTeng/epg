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


.hintimg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 0.3rem;
    height: 0.6rem;
}

</style>
<template>
    <div class="info">
        <div class="main">
         <img class="hintimg" src="/assets/images/hint.png" />
            <div class="conent">
            </div>
            <div class="footer">
                footer
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
