<template>
    <div class="main_wrap">
        <div style="clear:both">
            <p><br></p>
        </div>
        <div v-for="article in article_list" :key="article" class="article">
            <div  class="intro">
                <p>{{ article.author.username }} • 3天前 • {{ article.category.name }}</p>
                <h1>{{ article.title }}</h1>
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

export default {
    components:{
    },
    mounted(){
    this.getArticles();
    },
    data(){
        return {
            article_list: []
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
        }
    }
}
</script>

<style scoped>
.main_wrap{
    overflow-y: auto;
    background: yellowgreen;
    height: 92%;
    /* margin: 2% 0; */
    /* padding: 20px 0; */
}
.article{
    /* padding: 100% auto; */
    margin: 0% 20%;
    background: yellow;  
}
.article .intro{
    float: left;
    width: 50%;
    height: 100px;
    background: #ffffff;
    margin: 2px auto;
    padding: 4% 0 4% 10%;
    background: lightseagreen;
}
.article .intro p{
    color: gray;
    margin: 2% auto;
    font-size: 13px;
}
.article .intro h1{
    font-size: 20px;
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
    
}
</style>