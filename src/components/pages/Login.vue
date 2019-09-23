<template>
<div class="main_wrap">
    <Header></Header>
    <form method="post" class="login_form">
    <h1 class="login_title">用户登录</h1>
    <input type="text" name="username" placeholder="用户名" class="input_txt" autocomplete="off" v-model="username"  @click="errshow=false">
    <input type="password" name="password" placeholder="密码" class="input_txt" v-model="password"  @click="errshow=false">
    <div class="error_tip" v-show="errshow">{{errmsg}}</div>
    <input type="button" value="登 录" class="input_sub" @click="fnLogin">
    </form>
</div>
</template>

<script>
import Header from '@/components/widget/Header'
import cons from '@/components/constent'

export default {   
    name: 'Login',
    components:{
        Header
    },
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
        this.axios.post(cons.apis + 'api/auth/login/',
        {
            username:this.username,
            password:this.password,
            
            })
            
            .then(response=>{
            alert(JSON.stringify(response.headers));
            alert(response.headers['content-type']);
            alert(response.headers['content-length']);
            console.log(response.headers);
            // 存储用户登录信息
            // sessionStorage.clear();
            // localStorage.clear();
            // localStorage.token = response.data.token;
            // localStorage.username = response.data.username;
            // localStorage.user_id = response.data.id;
            this.$router.push({path:'/'});
            })
            .catch(error=>{
            this.errmsg = error.response.data.msg;
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
/* background:linear-gradient(45deg,#facff1,#6db9db); */
/* background: url('../../assets/imgs/register.jpg'); */
background: #ffffe0;
}

.login_logo{
background:rgba(47,64,80,0.6);
height:45px;
}
.login_logo img{
margin:45px 0px 0 0px;
}
.login_form{
width:330px;
height:292px;
background:#fff;
position:fixed;
left:50%;
top:50%;
margin-top:-146px;
margin-left:-165px;
overflow:hidden;
border-radius:6px;
}
.login_form .error_tip{
position:absolute;
font-size:12px;
color:#f00;
bottom:75px;
left:50%;
transform:translate(-50%)
}
.login_title{
line-height:72px;
text-align:center;
background:linear-gradient(90deg,rgba(246,60,47,0.6),rgba(128,58,242,0.6));
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
.forget_pass{
display:block;
width:298px;
margin:10px auto 0;
text-align:right;
font-size:14px;
color:#5195d0;
}
.input_sub{
display:block;
margin:40px auto 0;
width:298px;
height:32px;
border:0px;
border-radius:4px;
background:rgba(247,60,45,0.6);
color:#fff;
cursor:pointer; 
}
.input_sub:hover{
background:rgba(247,60,45,0.4);
}
</style>