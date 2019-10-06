<template>
<div class="main_wrap" @click="hideMenu">
    <div class="title">
        <input type="text" name="title" placeholder="此处输入文章标题..." autocomplete="off" class="input_txt" v-model="title">     
    </div>

    <div class="sub_menu">
        <div class="button">
            <label><p>保存草稿</p></label>
        </div>
        <div class="button">
            <label><p>文章封面</p></label>
        </div>
        <div class="button">
            <label><p>•••</p></label>
        </div>
        <div class="button">
            <label>
            <p id="pub_button" @click="menu_show=!menu_show" style="color:dodgerblue;font-size:16px">{{ menu_show?'▴ ':'▾ ' }}发布</p>
            </label>
        </div>
        <div class="user" v-if="username">
            <img src="../../assets/imgs/avatar.png" id="user_img" @click="usermenu_show=!usermenu_show"/>
        </div>      
    </div>    
    <div class="body">               
        <mavon-editor placeholder="此处输入正文..." v-model="body" ref="md" @imgAdd="$imgAdd" @change="change" style="height:100%"/>                       
    </div>
    <div id="pub_menu" v-show="menu_show">
        <PubMenu :title="title" :body="body" :category=category :tags=tags></PubMenu>
    </div>
    <div id="user_menu" v-show="usermenu_show">
        <UserMenu></UserMenu>
    </div>  
</div>   
</template>

<script>
    import PubMenu from '@/components/widget/PubMenu'
    import UserMenu from '@/components/widget/UserMenu'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import cons from '@/components/constent'
    import { error } from 'util'

    export default {
        name: "",
        props: [],
        components: {
            mavonEditor,
            PubMenu,
            UserMenu
        },
        mounted(){
            this.getArticle();
        },
        data() {
            return {
                username: localStorage.username, // 登录用户
                title: '', // 文章标题
                body:'', // 文章正文
                category: '', // 文章分类
                tags: [], // 文章标签
                html:'', // ？
                configs: {}, // ？
                usermenu_show: false, // 是否显示用户菜单                            
                menu_show: false, // 是否显示发布菜单
            }
        },
        methods: {
            // 获取被编辑文章数据
            getArticle() {
                let id = this.$route.params.id;
                if(id){
                    this.category = this.$route.params.category;
                    this.axios.get(cons.apis + 'api/articles/' + id + '/',{
                    responseType: 'json'
                    })
                    .then(response=>{
                        this.title = response.data.title;
                        this.body = response.data.body;
                        let tags = response.data.tags;
                        for(let i=0;i<tags.length;i++){
                            this.tags.push(tags[i].id);
                        };
                    })
                    .catch(error=>{
                        alert("获取数据失败！")
                    })
                }               
            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                let formdata = new FormData();

                this.$upload.post('/上传接口地址', formdata).then(res => {
                    console.log(res.data);
                    this.$refs.md.$img2Url(pos, res.data);
                }).catch(err => {
                    console.log(err)
                })
            },
            // 所有操作都会被解析重新渲染
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
                this.test = marked(this.content);
            },
            // 提交
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('提交成功，已打印至控制台！');
            },
            // 点击外部区域隐藏发布菜单和用户菜单
            hideMenu(event){
                let elm1 = document.getElementById("pub_button");
                let elm2 = document.getElementById("pub_menu");
                let elm3 = document.getElementById("user_img");
                let elm4 = document.getElementById("user_menu");
                let out_elm1 = !elm1.contains(event.target);
                let out_elm2 = !elm2.contains(event.target);
                let out_elm3 = !elm3.contains(event.target);
                let out_elm4 = !elm4.contains(event.target);
                if(elm1 && elm2){
                    if(out_elm1 && out_elm2){
                        this.menu_show = false;
                    }
                }
                if(elm3 && elm4){
                    if(out_elm3 && out_elm4){
                        this.usermenu_show = false;
                    }
                }
            },
            // 监听数据
            listen(data){
                alert(data);
            }
        },
    }
</script>

<style scoped>
.main_wrap{
    position:fixed;
    width:100%;
    height:100%;
    background: #f5f5f5;
}

.title{
    width: 70%;
    height: 6%;
    float: left; 
    background: #ffffff;
}
.title .input_txt{
    float: left;
    width: 90%;
    height: 100%;
    margin-left: 2%;
    font-size: 24px;
    line-height: 100%;
    font-weight: bold;
    border:none;
    outline:none;
}
.sub_menu{
    float: left;
    width: 30%;
    height: 6%;
    background: #ffffff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.sub_menu .button{
    display: table;
    overflow: hidden;
    float: left;
    margin-left: 5%;
    width: 15%;
    height: 100%;
    font-size: 14px;
    color: rgb(138, 144, 145);
    text-align: center;
}

.sub_menu .button label{
    vertical-align: middle;
    display: table-cell;
}
.sub_menu .button p{
    cursor: pointer;
}

.sub_menu .user img{
    position:fixed;
    top: 0.8%;
    right: 1%;
    float: left;
    border-radius: 50%;
    height: 4.4%;
    background: #ccc;
    opacity: 1;
    filter: alpha=(opacity(100));
}
.sub_menu img:hover{
    opacity: 0.8;
    filter: alpha=(opacity(80));
    }
.body{
    float: right;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 94%;
}
</style>