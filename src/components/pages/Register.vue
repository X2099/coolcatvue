<template>
<div class="register">
    <Header></Header>
    <div class="register-box">
        <form id="RegisterForm">
            <div class="form-register username">
                <input placeholder="用户名">
            </div>
            <div class="form-register password">
                <input placeholder="密码">
            </div>
            <div class="form-register re_password">
                <input placeholder="确认密码">
            </div>
            <div class="form-register email">
                <input placeholder="邮箱">
            </div>
            <div class="form-register code">
                <input placeholder="验证码">
            </div>
            <input type="button" @click = "login" value="立即登录">
        </form>
    </div>
</div>
</template>>

<script>
import Header from '../widget/Header'

export default {
    components:{
        Header
    }
}
</script>

<style>
.register{
    background: url('../../assets/imgs/register.jpg');
    font-family: KaiTi;
    position:fixed;
    width:100%;
    height:100%;
    left:0px;
    top:0px;
    /* background:linear-gradient(45deg,#facff1,#6db9db); */
    background: #ffffe0;
}
.login_logo{
background:rgba(47,64,80,0.6);
height:45px;
}
.register .register-box{
    text-align: center;
    padding: 50px;
    width: 200px;
    height: 150px;
    background: yellowgreen;
    position: absolute;
    width:400px;
    height:200px;
    left:50%;
    top:50%; 
    margin-left:-200px;
    margin-top:-100px;
    /* border:1px solid #00F; */
}
</style>