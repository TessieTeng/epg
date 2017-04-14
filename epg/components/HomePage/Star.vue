<style lang='less'>
html {
    font-size: 100px;
}
.fa-star-o{
    width: 0.25rem;
    height: 0.25rem;
    background: url("../assets/images/Stars_c.png");
    background-size: 0.25rem 0.25rem;
}
.fa-star-active{
    width: 0.25rem;
    height: 0.25rem;
    background: url("../assets/images/Stars.png");
    background-size: 0.25rem 0.25rem;
}

.fa-star-half-o-active{
    width: 0.25rem;
    height: 0.25rem;
    background: url("../assets/images/Stars_b.png");
    background-size: 0.25rem 0.25rem;
}

</style>
<template>
    <!-- <i class="{{star}}"></i> -->
      <div class="{{star}}"></div>
</template>
<script>
export default {
    props: ['level', 'point'],
    computed: {
        star() {
            const ceil = Math.ceil(this.point);
            const floor = Math.floor(this.point);

            if (0 == this.point) {
                console.log("0 其他的应该都是空星");
                return 'fa-star-o';

            }

            if (this.level <= floor) {
                  console.log("少于的其他的应该都是实星");
                return 'fa-star-active';

            }
            if (this.level > ceil) {
                console.log("多余的其他的应该都是空星");
                return 'fa-star-o';

            }
            if (this.level == ceil && this.level > this.point) {
                  console.log("刚好是半星");
                return 'fa-star-half-o-active';
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
