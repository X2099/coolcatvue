<template>
<div class="main_wrap">
    <div class="login_form">
        <form method="post">
        <h1 class="login_title">用户登录</h1>
        <input type="text" name="username" placeholder="用户名" class="input_txt" autocomplete="off" v-model="username"  @click="errshow=false">
        <input type="password" name="password" placeholder="密码" class="input_txt" v-model="password"  @click="errshow=false">
        <div class="error_tip" v-show="errshow">{{errmsg}}</div>
        <input type="button" value="登 录" class="input_sub" @click="fnLogin">
        </form>
        <div class="nav">
        <router-link to='/'>首页</router-link>|<router-link to='/register'>注册</router-link>
        </div>
    </div>
</div>
</template>

<script>
import cons from '@/components/constent'

export default {   
    name: 'Login',
    data () {
        return {
        username:'',
        password:'',      
        errmsg: '',
        errshow: false
        }
    },
    methods:{
        fnLogin(){
        if(this.username==''||this.password==''){
            this.errmsg = '用户名或密码不能为空';
            this.errshow = true;
            return;
        };
        this.axios.post(cons.apis + 'api/login',
        {
            username:this.username,
            password:this.password,         
            })
            
            .then(response=>{
            sessionStorage.clear();
            localStorage.clear();
            localStorage.token = response.data.token;
            localStorage.username = response.data.username;
            localStorage.uid = response.data.id;
            this.$router.push({path:'/'});
            })
            .catch(error=>{
                var errmsg = error.response.data.msg;
                if(errmsg){
                this.errmsg = error.response.data.msg;
                }else{
                this.errmsg = "用户名或者密码错误";               
                }
                this.errshow = true;
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
background: #f5f5f5;
}
.login_form{
width:330px;
height:302px;
background:#fff;
position:fixed;
left:50%;
top:50%;
margin-top:-156px;
margin-left:-165px;
overflow:hidden;
border-radius:6px;
}
.login_form .nav{
text-align: center;
margin-top: 15px;
font-size: 13px;
color: rgb(63, 67, 68);
}
.login_form .nav a{
text-decoration:none;
margin: 0 10px;
color: rgb(63, 67, 68);        
}
.login_form .error_tip{
position:absolute;
font-size:10px;
color:#f00;
bottom:90px;
left:50%;
transform:translate(-50%)
}
.login_title{
line-height:72px;
text-align:center;
background: rgb(63, 67, 68);
color:#fff;
font-size:20px;
}
.input_txt{
display:block;
margin:20px auto 0;
width:298px;
height:32px;
border:1px solid #d0d0d0;
border-radius:4px;
outline:none;
text-indent:10px; 
}
.input_sub{
display:block;
margin:40px auto 0;
width:298px;
height:32px;
border:0px;
border-radius:4px;
background: rgb(63, 67, 68);
color:#fff;
cursor:pointer;
outline:none; 
}
.input_sub:hover{
background: rgb(114, 119, 121);
}
</style>