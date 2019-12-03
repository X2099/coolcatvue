<template>
  <div class="main_wrap">
    <div id="background"></div>
    <div class="login_form">
      <h1 class="login_title">登录</h1>
      <h1 class="close"
          @click="fnClose">✕</h1>
      <form method="post">
        <input type="text"
               name="username"
               placeholder="用户名"
               class="input_txt"
               autocomplete="off"
               v-model="username"
               @click="errshow=false">
        <input type="password"
               name="password"
               placeholder="密码"
               class="input_txt"
               v-model="password"
               @click="errshow=false">
        <div class="error_tip"
             v-show="errshow">{{errmsg}}</div>
        <input type="button"
               value="登 录"
               class="input_sub"
               @click="fnLogin">
      </form>
      <div class="navReg">没有账号？<a @click="goRegister">注册</a></div>
    </div>
  </div>
</template>

<script>
import cons from '@/components/constent'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      errmsg: '',
      errshow: false
    }
  },
  methods: {
    // 关闭登录窗
    fnClose () {
      this.$emit('closeLogin', false)
    },
    // 去注册
    goRegister () {
      this.$emit('goRegister', true)
    },
    // 登录
    fnLogin () {
      if (this.username === '' || this.password === '') {
        this.errmsg = '用户名或密码不能为空'
        this.errshow = true
        return
      };
      this.axios.post(cons.apis + 'api/login',
        {
          username: this.username,
          password: this.password
        })
        .then(response => {
          sessionStorage.clear()
          localStorage.clear()
          localStorage.token = response.data.token
          localStorage.username = response.data.username
          localStorage.uid = response.data.id
          this.$router.push({ path: '/' })
          location.reload()
        })
        .catch(error => {
          var errmsg = error.response.data.msg
          if (errmsg) {
            this.errmsg = errmsg
          } else {
            this.errmsg = '用户名或者密码错误'
          }
          this.errshow = true
        })
    }
  }
}
</script>

<style scoped>
#background {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #4f4f4f;
  opacity: 0.3;
  filter: alpha=(opacity(100));
}
.login_form {
  position: fixed;
  z-index: 2;
  width: 32rem;
  height: 30rem;
  background: #fff;
  top: auto;
  left: 50%;
  top: 50%;
  margin-top: -15rem;
  margin-left: -16rem;
  overflow: hidden;
}
.login_form .navReg {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #4f4f4f;
}
.login_form .navReg a {
  text-decoration: none;
  margin: 0 1rem;
  color: #4f4f4f;
  cursor: pointer;
}
.login_form .error_tip {
  position: absolute;
  font-size: 1rem;
  color: #f00;
  bottom: 12rem;
  left: 50%;
  transform: translate(-50%);
}
.login_form h1 {
  line-height: 7rem;
  margin: auto 3rem;
  font-size: 1.8rem;
}
.login_form .login_title {
  float: left;
  color: #4f4f4f;
}
.login_form .close {
  float: right;
  color: DarkGray;
  cursor: pointer;
}
.input_txt {
  display: block;
  margin: 2rem auto 0;
  width: 27rem;
  height: 3.2rem;
  border: 1px solid #d0d0d0;
  border-radius: 0.4rem;
  outline: none;
  text-indent: 1rem;
  font-size: 1.2rem;
}
.input_sub {
  display: block;
  margin: 4rem auto 0;
  width: 27rem;
  height: 3.2rem;
  border: 0;
  border-radius: 0.4rem;
  background: #4f4f4f;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-size: 1.2rem;
}
.input_sub:hover {
  opacity: 0.75;
  filter: alpha=(opacity(100));
}
@media screen and (max-width: 700px) {
  .login_form {
    width: 28rem;
    height: 28rem;
    margin-top: -14rem;
    margin-left: -14rem;
  }
  .login_form h1 {
    line-height: 6rem;
  }
  .input_txt {
    width: 22rem;
    height: 3rem;
  }
  .input_sub {
    width: 22rem;
    height: 3rem;
    margin: 4rem auto 0;
    background: indianred;
  }
  .login_form .error_tip {
    bottom: 10rem;
  }
}
</style>
