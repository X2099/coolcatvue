<template>
<div id="user_menu" class="main_wrap">
    <div class="option"><label>我的文章</label></div>
    <div class="option">我的草稿</div>
    <div class="option">设置</div>
    <div class="option"><router-link to='/'>我的主页</router-link></div>
    <div class="option">退出</div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main_wrap{
position: absolute;
z-index: 3;
top: 6%;
right: 0;
width: 10%;
color: gray;
background: #ffffff;
border: 1px solid #ccc;
border-right: none;
border-radius: 3%;
}
.option{
margin: 20% 10%;
font-size: 16px;
color: rgb(138, 144, 145);
cursor: pointer;
}

.option a{
color: rgb(138, 144, 145);
text-decoration: none;
}
</style>