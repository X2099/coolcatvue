<template>
  <div class="main_wrap">
    <div class="option">
      <router-link to='/drafts'>草稿箱</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/leavingmsg'>留言板</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/home'>我的主页</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/articles'>我的文章</router-link>
    </div>
    <hr>
    <div class="option">管理</div>
    <hr>
    <div class="option">设置</div>
    <hr>
    <div class="option">
      <router-link to='/'>首页</router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.main_wrap {
  position: absolute;
  z-index: 2;
  top: 6%;
  right: 0;
  width: 15rem;
  height: auto;
  color: gray;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-right: none;
  border-radius: 2%;
}
.main_wrap hr {
  margin: auto 20% auto 10%;
  height: 1px;
  border: none;
  border-top: 1px solid #f3f4f7;
}
.option {
  padding: 12% 10%;
  color: rgb(138, 144, 145);
  font-size: 1.4rem;
  cursor: pointer;
}
.option a {
  color: rgb(138, 144, 145);
  text-decoration: none;
  font-size: 1.4rem;
}
</style>
