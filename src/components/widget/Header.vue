<template>
  <div ref="header"
       class="forehead">
    <div class="nav">
      <div class="logo">
        <img src="../../assets/imgs/logo.png"
             @click="index" />
      </div>
      <div class="option">
        <div class="listLarge">
          <span @click="index">首页</span>
          <span @click="articles">我的文章</span>
          <span @click="edit">写文章</span>
          <span @click="leavingmsg">留言板</span>
        </div>
        <div class="listSmall">
          <span @click="listShow=!listShow">首页 ▾</span>
          <div v-if="listShow">
            <span @click="index">首页</span>
            <span @click="edit">写文章</span>
            <span @click="articles">我的文章</span>
            <span @click="leavingmsg">留言板</span>
          </div>
        </div>
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
               :src="avatar"
               @click="usermenuShow=!usermenuShow" />
        </div>
        <div class="operate"
             v-else>
          <label class="register"
                 @click="showRegister=true">注册</label>
          <label class="welcome">✦</label>
          <label @click="showLogin=true">登录</label>
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
      search: '', // 搜索字段
      listShow: false
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
  margin: 0 15%;
  font-size: 0;
}
.nav .logo {
  width: 15%;
  height: 100%;
  display: inline-block;
  /* background: red; */
}
.nav .option {
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
  /* background: gold; */
}
.nav .logo img {
  height: 2.4rem;
  margin: 0.8rem auto;
  cursor: crosshair;
  background: #ffffff;
  border-radius: 50%;
}
.option .listLarge {
  width: 72%;
  font-size: 0;
  display: inline-block;
}
.option .listLarge span {
  width: 25%;
  text-align: center;
  display: inline-block;
  line-height: 4rem;
  font-size: 1.4rem;
  cursor: pointer;
  /* background: rebeccapurple; */
}
.option .listSmall {
  display: none;
}
.option .search {
  width: 28%;
  display: inline-block;
  /* background: yellowgreen; */
  vertical-align: top;
}
.option .search input {
  width: 70%;
  height: 2.4rem;
  margin: 0.7rem 0;
  border-radius: 0.2rem;
  font-size: 1.2rem;
  border: 1px solid #dcdfe6;
  text-indent: 1rem;
  outline: none;
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
.user .welcome {
  margin: auto 5%;
}
.user .operate .welcome:hover {
  color: Gold;
}
.user .operate .register {
  margin-right: 7.5%;
}
.user .profile img {
  height: 2.4rem;
  width: 2.4rem;
  margin: 0.8rem 0;
  float: right;
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
.el-icon-search {
  line-height: 2.4rem;
  margin-top: 0.7rem;
  padding-left: 1rem;
  font-size: 1.2rem;
  /* background: yellowgreen; */
}
@media screen and (max-width: 700px) {
  .nav {
    margin: auto;
    background: teal;
    /* background: indianred; */
  }
  .nav .option {
    width: 60%;
    /* background: indianred; */
  }
  .nav .user {
    width: 25%;
  }
  .nav .logo img {
    margin: 0.8rem 1rem;
  }
  .user .profile img {
    margin: 0.8rem 1rem;
  }
  .option .listLarge {
    display: none;
  }
  .option .listSmall {
    position: absolute;
    left: 15%;
    height: 4rem;
    z-index: 1;
    display: block;
    width: 21%;
  }
  .option .listSmall span {
    line-height: 4rem;
    font-size: 1.4rem;
    display: block;
    width: 100%;
    text-align: left;
    text-indent: 1rem;
    background: teal;
  }
  .option .search {
    margin-left: 35%;
    width: 65%;
  }
}
</style>
