<template>
<div class="main_wrap">
    <div class="register_form">
    <form method="post">
    <h1 class="register_title">用户注册</h1>
    <input type="text" placeholder="用户名" class="input_txt" v-model="username" @blur="checkUsername">
    <div class="error_tip"><p v-if="username_errshow">{{ username_errmsg }}</p></div>
    <input type="text" placeholder="密码" class="input_txt">
    <div class="error_tip"></div>
    <input type="text" placeholder="确认密码" class="input_txt">
    <div class="error_tip"><p v-if="password_errshow">{{ password_errmsg }}</p></div>
    <input type="text" placeholder="邮箱" class="input_txt" v-model="email" @blur="checkEmail">
    <div class="error_tip"><p v-if="email_errshow">{{ email_errmsg }}</p></div>
    <input type="text" placeholder="验证码" class="input_txt">
    <div class="error_tip"><p v-if="code_errshow">{{ code_errmsg }}</p></div> 
    <input type="button" value="注 册" class="input_sub" @click="fnRegister">
    </form>
    <div class="nav">
        <router-link to='/'>首页</router-link>|<router-link to='/login'>登录</router-link>
    </div>
    </div>
</div>
</template>

<script>
import Header from '@/components/widget/Header'
import cons from '@/components/constent'

export default {
    name: 'Register',
    components:{
        Header
    },
    data(){
        return {
            username: '',
            password1: '',
            password2: '',
            email: '',
            code: '',
            username_errmsg: '',
            password_errmsg: '',
            email_errmsg: '',
            code_errmsg: '',
            username_errshow: false,
            password_errshow: false,
            email_errshow: false,
            code_errshow: false,
        }
    },
    methods:{
        checkUsername(){
        this.username_errmsg = '';
        this.username_errshow = false;
        if(this.username==''){
            this.username_errmsg = "用户名不能为空";
            this.username_errshow = true;
            return;
        };
        var usernameReg = /^[\w\u4E00-\u9FA5]{2,17}$/;
        if(!usernameReg.test(this.username)){
            this.username_errmsg = "用户名为2~18个字符，不能包含特殊字符";
            this.username_errshow = true;
            return;
        }
        this.axios.post(cons.apis + 'api/auth/check/',
        {
            username: this.username
        })
        .then(response=>{
            return;
        })
        .catch(error=>{
            this.username_errshow = true;
            this.username_errmsg = error.response.data.msg;            
        });
        },

        checkEmail(){
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(this.email==''){
            return;
        }else{
            if(emailReg.test(this.email)){
            }else{
                this.errmsg = "邮箱格式不正确";
                this.errshow = true;
                return;
            };
        };
        this.axios.post(cons.apis + 'api/auth/check/',
        {
            email: this.email
        })
        .then(response=>{
            this.errshow = false;
            return;
        })
        .catch(error=>{
            this.errshow = true;
            this.errmsg = error.response.data.msg;            
        });
        },

        fnRegister(){
            if(this.username==''||this.password1==''||this.password2 == ''||this.email==''||this.code==''){
                this.errmsg = "缺少必要的参数";
                this.errshow = true;
                return;
            }
        },
    }
}
</script>

<style scoped>
.main_wrap{
    position:fixed;
    width:100%;
    height:100%;
    left:0px;
    top:0px;
    background: #f5f5f5;
}

.register_form{
width: 330px;
height: 460px;
background: #fff;
position: fixed;
left: 50%;
top: 50%;
margin-top: -226px;
margin-left: -165px;
overflow: hidden;
border-radius:6px;
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
}
.register_form .error_tip{
height: 20px;
width: 298px;
font-size: 10px;
text-align: center;
line-height: 20px;
margin: auto;
color: #f00;
}
/* .register_form .error_tip{
position: absolute;
font-size: 12px;
color: #f00;
bottom: 85px;
left: 50%;
transform: translate(-50%);
} */
.register_title{
line-height: 72px;
text-align: center;
background: rgb(63, 67, 68);
color: #fff;
font-size:20px;
margin-bottom: 20px;
}
.input_txt{
display: block;
margin: auto;
width: 298px;
height: 32px;
border: 1px solid #d0d0d0;
border-radius: 4px;
outline: none;
text-indent: 10px;
}
.input_sub{
display: block;
margin: 20px auto 0;
width: 298px;
height: 32px;
border: 0px;
border-radius: 4px;
background: rgb(63, 67, 68);
color:#fff;
cursor:pointer;
outline:none; 
}
.input_sub:hover{
background: rgb(114, 119, 121);
}
</style>