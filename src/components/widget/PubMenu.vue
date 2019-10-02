<template>
<div id="pub_menu" class="main_wrap">
    <h1>发布文章</h1>
    <h2>分类</h2>
    <div class="category">
        <div class="empty" v-if="category_list.length<=0">
            <p>您还未添加任何分类!</p>
        </div>
        <div v-else>
            <div v-for="cat in category_list" :key="cat" class="parent">
                <label :style="category==cat.id?'color:dodgerblue':''">
                <input type="radio" name="category" v-model="category" :value="cat.id" style="visibility:hidden;width:0">{{ cat.name }}                         
                </label>
            <select v-model="category" class="sub" v-if="cat.subs.length > 0">
                <option seleted ="seleted" value=''>选择子分类</option>
                <option :value="sub_cat.id" v-for="sub_cat in cat.subs" :key="sub_cat">{{ sub_cat.name }}</option>
            </select> 
            </div>    
        </div>                     
    </div>
    <div class="input_cat">
        <select v-model="parent" :style="parent?'color:dodgerblue':''">
        <option seleted ="seleted" value=''>所属分类</option>
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
</template>


<script>
import cons from '@/components/constent'

export default {
    data() {
        return{
            category_list: [], // 分类数据
            tag_list: [], // 标签数据
            parent: '', // 添加分类的父级分类
            cat: '', // 添加分类名称
            tag: '', // 添加标签的名称
        }
    },
    methods: {
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
    mounted(){
            this.getCategories();
            this.getTags();
        },
}
</script>

<style scoped>
.main_wrap{
    position: absolute;
    z-index: 2;
    float: left;
    top: 6%;
    right: 4.5%;
    width: 20%;
    color: gray;
    background: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1{
    margin: 5% 10%;
    font-size: 18px;
}
h2{
    margin: 5% 15%;
    font-size: 16px;
}
.category{
    margin: 5% 10% 5% 15%;
    font-size: 13px;
}
.tag{
    margin: 5% 10% 5% 15%;
    font-size: 13px;
}
.input_cat{
    font-size: 14px;
    margin: 5% auto 3% 15%;
    color: rgb(173, 171, 171);
}
.input_cat select{  
    outline: none;
    font-size: 12px;
    font-family: 'simsun';
    color: rgb(173, 171, 171);
    line-height: 20px;
}
.input_cat option{
    color: rgb(173, 171, 171);
}
.add_cat{
    margin: auto 15%;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
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
.input_txt{
    width: 70%;
    font-size: 12px;
    padding-bottom: 2%;
    border: none;
    outline: none;
    color: gray;
    background: #fbfbfb;
    border-bottom: 1px solid gray;
}
.input_sub{
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
.category .parent{
    min-width: 35%;
    margin: 3% auto;
}
.category .parent label{
    font-size: 14px;
}
.category .parent label:hover{
    color: dodgerblue;
}
.category .sub{
    /* width: 25%; */
    margin: 1% 3%;
    border: none;
    border-bottom: 1px solid gray;
    background: none;
    font-size: 12px;
    font-family: 'simsun';
    text-align: center;
    color: gray;
    outline: none;
    /* appearance: none; */
}
.tag .empty{
    margin-bottom: 5%;
}
.tag label{
    font-size: 12px;
    min-width: 26%;
    float: left;
    margin: auto 5% 5% auto;
    text-align: center;
    border: 1px solid rgb(202, 195, 195);
}
.tag label:hover{
    color: dodgerblue;
}
.submit{
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
</style>