<template>
    <div ref="header" class="forehead">
        <div class="logo">
            <img src="../../assets/imgs/logo.png"/>
        </div>
        <div class="user">
            <div class="profile" v-if="username">
                <img id="user_img" src="../../assets/imgs/avatar.png" @click="usermenu_show=!usermenu_show" />           
            </div>   
            <div class="operate" v-else>        
                <label class="register"><router-link to="/register">注册</router-link></label>
                <label class="welcome">&nbsp;&nbsp;☺&nbsp;&nbsp;</label>
                <label><router-link to="/login">登录</router-link></label>
            </div>
        </div>
        <div class="nav">
        <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/articles">我的文章</router-link></li>
            <li><router-link to="/edit">写文章</router-link></li>
            <li>留言板</li>
        </ul>
        </div>
        <div id="user_menu" v-show="usermenu_show">
            <HeaderMenu></HeaderMenu>
        </div>
    </div>
</template>

<script>
import HeaderMenu from '@/components/widget/HeaderMenu'



export default {
    props: ['show'],
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
    watch: {
        usermenu_show: function(newValue, oldValue){
            this.$emit('update:show', newValue);
        },
        show: function(newValue, oldValue){
            this.usermenu_show = newValue;
        }
    },
}
</script>

<style>
.forehead{
    width: 100%;
    height: 45px;
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
    height: 40px;
    margin: 2.5px 35%;
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
    line-height: 45px;
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
    line-height: 45px;     
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
}
.user .operate .register{
    margin-right: 15%;
}
.user .profile img{
    cursor: default;
    margin: 7.5px auto 7.5px 55%;
    height: 30px;
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