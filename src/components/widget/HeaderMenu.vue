<template>
<div id="user_menu" class="main_wrap">
    <div class="option">我的文章</div>
    <div class="option">我的草稿</div>
    <div class="option"><router-link to='/'>我的主页</router-link></div>
    <div class="option">管理</div>
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
            this.$router.push({path:'/login'});
        },
    }    
}
</script>

<style scoped>
.main_wrap{
position: absolute;
z-index: 3;
top: 50px;
right: 2%;
width: 12%;
height: 65%;
color: gray;
background: #ffffff;
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