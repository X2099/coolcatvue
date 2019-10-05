<template>
    <div ref="header" class="header">
        <img :style="imgSytle" src="../../assets/imgs/logo.png"/>
        <div  class="right" v-if="username">
            <img :style="imgSytle" src="../../assets/imgs/avatar.png" @click="usermenu_show=!usermenu_show"/>           
        </div>   
        <div class="right" v-else>        
            <label><router-link to="/register">注册</router-link></label>
            <label><router-link to="/login">登录</router-link></label>
        </div>
        <div class="left">
            <ul>
            <li :style="liSytle">留言板</li>
            <li :style="liSytle"><router-link to="/edit">写文章</router-link></li>
            <li :style="liSytle">标签管理</li>
            <li :style="liSytle"><router-link to="/articles">我的文章</router-link></li>
            <li :style="liSytle"><router-link to="/">首页</router-link></li>
            </ul>
        </div>
        <div v-show="usermenu_show">
            <HeaderMenu></HeaderMenu>
        </div>
    </div>
</template>

<script>
import HeaderMenu from '@/components/widget/HeaderMenu'



export default {
    components: {
            HeaderMenu
        },
    data(){
        return{
            username: localStorage.username,
            usermenu_show: false,
            height : null,
            liSytle: {}, // 动态设置li标签样式
            imgSytle: {}, // 动态设置img标签样式
        }
    },
    mounted() {
        this.setStyle();
    },
    methods: {
        setStyle(){
            // this.height = window.getComputedStyle(this.$refs.header).height;
            this.height = this.$refs.header.offsetHeight;
            this.liSytle = {
                'line-height': this.height + 'px',
            };
            this.imgSytle = {
                'margin-top': this.height * 0.15 + 'px',
                'height': this.height * 0.7 + 'px',
            }
        },
    }
}
</script>

<style>
.header{
    width: 100%;
    height: 8%;
    background: rgb(63, 67, 68);
    cursor: text;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.header a{
    text-decoration: none;
    color: #fff;
}
.header img{
    float: left;
    margin: auto 2%;
    height: 40px;
    cursor: crosshair;
    border-radius: 50%;
    background: #f5f5f5;
}
.header .left li{
    list-style: none;
    float: right;
    margin-right: 10%;
    line-height: 100%;
    color: aliceblue;
    cursor: pointer;
}
.header .right label{
    float: right;
    margin-right: 2%;
    line-height: 50px;
    color: aliceblue;
    cursor: pointer;
}
.header .right img{
    float: right;
    cursor: default;
    margin-right: 2%;
}
</style>