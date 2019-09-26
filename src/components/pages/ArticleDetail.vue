<template>
<div class="main_wrap">
    <Header></Header>
    <div class="article">
        <mavon-editor class="md"
            :value="body"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "false"
            :editable="false"
            :scrollStyle="true"
            :ishljs = "true"
            :boxShadow = "false"
            ></mavon-editor>
    </div>
</div>
</template>

<script>
import Header from '@/components/widget/Header'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import cons from '@/components/constent'

export default {
    components:{
        Header,
        mavonEditor
    },
    data(){
        return {
        title: '',
        body: '',
        }    
    },
    methods:{
        // 获取文章标签
        getArticle(){
            this.axios.get(cons.apis + 'api/articles/4/',{
            responseType: 'json'
            })
            .then(response=>{
                this.body = '# ' + response.data.title + '\n\n' + response.data.body;
            })
            .catch(error=>{
                alert("获取数据失败！")
            })
        },
    },
    mounted(){
    this.getArticle();
    },
}
</script>

<style scoped>
.main_wrap{
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
.main_wrap .article .md{
    min-height: 600px;
    margin: 2% 20% 4% 20%;
    background: #ffffff;
}
</style>