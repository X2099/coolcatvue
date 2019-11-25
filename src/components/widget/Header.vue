<template>
  <div ref="header"
       class="forehead">
    <div class="nav">
      <div class="logo">
        <img src="../../assets/imgs/logo.png" />
      </div>
      <ol>
        <li><span @click="index">首页</span></li>
        <li><span @click="articles">我的文章</span></li>
        <li><span @click="edit">写文章</span></li>
        <li><span @click="leavingmsg">留言板</span></li>
      </ol>
      <div class="user">
        <div class="profile"
             v-if="username">
          <img id="user_img"
               src="../../assets/imgs/avatar.png"
               @click="usermenu_show=!usermenu_show" />
        </div>
        <div class="operate"
             v-else>
          <label class="register"><label @click="showRegister=true">注册</label></label>
          <label class="welcome">✦</label>
          <label @click="showLogin=true">登录</label>
        </div>
      </div>
    </div>
    <HeaderMenu id="user_menu"
                v-show="usermenu_show"></HeaderMenu>
    <Register @closeRegister="closeRegister"
              @goLogin="goLogin"
              v-if="showRegister"></Register>
    <Login @closeLogin="closeLogin"
           @goRegister="goRegister"
           v-if="showLogin"></Login>
  </div>
</template>

<script>
import Register from '@/components/widget/Register'
import Login from '@/components/widget/Login'
import HeaderMenu from '@/components/widget/HeaderMenu'

let uid = localStorage.uid
let token = localStorage.token

export default {
  props: ['show', 'toLogin'],
  components: {
    HeaderMenu,
    Register,
    Login
  },
  data () {
    return {
      username: localStorage.username,
      usermenu_show: false,
      middleSytle: {}, // 动态设置li标签样式
      imgSytle: {}, // 动态设置img标签样式
      showLogin: false, // 显示登录窗
      showRegister: false // 显示注册窗
    }
  },
  watch: {
    usermenu_show: function (newValue, oldValue) {
      this.$emit('update:show', newValue)
    },
    show: function (newValue, oldValue) {
      this.usermenu_show = newValue
    },
    toLogin: function (val) {
      this.showLogin = val
    }
  },
  methods: {
    // 关闭注册窗
    closeRegister (val) {
      this.showRegister = val
    },
    // 关闭登录窗
    closeLogin (val) {
      this.showLogin = val
      // 重置留言板登录按钮
      this.$emit('resetLogin', false)
    },
    // 从登录到注册
    goRegister (val) {
      this.showLogin = false
      this.showRegister = val
    },
    goLogin (val) {
      this.showRegister = false
      this.showLogin = val
    },
    // 首页
    index () {
      this.$router.push({ path: '/' }).catch(() => { })
    },
    // 我的文章页
    articles () {
      if (uid && token) {
        this.$router.push({ path: '/articles' }).catch(() => { })
      } else {
        this.showLogin = true
      }
    },
    // 文章编辑页
    edit () {
      if (uid && token) {
        this.$router.push({ path: '/edit' }).catch(() => { })
      } else {
        this.showLogin = true
      }
    },
    // 留言板
    leavingmsg () {
      this.$router.push({ path: '/leavingmsg' }).catch(() => { })
    }
  }
}
</script>

<style>
.forehead {
  z-index: 1;
  width: 100%;
  height: 45px;
  background: #4f4f4f;
  /* background: url("https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"); */
  color: #f5f5f5;
  font-size: 18px;
  font-family: "KaiTi";
}

.logo {
  width: 15%;
  float: left;
  height: 100%;
}
.logo img {
  height: 40px;
  margin: 2.5px auto;
  right: 0;
  cursor: crosshair;
}
.nav {
  margin: 0 20%;
}
.nav li {
  list-style: none;
  float: left;
  width: 17.5%;
  text-align: center;
  line-height: 45px;
}
.nav li span {
  cursor: pointer;
}
.user {
  width: 15%;
  float: right;
  height: 100%;
}
.user .operate label {
  float: right;
  line-height: 45px;
  font-size: 14px;
  font-weight: 10;
  cursor: pointer;
}
.user .operate label:hover {
  color: dodgerblue;
}
.user .operate .welcome:hover {
  color: Gold;
}
.user .operate .register {
  margin-right: 15%;
}
.user .profile img {
  float: right;
  cursor: default;
  margin: 7.5px auto;
  height: 30px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.9;
  filter: alpha=(opacity(100));
}
.user .profile img:hover {
  opacity: 1;
  filter: alpha=(opacity(80));
}
</style>
