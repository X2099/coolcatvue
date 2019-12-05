<template>
  <div id="user_menu"
       class="main_wrap">
    <div class="option">
      <router-link to='/home'>我的主页</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/articles'>我的文章</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/drafts'>我的草稿</router-link>
    </div>
    <hr>
    <div class="option">
      <router-link to='/'>管理</router-link>
    </div>
    <hr>
    <div class="option">设置</div>
    <hr>
    <div class="option"
         @click="fnLogout">退出</div>
    <hr>
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
html {
  font-size: 10px;
}
.main_wrap {
  position: absolute;
  z-index: 3;
  top: 4rem;
  right: 20%;
  width: 13rem;
  /* height: auto; */
  background: #ffffff;
  cursor: pointer;
  border: 1px solid rgb(190, 193, 194);
  border-radius: 0.35rem;
}
.main_wrap hr {
  margin: auto 20% auto 10%;
  height: 1px;
  border: none;
  border-top: 1px solid #f3f4f7;
}
.option {
  margin: 12% 10%;
  /* font-size: 1.6rem; */
  color: rgb(138, 144, 145);
  font-size: 1.4rem;
  /* background: yellowgreen; */
}
.option a {
  color: rgb(138, 144, 145);
  text-decoration: none;
  font-size: 1.4rem;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    top: 5rem;
    right: 0;
    width: 10rem;
    height: auto;
    border: 1px solid indianred;
  }
  .main_wrap hr {
    /* border-top: 1px solid rgb(224, 208, 208); */
    margin: 0 10%;
  }
  .option {
    margin: 10% 10%;
  }
}
</style>
