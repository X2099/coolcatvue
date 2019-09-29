<template>
    <div class="main_wrap">
        <Header></Header>
        <div class="home">
            <div v-for="article in article_list" :key="article" class="article">
                <h4>{{ article.title }}</h4>
                <h4>分类：{{ article.category.name }}</h4>
                <h4>标签: {{ article.tags }}</h4>
                <h4>作者: {{ article.author.username }}</h4>
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
.main_wrap .home{
    background: #f5f5f5;
    padding-bottom: 10px;
}
.home .article{
    /* width: 100%; */
    /* height: 50px; */
    text-align: center;
    background: #fff;
    margin: 40px 20px;
}
</style>