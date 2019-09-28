<template>
<div class="main_wrap">
    <div class="edit_article">        
        <div class="title">
            <input type="text" name="title" placeholder="此处输入文章标题..." autocomplete="off" class="input_txt" v-model="title">     
        </div>

        

        <div class="sub_menu">
            <div class="button">保存草稿</div>
            <div class="button">添加封面</div>
            <div class="button">富文本编辑</div>
            <div class="button" @click="menu_show=!menu_show" style="color:dodgerblue;font-size:16px">{{ menu_show?'▴ ':'▾ ' }}发布</div>
            <div class="button" v-if="username" >
                <img src="../../assets/imgs/avatar.png" @click="usermenu_show=!usermenu_show"/>
            </div>

            <div class="usermenu" v-if="usermenu_show">
                <div class="option">我的文章</div>
                <div class="option">我的草稿</div>
                <div class="option">设置</div>
                <div class="option"><router-link to='/'>我的主页</router-link></div>
                <div class="option">退出</div>
            </div>

            <div class="menu" v-if="menu_show">
                <h1>发布文章</h1>
                <h2>分类</h2>
                <div class="category">
                    <div class="empty" v-if="category_list.length<=0">
                        <p>您还未添加任何分类!</p>
                    </div>
                    <div v-else>
                        <div v-for="cat in category_list" :key="cat" class="parent">
                            <label :style="category==cat.id?'color:dodgerblue':''">
                            <input type="radio" v-model="category" :value="cat.id" style="visibility:hidden;width:0">{{ cat.name }}                         
                            </label>
                            <div v-for="sub_cat in cat.subs" :key="sub_cat"  class="sub">
                            <label :style="category==sub_cat.id?'color:dodgerblue':''">
                            <input type="radio" v-model="category" :value="sub_cat.id" style="visibility:hidden;width:0">{{ sub_cat.name }}
                            </label>
                            </div>
                        </div>    
                    </div>                     
                </div>

                <div class="input_cat">
                    <label>所属：</label>
                    <select v-model="parent" :style="parent?'color:dodgerblue':''">
                    <option seleted ="seleted" value=''>————</option>
                    <option :value="cat.id" v-for="cat in category_list" :key="cat">{{ cat.name }}</option>
                    </select>      
                </div>
                <div class="add_cat">
                    <input type="text" placeholder="添加1个分类..." autocomplete="off" class="input_txt" v-model="cat">
                    <input type="submit" value="+" class="input_sub" @click="addCategory">
                </div>

                <h2>标签</h2>
                <div class="tag">
                    <div class="empty" v-if="tag_list.length<=0">
                        <p>您还未添加任何标签!</p>
                    </div>
                    <div v-else>
                        <div v-for="tag in tag_list" :key="tag" >                                    
                            <label :style="tags.indexOf(tag.id)>=0?'color:dodgerblue':''">
                                <input type="checkbox" v-model="tags" :value="tag.id" style="visibility:hidden;width:0">
                                {{ tag.name }}
                            </label>
                        </div>
                    </div>
                    <input type="text" placeholder="添加1个标签..." autocomplete="off" class="input_txt" v-model="tag">
                    <input type="submit" value="+" class="input_sub" @click="addTag">
                </div>
                <div class="submit">
                    <button @click="createArticle">确认并发布</button>
                </div>
            </div>

        </div>

        
        <div class="body">               
        <mavon-editor placeholder="此处输入正文..." v-model="body" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 700px"/>                        
        </div>
    </div>   
</div>   
</template>

<script>
    import Header from '@/components/widget/Header'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import cons from '@/components/constent'
    import { error } from 'util'

    export default {
        name: "",
        props: [],
        components: {
            Header,
            mavonEditor,
        },
        mounted(){
            this.getCategories();
            this.getTags();
        },
        data() {
            return {
                username: localStorage.username, // 登录用户
                title: '', // 文章标题
                body:'', // 文章正文
                html:'', // ？
                configs: {}, // ？
                menu_show: false, // 是否显示发布菜单
                usermenu_show: false, // 是否显示用户菜单
                category_list: [], // 分类数据
                tag_list: [], // 标签数据
                category: '', // 文章分类
                tags: [], // 文章标签
                parent: '', // 添加分类的父级分类
                cat: '', // 添加分类名称
                tag: '', // 添加标签的名称
            }
        },
        methods: {
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
            // 获取文章分类
            getCategories(){
                let token = localStorage.token;
                if(!token){
                    return;
                }
                this.axios.get(cons.apis + 'api/categories/',{
                    headers:{
                    'Authorization': 'JWT ' + token
                },
                responseType: 'json'
                })
                .then(response=>{
                    this.category_list = response.data;
                })
                .catch(error=>{
                    alert("获取数据失败！")
                })
            },
            
            // 获取文章标签
            getTags(){
                let token = localStorage.token;
                if(!token){
                    return;
                }
                this.axios.get(cons.apis + 'api/tags/',{
                    headers:{
                    'Authorization': 'JWT ' + token
                },
                responseType: 'json'
                })
                .then(response=>{
                    this.tag_list = response.data;
                })
                .catch(error=>{
                    alert("获取数据失败！")
                })
            },

            // 创建文章
            createArticle(){
                if(this.title==''||this.body==''||this.category==''||this.tags==[]){
                    alert("文章标题、内容、分类、标签不能为空！");
                    return;
                }
                let uid = localStorage.uid;
                let article_form = {
                        title: this.title,
                        body: this.body,
                        category: 1,
                        tags: [1, 2],
                        author: uid
                    }
                let token = localStorage.token;
                this.axios.post(cons.apis + 'api/articles/',
                    article_form,
                    {
                    headers:{
                    'authorization': 'JWT ' + token,
                    },
                    responseType: 'json'
                })
                .then(response=>{
                    this.$router.push({path:'/articles'});
                })
                .catch(error=>{
                    alert("创建文章失败！")
                })
            },
            
            // 创建分类
            addCategory(){
                if(this.cat==''){
                    return;
                }
                if(this.cat.length > 40){
                    alert("分类名称最大长度为40个字符，请重新输入！");
                    return;
                }
                let uid = localStorage.uid;
                let category_form = {
                    name: this.cat,
                    owner: uid
                }
                if(this.parent!=''){
                    category_form.parent = this.parent;
                }
                let token = localStorage.token;
                this.axios.post(cons.apis + 'api/categories/',
                    category_form,
                    {
                    headers:{
                    'authorization': 'JWT ' + token,
                    },
                    responseType: 'json'
                })
                .then(response=>{
                    this.cat = '';
                    this.parent = '';
                    this.getCategories();
                })
                .catch(error=>{
                    alert("添加标签失败！")
                })
            },

            // 创建标签
            addTag(){
                if(this.tag==''){
                    return;
                }
                if(this.tag.length > 40){
                    alert("标签名称最大长度为40个字符，请重新输入！");
                    return;
                }
                let token = localStorage.token;
                let uid = localStorage.uid;
                this.axios.post(cons.apis + 'api/tags/',
                    {
                    name: this.tag,
                    owner: uid
                    },
                    {
                    headers:{
                    'authorization': 'JWT ' + token,
                    },
                    responseType: 'json'
                })
                .then(response=>{
                    this.tag = '';
                    this.getTags();
                })
                .catch(error=>{
                    alert("添加标签失败！")
                })
            },     
        },
    }
</script>

<style scoped>
.main_wrap{
    position:absolute;
    width:100%;
    height:100%;
    background: #f5f5f5;
}
.edit_article .title{
    width: 70%;
    height: 60px;
    float: left; 
    background: #ffffff;
}
.edit_article .title .input_txt{
    float: left;
    width: 96%;
    height: 60px;
    margin-left: 2%;
    font-size: 24px;
    line-height: 60px;
    font-weight: bold;
    border:none;
    outline:none;
}
.edit_article .sub_menu{
    float: left;
    display:block;
    width: 30%;
    height: 60px;
    background: #ffffff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.edit_article .sub_menu .button{
    float: left;
    margin-left: 5%;
    width: 15%;
    line-height: 60px;
    font-size: 14px;
    color: rgb(138, 144, 145);
    text-align: center;
    cursor: pointer;
    /* background: burlywood; */
}
.sub_menu img{
    height: 40px;
    border-radius: 50%;
    margin: 10px auto;
    background: #ccc;
    opacity: 1;
    filter: alpha=(opacity(100));
}
.sub_menu img:hover{
    opacity: 0.8;
    filter: alpha=(opacity(80));
    }

.edit_article .sub_menu .usermenu{
    position: absolute;
    z-index: 3;
    top: 60px;
    right: 0;
    width: 10%;
    color: gray;
    background: #ffffff;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 3%;
}
.usermenu .option{
    /* float: left; */
    margin: 20% 10%;
    /* width: 15%; */
    /* line-height: 60px; */
    font-size: 16px;
    color: rgb(138, 144, 145);
    /* text-align: center; */
    cursor: pointer;
}

.edit_article .sub_menu .menu{
    position: absolute;
    z-index: 2;
    float: left;
    top: 60px;
    right: 4.5%;
    width: 24%;
    color: gray;
    background: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.edit_article .sub_menu .menu h1{
    margin: 5% 10%;
    font-size: 18px;
}
.edit_article .sub_menu .menu h2{
    margin: 5% 15%;
    font-size: 16px;
}
.edit_article .sub_menu .menu .category{
    margin: 5% 15%;
    font-size: 13px;
}
.edit_article .sub_menu .menu .tag{
    margin: 5% 15%;
    font-size: 13px;
}
.edit_article .sub_menu .menu .input_cat{
    font-size: 14px;
    margin: 5% auto 3% 15%;
    color: rgb(173, 171, 171);
}
.menu .input_cat select{
    outline:none;
    font-size: 12px;
    color: rgb(173, 171, 171);
    height: 20px;
}
.menu .input_cat option{
    color: rgb(173, 171, 171);
}
.menu .add_cat{
    margin: auto 15%;
}
.menu input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: rgb(173, 171, 171);
  font-size: 12px;
}
.tag input:-moz-placeholder, textarea:-moz-placeholder {
  color: rgb(173, 171, 171);
  font-size: 10px;
}
.tag input::-moz-placeholder, textarea::-moz-placeholder {
  color: rgb(173, 171, 171);
  font-size: 10px;
}
.tag input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: rgb(173, 171, 171);
  font-size: 10px;
}
.menu .input_txt{
    width: 70%;
    font-size: 12px;
    padding-bottom: 2%;
    border: none;
    outline: none;
    color: gray;
    background: #fbfbfb;
    border-bottom: 1px solid gray;
}
.menu .input_sub{
    font-size: 14px;
    text-align: center;
    margin-left: 5%;
    padding-bottom: 2%;
    border: none;
    outline: none;
    color: rgb(202, 195, 195);
    background: #fbfbfb;
    cursor: pointer;
}
.menu .category .parent{
    min-width: 35%;
    margin: 3% auto;
}
.menu .category .parent label{
    font-size: 14px;
    font-weight: bold;
}
.menu .category .parent label:hover{
    color: dodgerblue;
}
.menu .category .sub{
    min-width: 35%;
    margin: 3% auto 3% 5%;
}
.menu .category .sub label{
    font-size: 13px;
    font-weight: normal;
}
.menu .tag .empty{
    margin-bottom: 5%;
}
.menu .tag label{
    font-size: 12px;
    min-width: 35%;
    float: left;
    margin: auto 5% 5% auto;
    text-align: center;
    border: 1px solid rgb(202, 195, 195);
}
.menu .tag label:hover{
    color: dodgerblue;
}
.edit_article .sub_menu .menu .submit{
    width: 100%;
    margin: 5% auto;
    font-size: 16px;
    text-align: center;
}
.submit button{
    margin: 4% auto;
    text-align: center;
    padding: 1% 8%;
    color: dodgerblue;
    font-size: 14px;
    background: none;
    border: 1px solid dodgerblue;
    outline: none; 
}
.edit_article .body{
    float: right;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 3%;
}
</style>