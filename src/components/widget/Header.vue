<template>
    <div class="header">
        <img src="../../assets/imgs/logo.png"/>
        <div class="right">        
            <p><router-link to="/register">注册</router-link></p>
            <p><router-link to="/login">登录</router-link></p>
        </div>
        <div class="left">
            <p>留言板</p>
            <p>发表文章</p>
            <p>标签管理</p>
            <p>文章分类</p>
            <p><router-link to="/">首页</router-link></p>
        </div>
    </div>
</template>

<style>
    .header{
        width: 100%;
        height: 50px;
        background: rgb(63, 67, 68);
        cursor: text;
        font-family: KaiTi;
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
    .header .left p{
        float: right;
        margin-right: 12%;
        line-height: 50px;
        color: aliceblue;
        cursor: pointer;
    }
    .header .right p{
        float: right;
        margin-right: 2%;
        line-height: 50px;
        color: aliceblue;
        cursor: pointer;
    }    
</style>