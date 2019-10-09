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
                <label class="register"><label @click="showRegister=true">注册</label></label>
                <label class="welcome">&nbsp;&nbsp;☺&nbsp;&nbsp;</label>
                <label @click="showLogin=true">登录</label>
            </div>
        </div>
        <div class="nav">
        <ul>
            <li><label @click="index">首页</label></li>
            <li><label @click="articles">我的文章</label></li>
            <li><label @click="edit">写文章</label></li>
            <li>留言板</li>
        </ul>
        </div>
        <HeaderMenu id="user_menu" v-show="usermenu_show"></HeaderMenu>
        <Register @closeRegister="closeRegister" v-if="showRegister"></Register>
        <Login @closeLogin="closeLogin" v-if="showLogin"></Login>
    </div>
</template>

<script>
import Register from '@/components/widget/Register'
import Login from '@/components/widget/Login'
import HeaderMenu from '@/components/widget/HeaderMenu'

let uid = localStorage.uid;
let token = localStorage.token;



export default {
    props: ['show'],
    components: {
            HeaderMenu,
            Register,
            Login,
        },
    data(){
        return{
            username: localStorage.username,
            usermenu_show: false,
            middleSytle: {}, // 动态设置li标签样式
            imgSytle: {}, // 动态设置img标签样式
            showLogin: false, // 显示登录窗
            showRegister: false, // 显示注册窗
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
    methods: {
        // 关闭注册窗
        closeRegister(val){
            this.showRegister = val;
        },
        // 关闭登录窗
        closeLogin(val){
            this.showLogin = val;
        },
        index(){
            this.$router.push({path: '/'});
        },
        // 我的文章页
        articles(){           
            if(uid&&token){           
                this.$router.push({path:'/articles'});
            }else{               
                this.showLogin = true;
            }
        },
        // 文章编辑页
        edit(){           
            if(uid&&token){           
                this.$router.push({path:'/edit'});
            }else{               
                this.showLogin = true;
            }
        },
    }
}
</script>

<style>
.forehead{
    z-index: 1;
    width: 100%;
    height: 45px;
    background: #4F4F4F;
    color: #f5f5f5;
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
    line-height: 45px;
}
.nav li label{
    cursor: pointer;
}
.user{
    width: 10%;
    float: right;
    height: 100%;
}
.user .operate label{
    float: right;
    line-height: 45px;     
    font-size: 14px;
    font-weight: 10;
    cursor: pointer;
}
.user .operate label:hover{  
    color: dodgerblue;
}
.user .operate .welcome:hover{  
    color: Gold;
    cursor: text;
}
.user .operate .register{
    margin-right: 15%;
}
.user .profile img{
    float: right;
    cursor: default;
    margin: 7.5px 18px 7.5px auto;
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