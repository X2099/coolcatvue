<template>
  <div id="user_menu"
       class="main_wrap">
    <div class="option">
      <router-link to='/home'>我的主页</router-link>
    </div>
    <div class="option">
      <router-link to='/articles'>我的文章</router-link>
    </div>
    <div class="option">
      <router-link to='/drafts'>我的草稿</router-link>
    </div>
    <div class="option">
      <router-link to='/'>管理</router-link>
    </div>
    <div class="option">设置</div>
    <div class="option"
         @click="fnLogout">退出</div>
    <div class="option">关于</div>
  </div>
</template>

<script>
export default {
  methods: {
    fnLogout () {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push({ path: '/' })
      location.reload()
    }
  }
}
</script>

<style scoped>
.main_wrap {
  position: absolute;
  z-index: 3;
  top: 4rem;
  right: 20%;
  width: 15rem;
  height: 45rem;
  color: gray;
  background: #ffffff;
  cursor: pointer;
  border: 1px solid rgb(190, 193, 194);
  border-radius: 0.35rem;
}
.option {
  margin: 20% 10%;
  /* font-size: 1.6rem; */
  color: rgb(138, 144, 145);
  font-size: 1.4rem;
}
.option a {
  color: rgb(138, 144, 145);
  text-decoration: none;
  font-size: 1.4rem;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    top: 4rem;
    right: 0;
    width: 10rem;
    height: 25rem;
  }
  .option {
    margin: 10% 10%;
    color: rgb(138, 144, 145);
  }
}
</style>
