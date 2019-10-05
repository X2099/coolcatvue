<template>
    <div class="main_wrap">
        <Header></Header>
        <ArticleList></ArticleList>
    </div>
</template>

<script>
import Header from '@/components/widget/Header'
import ArticleList from '@/components/widget/ArticleList'

export default {
    components:{
        Header,
        ArticleList
    },
}
</script>

<style scoped>
.main_wrap{
    overflow-y: hidden;
    position: absolute;
    /* position: relative; */
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    background: yellow;
}
</style>