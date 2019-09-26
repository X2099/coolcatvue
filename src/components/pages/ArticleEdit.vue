<template>
<div class="main_wrap">
    <Header></Header>
    <div class="edit_article">        
        <div class="title">
            <input type="text" name="title" placeholder="此处输入文章标题..." autocomplete="off" class="input_txt" v-model="title">     
        </div>

        <div class="sub_menu">

            <label class="button">保存草稿</label>
            <label class="button">添加封面</label>
            <label class="button">富文本编辑</label>
            <label class="button" @click="menu_show=!menu_show;getCategories();getTags()" style="color:dodgerblue;font-size:16px">发布</label>     

            <div class="menu" v-show="menu_show">
                <h1>发布文章</h1>
                <h2>分类</h2>
                <div class="categroy">
                    <p v-for="category in category_list" :key="category">
                        {{ category.name }}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="×" class="input_sub">
                    </p>
                    <input type="text" name="tag" placeholder="添加1个分类..." autocomplete="off" class="input_txt">
                    <input type="submit" value="＋" class="input_sub" style="color:dodgerblue">
                </div>
                <h2>标签</h2>
                <div class="tag">                   
                    <p v-for="tag in tag_list" :key="tag">
                        {{ tag.name }}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="×" class="input_sub">
                    </p>
                    <input type="text" name="tag" placeholder="添加1个标签..." autocomplete="off" class="input_txt" v-model="tag">
                    <input type="submit" value="＋" class="input_sub" style="color:dodgerblue" @click="addTag">
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
        data() {
            return {
                body:'',
                html:'',
                configs: {},
                menu_show: false,
                category_list: [],
                tag_list: [],
                title: '',
                tag: '',
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
                if(this.menu_show==false){
                    return;
                }
                let token = localStorage.token;
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
                if(this.menu_show==false){
                    return;
                }
                let token = localStorage.token;
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
                let token = localStorage.token;
                let uid = localStorage.uid;
                this.axios.post(cons.apis + 'api/articles/',
                    {
                        title: this.title,
                        body: this.body,
                        category: 1,
                        tags: [1, 2],
                        author: uid
                    },
                    {
                    headers:{
                    'authorization': 'JWT ' + token,
                    },
                    responseType: 'json'
                })
                .then(response=>{
                    alert("创建文章成功！");
                })
                .catch(error=>{
                    alert("创建文章失败！")
                })
            },
            
            // 创建标签
            addTag(){
                if(this.tag==''){
                    return;
                }
                if(this.tag.length > 40){
                    alert("标签最大长度40个字符，请重新输入！");
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
                    this.tag = '';
                    alert("添加标签失败！")
                })
            },     
        },
        mounted(){
        }
    }
</script>

<style scoped>
.main_wrap{
    overflow-y: scroll;
    position:absolute;
    width:100%;
    height:100%;
    background: #f5f5f5;
}
.edit_article .title{
    width: 80%;
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
    width: 20%;
    height: 60px;
    background: #ffffff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.edit_article .sub_menu .button{
    float: left;
    margin: auto 2%;
    width: 20%;
    line-height: 60px;
    font-size: 14px;
    color: rgb(138, 144, 145);
    text-align: center;
    cursor: pointer;
}

.edit_article .sub_menu .menu{
    position: absolute;
    z-index: 2;
    float: left;
    top: 110px;
    right: 44px;
    width: 14%;
    color: gray;
    background: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.edit_article .sub_menu .menu h1{
    margin: 5% 5%;
    font-size: 18px;
}
.edit_article .sub_menu .menu h2{
    margin: 5% 10%;
    font-size: 16px;
}
.edit_article .sub_menu .menu .categroy{
    margin: 5% 10%;
}
.edit_article .sub_menu .menu .tag{
    margin: 5% 10%;
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
    margin-right: 10%;
    padding-bottom: 2%;
    border: none;
    outline: none;
    color: rgb(202, 195, 195);
    background: #fbfbfb;
    cursor: pointer;
}

.edit_article .sub_menu .menu p{
    font-size: 12px;
    margin: 5% auto;
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
    /* top: 110px; */
    width: 100%;
    height: 100%;
    margin-bottom: 3%;
}
</style>