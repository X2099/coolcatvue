<template>
<div id="user_menu" class="main_wrap">
    <div class="option"><router-link to='/articles'>我的文章</router-link></div>
    <div class="option"><router-link to='/drafts'>我的草稿</router-link></div>
    <div class="option"><router-link to='/'>我的主页</router-link></div>
    <div class="option"><router-link to='/'>管理</router-link></div>
    <div class="option">设置</div>
    <div class="option" @click="fnLogout">退出</div>
    <div class="option">关于</div>
</div>
</template>

<script>
export default {
    methods:{
        fnLogout(){
            sessionStorage.clear();
            localStorage.clear();
            this.username = '';
            this.$router.push({path:'/'});
        },
    }    
}
</script>

<style scoped>
.main_wrap{
position: absolute;
z-index: 3;
top: 45px;
right: 1.8%;
width: 12%;
height: 65%;
color: gray;
background: #ffffff;
opacity: 0.9;
filter: alpha=(opacity(100));
border-right: none;
cursor: pointer;
}
.option{
margin: 20% 10%;
font-size: 16px;
color: rgb(138, 144, 145);
}

.option a{
color: rgb(138, 144, 145);
text-decoration: none;
}
</style>