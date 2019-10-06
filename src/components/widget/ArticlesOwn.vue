<template>
    <div class="main_wrap">
        <div style="clear:both">
            <p><br></p>
        </div>
        <div v-for="article in article_list" :key="article" class="article">
            <div class="cover">
                <img src="static/images/cover_article.jpg" @click="articleDetail(article.id)" />
            </div> 
            <div  class="intro">
                <p>{{ article.pub_time | FromNow }}</p>
                <h1 @click="articleDetail(article.id)">{{ article.title }}</h1>
                <p>
                    <label class="category">分类：{{ article.category.name }}</label>
                    <label class="tag" v-for="tag in article.tags" :key="tag">{{ tag.name }} </label>
                </p>
                <p><span class="edit" @click="articleEdit(article.id)">编辑</span></p>
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
let uid = localStorage.uid

export default {
    components:{
    },
    created() {
    this.getArticles();
    },
    data(){
        return {
            article_list: []
        }
    },
    filters:{
        FromNow:function(val){
            return moment(val).format("YYYY年MM月DD日 h:mm:ss");
            // return moment(val).fromNow();
        }
    },
    methods:{
        getArticles(){
            this.axios.get(cons.apis + 'api/articles/',{
                params:{'author': uid}
            })
            .then(response=>{
                this.article_list = response.data;
            })
            .catch(error=>{
                alert("获取文章数据失败！");
            })
        },
        // 去详情页传递参数
        articleDetail(id){
            this.$router.push({
                name: 'Article',
                params: {
                    id: id
                }
            });
        },
        // 去编辑页传参
        articleEdit(id){
            this.$router.push({
                name: 'ArticleEdit',
                params: {
                    id: id                   
                }
            })
        },
    }
}
</script>

<style scoped>
.main_wrap{
    overflow-y: auto;
    height: 92%;
}
.article{
    margin: 0% 20%;
}
.article .intro{
    float: left;
    width: 50%;
    height: 100px;
    background: #ffffff;
    margin: 1px auto;
    padding: 4% 0;
    /* background: yellowgreen; */
}
.article .intro p{
    color: gray;
    margin: 1% auto;
    font-size: 13px;
    cursor: default;
}
.article .intro h1{
    font-size: 20px;
    cursor: pointer;
}
.article .intro h1:hover{
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
    margin: 1px auto;
    width: 25%;
    height: 100px;
    padding: 4% 0 4% 25%;
    background: #ffffff;
}
.article .cover img{
    height: 100px;
    cursor: pointer; 
}
</style>