<template>
    <div class="main_wrap">
        <Header></Header>
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
    </div>
</template>

<script>
import Header from '@/components/widget/Header'
import cons from '@/components/constent'

export default {
    components:{
        Header
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
    overflow-y: scroll;
    position:absolute;
    width:100%;
    height:100%;
    background: #f5f5f5; 
}
.main_wrap .article{
    padding: 100% auto;
    margin: 1% 20%;
}
.article .intro{
    float: left;
    width: 50%;
    height: 100px;
    background: #ffffff;
    /* background: yellowgreen; */
    margin: 2px auto;
    padding: 4% 0 4% 10%;
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
    /* background: yellow; */
}
.article .cover img{ 
    /* width: 50%; */
    height: 100px;
    /* padding: 2%; */
    
}
</style>