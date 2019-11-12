<template>
    <div class="main_wrap">
        <div style="clear:both">
            <p><br></p>
        </div>
        <div v-for="(article,index) in article_list" :key="index" class="article">
            <div  class="intro">
                <p>{{ article.author.username }} • {{ article.pub_time | FromNow }} • {{ article.category.name }}</p>
                <p><label class="title" @click="articleDetail(article.id)">{{ article.title }}</label></p>
                <p><label class="tag" v-for="(tag, index) in article.tags" :key="index">{{ tag.name }} </label></p>
            </div>
            <div class="cover">
                <img :src="url + article.cover_image" v-if="article.cover_image" @click="articleDetail(article.id)" />
                <img src="static/images/article.jpg" v-else @click="articleDetail(article.id)" />
            </div>
        </div>
        <div style="clear:both">
            <p><br></p>
        </div>
    </div>
</template>

<script>
import cons from '@/components/constent'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  components: {
  },
  created () {
    this.getArticles()
  },
  data () {
    return {
      article_list: [],
      url: cons.apis
    }
  },
  filters: {
    FromNow: function (val) {
      // return moment(val).format("YYYY-DD-MM");
      return moment(val).fromNow()
    }
  },
  methods: {
    getArticles () {
      this.axios.get(cons.apis + 'api/articles/')
        .then(response => {
          this.article_list = response.data
        })
        .catch(() => {
          alert('获取文章数据失败！')
        })
    },
    articleDetail (id) {
      this.$router.push({
        name: 'Article',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>
.main_wrap{
  overflow-y: auto;
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
  padding: 4% 0 4% 10%;
}
.article .intro p{
  color: gray;
  margin: 2% auto;
  font-size: 13px;
}
.article .intro .title{
  font-size: 20px;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
.article .intro .title:hover{
  text-decoration: underline;
}
.article .cover{
  float: left;
  margin: 1px auto;
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
