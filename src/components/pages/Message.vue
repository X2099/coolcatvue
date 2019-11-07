<template>
    <div class="main_wrap" @click="hideMenu" ref="main_wrap">
        <Header :show.sync="usermenu_show"></Header>
        <MsgShow></MsgShow>
        <MsgEdit></MsgEdit>       
    </div>
</template>

<script>
import Header from '@/components/widget/Header'
import MsgShow from '@/components/widget/MsgShow'
import MsgEdit from '@/components/widget/MsgEdit'
let uid = localStorage.uid;
let token = localStorage.token;

export default {
    components:{
        Header,
        MsgShow,
        MsgEdit,
    },
    data() {
        return {
            usermenu_show: false,
            heightStyle: {},
        }
    },
    mounted() {
        this.setHeight();
    },
    methods:{
        // 隐藏用户菜单
        hideMenu(event){
            if(uid&&token){
                let elm1 = document.getElementById("user_img");
                let elm2 = document.getElementById("user_menu");
                let out_elm1 = !elm1.contains(event.target);
                let out_elm2 = !elm2.contains(event.target);
                if(elm1 && elm2){
                    if(out_elm1 && out_elm2){
                        this.usermenu_show = false;
                    }
                }
            }
            
        },
        // 设置页面高度
        setHeight(){
            let height = this.$refs.main_wrap.offsetHeight;
            this.heightStyle = {
                'height': height - 45 + 'px',
            }
        },
    }
}
</script>

<style scoped>
.main_wrap{
    overflow-y: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
</style>