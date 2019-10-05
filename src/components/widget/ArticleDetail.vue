<template>
<div class="main_wrap">
    <div class="title">
        <div class="avatar">
            <img :style="imgSytle" src="../../assets/imgs/avatar.png" @click="usermenu_show=!usermenu_show"/>
        </div>
        <div class="profile">
            <p>{{ article.author.username }}</p>
            <p>{{ article.pub_time }} 阅读：{{ article.views }}</p>
        </div>
        <div class="cover">
            <img src="static/images/cover.jpg" />
        </div>
    </div>
    <div class="article">
        <mavon-editor class="md"
            :value=body
            :subfield=false
            :defaultOpen="'preview'"
            :toolbarsFlag=false
            :editable=false
            :scrollStyle=true
            :ishljs=true
            :boxShadow=false
            ></mavon-editor>
    </div>
</div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import cons from '@/components/constent'

export default {
    components:{
        mavonEditor
    },
    data(){
        return {
            id: '',
            article: {},
            body: '',
        }    
    },
    created() {
        this.getArticleId();
        this.getArticle();
    },
    methods:{
        // 接收参数
        getArticleId() {
            this.id = this.$route.params.id;
        },
        // 获取文章
        getArticle(){
            this.axios.get(cons.apis + 'api/articles/' + this.id + '/',{
            responseType: 'json'
            })
            .then(response=>{
                this.body = '# ' + response.data.title + '\n\n' + response.data.body;
                this.article = response.data;
            })
            .catch(error=>{
                alert("获取数据失败！")
            })
        },
    },
}
</script>

<style scoped>
.main_wrap{
    overflow-y: auto;
    height: 92%;
    width: 100%;
}
.title{
    margin: 2% 20% 0 20%;
    /* height: 10%; */
    background: #fbfbfb;
}
.title .avatar{
    float: left;
    margin: 2% 0 0 2%;
    background: greenyellow;
}
.title .profile{
    float: left;
    margin: 2% 0 0 2%;
    background: lightcyan;
}
.title .avatar img{
    cursor: default;
    margin: 2% 0 0 2%;
    cursor: pointer;
    background: #f5f5f5;
    /* background: yellow; */
    height: 30px;
    border-radius: 50%;
    opacity: 0.9;
    filter: alpha=(opacity(100));
}
.title .cover{
    clear:both;
}
.title .cover img{
    margin: 2% 10%;
    width: 80%;
}
.article{
    overflow-y: auto; 
}
.main_wrap .article .md{
    margin: 0 20% 2% 20%;
}
</style>