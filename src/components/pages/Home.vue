<template>
    <div class="main_wrap">
        <Header></Header>
        <div class="home">
            <div v-for="article in article_list" :key="article" class="article">
                <h4>{{ article.title }}</h4>
                <p>{{ article.body }}</p>
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
    position:absolute;
    width:100%;
    height:100%;
    background: #ffffe0; 
}
.main_wrap .home{
    background: #ffffe0;
    padding-bottom: 10px;
}
.home .article{
    /* width: 100%; */
    height: 500px;
    text-align: center;
    background: #f5f5f5;
    margin: 40px 20px;
}
</style>