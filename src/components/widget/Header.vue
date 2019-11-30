<template>
  <div ref="header"
       class="forehead">
    <div class="nav">
      <div class="logo">
        <img class="screenLogo"
             src="../../assets/imgs/logo.png"
             @click="index" />
      </div>
      <div class="list">
        <span @click="index">首页</span>
        <span @click="articles">我的文章</span>
        <span @click="edit">写文章</span>
        <span @click="leavingmsg">留言板</span>
        <div class="search">
          <input type="text"
                 placeholder="CoolCat搜索" />
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="user">
        <div class="profile"
             v-if="username">
          <img id="user_img"
               class="avatar screenAvatar"
               :src="avatar"
               @click="usermenuShow=!usermenuShow" />
        </div>
        <div class="operate"
             v-else>
          <label class="register"
                 @click="showRegister=true">注册</label>
          <label class="welcome">✦</label>
          <label class="login"
                 @click="showLogin=true">登录</label>
        </div>
      </div>
    </div>
    <HeaderMenu id="user_menu"
                v-show="usermenuShow"></HeaderMenu>
    <Register @closeRegister="closeRegister"
              @goLogin="goLogin"
              v-if="showRegister"></Register>
    <Login @closeLogin="closeLogin"
           @goRegister="goRegister"
           v-if="showLogin"></Login>
  </div>
</template>

<script>
import cons from '@/components/constent'
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
      username: uid && token,
      usermenuShow: false,
      middleSytle: {}, // 动态设置li标签样式
      imgSytle: {}, // 动态设置img标签样式
      showLogin: false, // 显示登录窗
      showRegister: false, // 显示注册窗
      avatar: null, // 头像
      search: '' // 搜索字段
    }
  },
  watch: {
    usermenuShow: function (newValue, oldValue) {
      this.$emit('update:show', newValue)
    },
    show: function (newValue, oldValue) {
      this.usermenuShow = newValue
    },
    toLogin: function (val) {
      this.showLogin = val
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    // 获取用户资料
    getProfile () {
      if (uid && token) {
        this.axios.get(cons.apis + 'api/auth/' + uid + '/', {
          headers: {
            'Authorization': 'JWT ' + token
          },
          responseType: 'json'
        })
          .then(response => {
            this.avatar = cons.apis + response.data.avatar
          })
          .catch(() => { alert('获取用户资料失败！') })
      }
    },
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
  height: 4rem;
  background: #4f4f4f;
  color: #f5f5f5;
}
.nav {
  margin: 0 20%;
  font-size: 0;
}
.nav .logo {
  width: 15%;
  height: 100%;
  display: inline-block;
  /* background: burlywood; */
}
.nav .list {
  width: 70%;
  display: inline-block;
  font-size: 0;
  vertical-align: top;
  /* background: tan; */
}
.nav .user {
  width: 15%;
  display: inline-block;
  height: 100%;
}
.nav .logo img {
  height: 2.4rem;
  cursor: crosshair;
  background: #ffffff;
  border-radius: 50%;
}
.logo .screenLogo {
  margin: 0.8rem auto;
}
.nav .list span {
  width: 18%;
  text-align: center;
  display: inline-block;
  line-height: 4rem;
  font-size: 1.4rem;
  cursor: pointer;
  /* background: rebeccapurple; */
}
.nav .list .search {
  width: 28%;
  display: inline-block;
  /* background: yellowgreen; */
  vertical-align: top;
}
.nav .list .search input {
  width: 70%;
  height: 2rem;
  margin: 1rem auto;
  border-radius: 0.2rem;
  border: 1px solid #dcdfe6;
  text-indent: 1rem;
  outline: none;
}
.nav .list .search input:hover {
  border: 1px solid dodgerblue;
}
.user .operate label {
  float: right;
  line-height: 4rem;
  font-size: 1.3rem;
  cursor: pointer;
}
.user .operate label:hover {
  color: dodgerblue;
}
.user .operate .welcome:hover {
  color: Gold;
}
.user .operate .register {
  margin-right: 7.5%;
}
.user .profile .avatar {
  height: 2.4rem;
  width: 2.4rem;
  float: right;
  cursor: pointer;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.9;
  filter: alpha=(opacity(100));
}
.user .profile .screenAvatar {
  margin: 0.8rem 0;
}
.user .profile img:hover {
  opacity: 1;
  filter: alpha=(opacity(80));
}
.el-icon-search {
  padding-left: 1rem;
  font-size: 1.4rem;
}
@media screen and (max-width: 700px) {
  .nav {
    margin: auto;
  }
  .logo .screenLogo {
    margin: 0.8rem auto 0.8rem 1rem;
  }
  .user .profile .screenAvatar {
    margin: 0.8rem 1rem;
  }
  .user .operate .register,
  .welcome {
    display: none;
  }
  .user .operate .login {
    padding-right: 1rem;
  }
  .nav .list span {
    display: none;
  }
}
</style>
