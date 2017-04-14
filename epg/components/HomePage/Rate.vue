<style lang='less' scoped>
html {
    font-size: 100px;
}

label {
    display: inline-block;
}

ul {
    display: inline;
    width: 2.5rem;
    margin-left: 0.1rem;
    text-align: bottom;
}

li {
    flex: 1;
    display: inline-block;
    margin-right: 0.02rem;
}
</style>
<template>
    <section >
        <!-- <label>{{label}}</label> -->
        <ul>
            <li v-for="count in 5">
                <Star :level="count+1" :point.sync="point"></Star>
            </li>
        </ul>
        <!-- <span class="point">{{point.toFixed(1)}}</span> -->
    </section>
</template>
<script>
import Star from './star';
export default {
    data() {
            return {};
        },

        props: ['label', 'point'],
        components: {
            Star,
        },

        ready() {
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            console.log(width);
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';
        },
}
</script>
