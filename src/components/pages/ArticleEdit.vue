<template>
    <div class="main_wrap">
        <!-- <Header></Header> -->
        <div class="edit_article">        
            <div class="title">
                <input type="text" name="title" placeholder="此处输入文章标题..." autocomplete="off" class="input_txt" v-model="title">
                <div class="sub">
                    <button @click="menu_show=!menu_show;getCategories();getTags()">发布</button>
                </div>
            </div>
            <div class="menu" v-show="menu_show">
                <h5>文章分类：</h5>
                <p v-for="category in category_list" :key="category">{{ category.name }}</p>
                <h5>标签选择：</h5>
                <p v-for="tag in tag_list" :key="tag">{{ tag.name }}</p>
                <button @click="createArticle">确认发布</button>
            </div>
            
            <div class="body">           
                <mavon-editor v-model="body" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 900px"/>           
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
                this.axios.post(cons.apis + 'api/articles/',
                    {
                        title: this.title,
                        body: this.body,
                        category: 1,
                        tags: [1, 2]
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
        },
        mounted() {

        }
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
    width: 98.5%;
    margin-left: 1.5%; 
}
.edit_article .title .input_txt{
    float: left;
    width: 80%;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    font-weight: bold;
    border:none;
    outline:none;
    background: #f5f5f5;
}
.edit_article .title .sub{
    float: left;
    display:block;
    /* margin:20px auto 0; */
    width: 20%;
    height:60px;
    /* background: rgb(63, 67, 68);
    background: lightblue; */
    /* color:#fff; */
    /* cursor:pointer; */
    /* outline:none; */
}

.edit_article .menu{
    position: fixed;
    z-index: 2;
    float: right;
    top: 60px;
    right: 2%;
    /* margin:20px auto 0; */
    width: 15%;
    min-height: 100px;
    background: #ffffff;
    border: 1px solid #c4bfbf;
    /* color:#fff; */
    /* cursor:pointer; */
    /* outline:none; */
}
.edit_article .body{
    position: fixed;
    z-index: 1;
    top: 60px;
    width: 100%;
    height: 100%;
}
</style>