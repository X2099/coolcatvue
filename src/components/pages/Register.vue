<template>
<div class="main_wrap">
    <Header></Header>
    <form method="post" class="register_form">
    <h1 class="register_title">用户注册</h1>
    <input type="text" placeholder="用户名" class="input_txt" v-model="username" @blur="checkUsername">
    <input type="text" placeholder="密码" class="input_txt">
    <input type="text" placeholder="确认密码" class="input_txt">
    <input type="text" placeholder="邮箱" class="input_txt" v-model="email" @blur="checkEmail">
    <input type="text" placeholder="验证码" class="input_txt">
    <div class="error_tip" v-show="errshow">{{errmsg}}</div> 
    <input type="button" value="注 册" class="input_sub">
    </form>
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
            errmsg: '',
            errshow: false,
        }
    },
    methods:{
        checkUsername(){
        if(this.username==''){
            return;
        }
        this.axios.post(cons.apis + 'api/auth/check/',
        {
            username: this.username
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
        }
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
    background: #ffffe0;
}

.register_form{
width: 330px;
height: 450px;
background: #fff;
position: fixed;
left: 50%;
top: 50%;
margin-top: -226px;
margin-left: -165px;
overflow: hidden;
border-radius:6px;
}
.register_form .error_tip{
position: absolute;
font-size: 12px;
color: #f00;
bottom: 75px;
left: 50%;
transform: translate(-50%);
}
.register_title{
line-height: 72px;
text-align: center;
background:linear-gradient(90deg, black, white);
color: #fff;
font-size:20px;
}

.input_txt{
display: block;
margin: 20px auto 0;
width: 298px;
height: 32px;
border: 1px solid #d0d0d0;
border-radius: 4px;
outline: none;
text-indent: 10px;
}

.input_sub{
display: block;
margin: 40px auto 0;
width: 298px;
height: 32px;
border: 0px;
border-radius: 4px;
background:linear-gradient(90deg, white, black);
color:#fff;
cursor:pointer; 
}

.input_sub:hover{
background:linear-gradient(90deg, black, white);
}
</style>