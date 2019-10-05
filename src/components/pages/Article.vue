<template>
    <div class="main_wrap">
        <Header></Header>
        <ArticleDetail></ArticleDetail>
    </div>
</template>

<script>
import Header from '@/components/widget/Header'
import ArticleDetail from '@/components/widget/ArticleDetail'

export default {
    components:{
        Header,
        ArticleDetail,
    },
}
</script>

<style scoped>
.main_wrap{
    overflow-y: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
</style>