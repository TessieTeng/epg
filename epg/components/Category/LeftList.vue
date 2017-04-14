<style scoped>
html {
    font-size: 0.1rem;
}

.info {
    position: fixed;
    z-index: 5;
    left: 0;
    top: 0;
    width: 3rem;
    height: 100%;
    background: url("/assets/images/column_background.png") no-repeat;
    display: box;
    box-direction: center;
}

a {
    color: #4892E6;
    text-decoration: none;
}

.title {
    margin-top: 1.4rem;
    color: white;
    font-size: 0.4rem;
    text-align: center;
}

.content {
    overflow: auto;
    height: 90%;
    text-align: center;
}

ul {
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
}

li {
    margin: 0px 0.6rem;
    padding: 0.4rem 0rem;
    font-size: 0.3rem;
    font-weight: bold;
}

.currentTab {
    color: white;
    outline: none;
    outline-style: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: url("/assets/images/cursor.png") no-repeat;
    background-size: 1.2rem 0.2rem;
    padding-bottom: 0.2rem;
    background-position: bottom;
    font-size: 0.35rem;
}

#testTest {
    width: 500px;
    height: 500px;
    background-color: red;
    position: fixed;
    top: 0;
}
</style>
<!--***************旅行空间分类列表**********************-->
<template>
    <div class="info">
        <div class="title">{{title}}</div>
        <div class="content">
            <ul id="leftlist">
                <li v-for="item in data">
                    <div >
                        <a id='{{item.id}}'   v-on:focus='swtichid(item.id,item.list_name)' href="javascript:void(0)">

                        <!-- @click="gotoHapp()" -->
                        {{item.list_name}}


                        </a>
                    </div>
                </li>
                <ul>
        </div>
    </div>
    </div>
</template>
<script>
import {
    updateClassTab
} from '../../vuex/actions.js';
import {
    getClassTab
} from '../../vuex/getters';
import store from '../../vuex/store.js';

export default {
    data() {
            return {
                editable: false,
                a: true,
            };
        },

        methods: {
            gotoHapp() {
                this.$dispatch("destroyedSwiper");
                setTimeout(() => {
                    this.$router.go("/happ");
                }, 50);
            },

            swtichid: function(item, name) {
                this.index = item;
                this.name = name;
                this.updateClassTabValue(this.index);


                for (var i = 0, length = this.data.length; i < length; i++) {
                    var itemChecked = document.getElementById(this.data[i].id);
                    itemChecked.className = itemChecked.className.replace("currentTab", "");
                    if (this.index == this.data[i].id) {
                        var currentItem = this.index;
                        this.$dispatch('test', currentItem);
                        this.$dispatch('name', this.name);
                        var itemChecked = document.getElementById(this.index);
                        itemChecked.className += "currentTab";
                    }
                }
            }

        },

        props: [
            'title',
            'data',
        ],

        ready() {
            var a = document.getElementById("leftlist");
            console.log(this.counterValue + "DC");
            var tabIndex;
            if (this.counterValue != 0) {
                tabIndex = this.counterValue.replace("_", "");
            } else {
                tabIndex = 0;
            }
            a.children[tabIndex].children[0].children[0].focus();
            console.log(a.children[tabIndex].children[0].children[0]);
            var html = document.getElementsByTagName('html')[0];
            var width = html.offsetWidth;
            html.style.fontSize = (width >= 1920 ? 1920 : width) / 1920 * 100 + 'px';

           // const list = document.querySelector('#leftlist');
           //  list.addEventListener('keyup', (e) => {
           //      list.querySelector('a').innerHTML = e.code + '-' + e.key + '-' + e.keyCode;
           //  })


            // a.addEventListener('keydown',function(event){
            //     if(event.keyCode == 38){
            //         console.log("向上键");
            //         if (event.preventDefault) event.preventDefault();
            //         else event.returnValue = false;
            //         event.stopPropagation();
            //         alert("向上键**" + event.returnValue);
            //     }else if(event.keyCode == 40){
            //           console.log("向下键");
            //         // if (event.preventDefault) event.preventDefault();
            //         // else event.returnValue = false;
            //           alert("向下键**"+ event.returnValue)
            //     }
            // })

        },
        vuex: {
            getters: {
                counterValue: getClassTab
            },
            actions: {
                updateClassTabValue: updateClassTab
            },
        },
}
</script>
