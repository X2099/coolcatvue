<template>
<div class="main_wrap">
    <div id="background"></div>
    <div class="register_form">
        <h1 class="register_title">注册</h1>
        <h1 class="close" @click="fnClose">✕</h1>
        <form method="post">
            <input type="text" placeholder="用户名" class="input_txt" v-model="username" @blur="checkUsername">
            <div class="error_tip"><p v-if="username_errshow">{{ username_errmsg }}</p></div>
            <input type="password" placeholder="密码" class="input_txt" v-model="password1" @blur="checkPassword1">
            <div class="error_tip"><p v-if="password_errshow1">{{ password_errmsg1 }}</p></div>
            <input type="password" placeholder="确认密码" class="input_txt" v-model="password2" @blur="checkPassword2">
            <div class="error_tip"><p v-if="password_errshow2">{{ password_errmsg2 }}</p></div>
            <input type="text" placeholder="邮箱" class="input_txt" v-model="email" @blur="checkEmail">
            <div class="error_tip"><p v-if="email_errshow">{{ email_errmsg }}</p></div>
            <input type="text" placeholder="验证码" class="input_txt" v-model="code" @blur="checkCode">
            <div class="error_tip"><p v-if="code_errshow">{{ code_errmsg }}</p></div>
            <input type="button" value="获取验证码" class="input_sub" @click="sendCode">
            <input type="button" value="注 册" class="input_sub" @click="fnRegister">
        </form>
        <div class="nav">
            <a @click="goLogin">已有账号登录</a>
        </div>
    </div>
</div>
</template>

<script>
import Header from '@/components/widget/Header'
import cons from '@/components/constent'

export default {
  name: 'Register',
  components: {
    Header
  },
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      email: '',
      code: '',
      username_errmsg: '',
      password_errmsg1: '',
      password_errmsg2: '',
      email_errmsg: '',
      code_errmsg: '',
      username_errshow: false,
      password_errshow1: false,
      password_errshow2: false,
      email_errshow: false,
      code_errshow: false
    }
  },
  methods: {
    // 关闭注册窗
    fnClose () {
      this.$emit('closeRegister', false)
    },
    // 去登录
    goLogin () {
      this.$emit('goLogin', true)
    },
    checkUsername () {
      this.username_errmsg = ''
      this.username_errshow = false
      if (this.username === '') {
        this.username_errmsg = '用户名不能为空'
        this.username_errshow = true
        return
      };
      var usernameReg = /^[\w\u4E00-\u9FA5]{2,17}$/
      if (!usernameReg.test(this.username)) {
        this.username_errmsg = '用户名为2~18个字符，不能包含特殊字符'
        this.username_errshow = true
        return
      }
      this.axios.post(cons.apis + 'api/auth/check/',
        {
          username: this.username
        })
        .then(response => {

        })
        .catch(error => {
          this.username_errshow = true
          this.username_errmsg = error.response.data.msg
        })
    },

    checkPassword1 () {
      this.password_errmsg1 = ''
      this.password_errshow1 = false
      if (this.password1 === '') {
        this.password_errmsg1 = '密码不能为空'
        this.password_errshow1 = true
      }
    },
    checkPassword2 () {
      this.password_errmsg2 = ''
      this.password_errshow2 = false
      if (this.password1 !== this.password2) {
        this.password_errmsg2 = '两次密码不一致，请重新输入'
        this.password_errshow2 = true
      }
    },
    checkEmail () {
      this.email_errmsg = ''
      this.email_errshow = false
      if (this.email === '') {
        this.email_errmsg = '邮箱不能为空'
        this.email_errshow = true
        return
      };
      var emailReg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (this.email === '') {
        return
      } else {
        if (emailReg.test(this.email)) {
        } else {
          this.email_errmsg = '请输入一个正确的邮箱地址'
          this.email_errshow = true
          return
        };
      };
      this.axios.post(cons.apis + 'api/auth/check/',
        {
          email: this.email
        })
        .then(response => {
          this.errshow = false
        })
        .catch(error => {
          this.email_errmsg = error.response.data.msg
          this.email_errshow = true
        })
    },
    checkCode () {
      this.code_errmsg = ''
      this.code_errshow = false
      var codeReg = /^[0-9]{6}$/
      if (!codeReg.test(this.code)) {
        this.code_errmsg = '验证码格式错误'
        this.code_errshow = true
      }
    },
    sendCode () {
      this.checkEmail()
      if (this.email_errshow === false) {
        this.axios.post(cons.apis + 'api/auth/send_code/',
          {
            email: this.email
          })
          .then(response => {
            alert('验证码已发送至您的邮箱，请注意查收！')
          })
          .catch(error => {
            this.email_errmsg = error.response.data.msg
            this.email_errshow = true
          })
      }
    },
    fnRegister () {
      this.checkUsername()
      this.checkPassword1()
      this.checkPassword2()
      this.checkEmail()
      this.checkCode()
      if (this.username_errshow || this.password_errshow1 || this.password_errshow2 || this.email_errshow || this.code_errshow) {

      } else {
        this.axios.post(cons.apis + 'api/auth/',
          {
            username: this.username,
            password1: this.password1,
            password2: this.password2,
            email: this.email,
            code: this.code
          })
          .then(response => {
            this.$router.push({path: '/login'})
          })
          .catch(error => {
            this.code_errmsg = error.response.data.code
            this.code_errshow = true
          })
      }
    }
  }
}
</script>

<style scoped>
#background{
  position:fixed;
  z-index: 2;
  width:100%;
  height:100%;
  left:0px;
  top:0px;
  background: #4F4F4F;
  opacity: 0.3;
  filter: alpha=(opacity(100));
}
.register_form{
  position:fixed;
  z-index: 2;
  width: 330px;
  height: 490px;
  background: #fff;
  left: 50%;
  top: 50%;
  margin-top: -246px;
  margin-left: -165px;
  overflow: hidden;
}
.register_form .nav{
  text-align: center;
  margin-top: 15px;
  font-size: 13px;
  color: rgb(63, 67, 68);
}
.register_form .nav a{
  text-decoration:none;
  margin: 0 10px;
  color: rgb(63, 67, 68);
  cursor: pointer;
}
.register_form .error_tip{
  height: 20px;
  width: 250px;
  font-size: 10px;
  line-height: 20px;
  margin: auto;
  color: #f00;
}
.register_form h1{
  line-height: 72px;
  margin: auto 30px;
  font-size: 18px;
}
.register_form .register_title{
  float: left;
  color: #4F4F4F;
}
.register_form .close{
  float: right;
  color: DarkGray;
  cursor: pointer;
}
.input_txt{
  display: block;
  margin: auto;
  width: 270px;
  height: 32px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  outline: none;
  text-indent: 10px;
}
.input_sub{
  display: block;
  margin: 10px auto 0;
  width: 270px;
  height: 32px;
  border: 0px;
  border-radius: 4px;
  /* background: dodgerblue; */
  background: #4F4F4F;
  color:#fff;
  cursor:pointer;
  outline:none;
}
.input_sub:hover{
  opacity: 0.75;
  filter: alpha=(opacity(100));
}
</style>
