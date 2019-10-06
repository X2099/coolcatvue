<template>
    <div class="main_wrap">
        <div style="clear:both">
            <p><br></p>
        </div>
        <div v-for="article in article_list" :key="article" class="article">
            <div  class="intro">
                <p>{{ article.author.username }} • {{ article.pub_time | FromNow }} • {{ article.category.name }}</p>
                <h1 @click="articleDetail(article.id)">{{ article.title }}</h1>
                <p><label v-for="tag in article.tags" :key="tag">{{ tag.name }} </label></p>
            </div>
            <div class="cover">
                <img src="static/images/article.jpg" />
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
            // return moment(val).format("YYYY-DD-MM");
            return moment(val).fromNow();
        }
    },
    methods:{
        getArticles(){
            this.axios.get(cons.apis + 'api/articles/')
            .then(response=>{
                this.article_list = response.data;
            })
            .catch(error=>{
                alert("获取文章数据失败！");
            })
        },
        articleDetail(id){
            this.$router.push({
                name: 'Article',
                params: {
                    id: id
                }
            });
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
    margin: 2px auto;
    padding: 4% 0 4% 10%;
}
.article .intro p{
    color: gray;
    margin: 2% auto;
    font-size: 13px;
    cursor: pointer;
}
.article .intro h1{
    font-size: 20px;
    cursor: pointer;
}
.article .intro h1:hover{
    text-decoration: underline;
}
.article .cover{
    float: left;
    margin: 2px auto;
    width: 40%;
    height: 100px;
    padding: 4% 0;
    background: #ffffff;
}
.article .cover img{
    height: 100px;
    cursor: pointer; 
}
</style>