<template>
  <div class="main_wrap">
    <div class="option">
      <router-link to='/drafts'>草稿箱</router-link>
    </div>
    <div class="option">
      <router-link to='/leavingmsg'>留言板</router-link>
    </div>
    <div class="option">
      <router-link to='/leavingmsg'>我的主页</router-link>
    </div>
    <div class="option">
      <router-link to='/articles'>我的文章</router-link>
    </div>
    <div class="option">管理</div>
    <div class="option">设置</div>
    <div class="option">关于</div>
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
  width: 150px;
  height: 450px;
  color: gray;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-right: none;
  border-radius: 2%;
}
.option {
  margin: 20% 10%;
  font-size: 16px;
  color: rgb(138, 144, 145);
  cursor: pointer;
}
.option a {
  color: rgb(138, 144, 145);
  text-decoration: none;
}
</style>
