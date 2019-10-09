<template>
<div class="main_wrap">
    <div id="background"></div>
    <div class="login_form">
        <h1 class="login_title">登录</h1>
        <h1 class="close" @click="fnClose">✕</h1>
        <form method="post">   
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
        errshow: false,
        }
    },
    methods:{
        // 关闭登录窗
        fnClose(){
            this.$emit('closeLogin', false);
        },
        // 登录
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
                location.reload();
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
.login_form{
position:fixed;
z-index: 2;
width:330px;
height:312px;
background:#fff;
left:50%;
top:50%;
margin-top:-156px;
margin-left:-165px;
overflow:hidden;
user-select: none;
}
.login_form .nav{
text-align: center;
margin-top: 15px;
font-size: 13px;
color: #4F4F4F;
}
.login_form .nav a{
text-decoration:none;
margin: 0 10px;
color: #4F4F4F;        
}
.login_form .error_tip{
position:absolute;
font-size:10px;
color:#f00;
bottom: 120px;
left:50%;
transform:translate(-50%)
}
.login_form h1{
line-height: 72px;
margin: auto 30px;
font-size: 18px;
}
.login_form .login_title{
float: left;
color: #4F4F4F;
}
.login_form .close{
float: right;
color: DarkGray;
cursor: pointer;
}
.input_txt{
display:block;
margin:20px auto 0;
width: 270px;
height:32px;
border:1px solid #d0d0d0;
border-radius:4px;
outline:none;
text-indent:10px; 
}
.input_sub{
display:block;
margin:40px auto 0;
width:270px;
height:32px;
border:0px;
border-radius:4px;
background: dodgerblue;
color:#fff;
cursor:pointer;
outline:none; 
}
.input_sub:hover{
opacity: 0.75;
filter: alpha=(opacity(100));
}
</style>