<template>
  <div id="user_menu"
       class="wrap">
    <div class="arrow"></div>
    <div class="main_wrap">
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
.wrap {
  position: absolute;
  z-index: 3;
  top: 6rem;
  right: 20%;
  width: 13rem;
  margin-right: -5.1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.wrap .arrow {
  width: 0;
  height: 0;
  position: absolute;
  right: 5.7rem;
  top: -1rem;
  border-bottom: 1rem solid #ffffff;
  border-right: 0.8rem solid transparent;
  border-left: 0.8rem solid transparent;
}
.main_wrap {
  cursor: pointer;
  background: #ffffff;
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
  /* background: yellowgreen; */
}
.option a {
  color: rgb(138, 144, 145);
  text-decoration: none;
  font-size: 1.4rem;
}
@media screen and (max-width: 700px) {
  .wrap {
    top: 5rem;
    right: 0;
    margin-right: 0;
    background: indianred;
  }
  .main_wrap {
    background: indianred;
  }
  .wrap .arrow {
    display: none;
  }
  .main_wrap hr {
    /* border-top: 1px solid rgb(224, 208, 208); */
    margin: 0 10%;
  }
  .option {
    margin: 10% 10%;
    color: white;
  }
  .option a {
    color: white;
  }
}
</style>
