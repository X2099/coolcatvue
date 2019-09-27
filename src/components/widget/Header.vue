<template>
    <div class="header">
        <img src="../../assets/imgs/logo.png"/>
        <div class="right" v-if="username">
            <label @click="fnLogout">注销</label>       
            <label class="user">欢迎你，{{ username }}</label>
            <img src="../../assets/imgs/avatar.png"/>           
        </div>
        <div class="right" v-else>        
            <label><router-link to="/register">注册</router-link></label>
            <label><router-link to="/login">登录</router-link></label>
        </div>
        <div class="left">
            <ul>
            <li>留言板</li>
            <li><router-link to="/edit">写文章</router-link></li>
            <li>标签管理</li>
            <li><router-link to="/articles">我的文章</router-link></li>
            <li><router-link to="/">首页</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username: localStorage.username,
        }
    },
    methods:{
        fnLogout(){
            sessionStorage.clear();
            localStorage.clear();
            this.username = '';
            this.$router.push({path:'/login'});
        },
    }
}
</script>

<style>
.header{
    width: 100%;
    height: 50px;
    background: rgb(63, 67, 68);
    cursor: text;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.header a{
    text-decoration:none;
    color: #fff;
}
.header img{
    float: left;
    margin-left: 2%;
    height: 50px;
    cursor: crosshair;
}
.header .left li{
    list-style: none;
    float: right;
    margin-right: 10%;
    line-height: 50px;
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
    line-height: 50px;
    cursor: default;
}

.header .right .user{
    color: rgb(13, 123, 153);
    cursor: default;
}
.header .right .user:hover{
    color: #0ddce7;
}
</style>