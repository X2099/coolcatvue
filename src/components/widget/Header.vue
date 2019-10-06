<template>
    <div ref="header" class="forehead">
        <div class="logo">
            <img :style="imgSytle" src="../../assets/imgs/logo.png"/>
        </div>
        <div class="user">
            <div class="profile" v-if="username">
                <img :style="imgSytle" src="../../assets/imgs/avatar.png" @click="usermenu_show=!usermenu_show"/>           
            </div>   
            <div class="operate" v-else>        
                <label :style="middleSytle" class="register"><router-link to="/register">注册</router-link></label>
                <label :style="middleSytle" class="welcome">&nbsp;&nbsp;☺&nbsp;&nbsp;</label>
                <label :style="middleSytle"><router-link to="/login">登录</router-link></label>
            </div>
        </div>
        <div class="nav">
        <ul>
            <li :style="middleSytle"><router-link to="/">首页</router-link></li>
            <li :style="middleSytle"><router-link to="/articles">我的文章</router-link></li>
            <li :style="middleSytle"><router-link to="/edit">写文章</router-link></li>
            <li :style="middleSytle">留言板</li>
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
            middleSytle: {}, // 动态设置li标签样式
            imgSytle: {}, // 动态设置img标签样式
        }
    },
    mounted() {
        this.setStyle();
    },
    methods: {
        setStyle(){
            let height = this.$refs.header.offsetHeight;
            this.middleSytle = {
                'line-height': height + 'px',
            };
            this.imgSytle = {
                'margin-top': height * 0.15 + 'px',
                'height': height * 0.7 + 'px',
            }
        },
    }
}
</script>

<style>
.forehead{
    width: 100%;
    height: 8%;
    background: #4F4F4F;
    cursor: text;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.logo{
    width: 10%;
    float: left;
    height: 100%;
}
a{
    text-decoration: none;
    color: #fff;
}
.logo img{
    margin-left: 35%;
    height: 0px;
    cursor: crosshair;
}
.nav{
    margin: 0 10%;
}
.nav li{
    list-style: none;
    float: left;
    width: 25%;
    text-align: center;
    color: aliceblue;
    height: 100%;
}
.nav li a{
    cursor: pointer;
}
.user{
    width: 10%;
    float: right;
    height: 100%;
}
.user .operate label{
    float: right;  
    color: aliceblue;     
    font-size: 14px;
    font-weight: 100;
}
.user .operate label a{  
    cursor: pointer;
}
.user .operate label a:hover{  
    color: dodgerblue;
}
.user .operate .welcome:hover{  
    color: Gold;
    cursor: crosshair;
}
.user .operate .register{
    margin-right: 15%;
}
.user .profile img{
    cursor: default;
    margin-left: 55%;
    height: 0px;
    cursor: pointer;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.9;
    filter: alpha=(opacity(100));
}
.user .profile img:hover{
    opacity: 1;
    filter: alpha=(opacity(80));
    }
</style>