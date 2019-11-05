<template>
    <div class="main_wrap">
        <div style="clear:both">
            <p><br></p>
        </div>
        <div class="theme">
            <h4 class="draft">草稿专栏（{{ article_list.length }}）</h4>      
            <div v-for="(article,index) in article_list" :key="index" class="article">
                <div class="cover">
                    <img :src="url + article.cover_image" v-if="article.cover_image" />
                    <img src="static/images/logo.jpg" v-else />                
                </div> 
                <div  class="intro">                    
                    <p><label class="title" @click="articleEdit(article.id)">{{ article.title }}</label></p>
                    <p>
                    分类：<label class="category">{{ article.category.name }}</label></p><p>
                    标签：<label class="tag" v-for="(tag,index) in article.tags" :key="index">{{ tag.name }} </label>
                    </p>  
                    <p class="update_time">{{ article.update_time | FromNow }}  ···</p>
                </div>                      
            </div>
        </div>
        <div style="clear:both">
            <p><br></p>
        </div>
    </div>
</template>

<script>
import cons from '@/components/constent'
import moment from "moment"
import 'moment/locale/zh-cn'
let uid = localStorage.uid;
let token = localStorage.token;

export default {
    components:{
    },
    created() {
        this.authenticate();
        this.getArticles();
    },
    data(){
        return {
            article_list: [],
            url: cons.apis,
        }
    },
    filters:{
        FromNow:function(val){
            return moment(val).format("YYYY年MM月DD日 A h:mm:ss");
            // return moment(val).fromNow();
        }
    },
    methods:{
        // 验证是否登录
        authenticate(){
            if(!(uid&&token)){        
                alert("请先确认您已登录！")           
                this.$router.push({path:'/'});  
            }
        },
        getArticles(){
            this.axios.get(cons.apis + 'api/articles/',{
                params:{
                    'author': uid,
                    'status': 'd',
                }
            })
            .then(response=>{
                this.article_list = response.data;
            })
            .catch(error=>{
                alert("获取文章数据失败！");
            })
        },
        // 去编辑页传参
        articleEdit(id){
            this.$router.push({
                name: 'ArticleEdit',
                params: {id: id}
            })
        },
    }
}
</script>

<style scoped>
.main_wrap{
    overflow-y: auto;
    height: 94%;
}
.theme .draft{
    margin: 0% 20%;
    padding: 2% 8%;
    background: lightblue;
    background: #ffffff;
    margin-bottom: 1px;
}
.article{
    margin: 0% 20%;
}
.article .intro{
    float: left;
    width: 50%;
    height: 100px;
    background: #ffffff;
    padding: 2% 0;
}
.article .intro p{
    color: gray;
    margin: 1% auto;
    font-size: 13px;
    cursor: default;  
}
.article .intro .title{
    font-size: 20px;
    color: black;
    font-weight: bold;
    cursor: pointer;
}
.article .intro .update_time{
    letter-spacing: 1px
}
.article .intro .title:hover{
    color: dodgerblue;
}
.article .intro .category{
    font-weight: 600;
}
.article .intro .edit{
    font-weight: 100;
    cursor: pointer;
    text-decoration: underline;
    color: dodgerblue;
}
.article .cover{
    float: left;
    width: 25%;
    height: 100px;
    padding: 2% 0 2% 25%;
    background: #ffffff;
}
.article .cover img{
    height: 100px;
    cursor: pointer; 
}
</style>