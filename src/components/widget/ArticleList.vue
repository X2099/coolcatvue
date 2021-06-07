<template>
  <div class="main_wrap">
    <div v-for="(article,index) in article_list"
         :key="index"
         class="article">
      <div class="intro">
        <p>{{ article.author.username }} • {{ article.pub_time | FromNow }} • {{ article.category.name }}</p>
        <p class="title"
           @click="articleDetail(article.id)">{{ article.title }}</p>
        <p><label class="tag"
                 v-for="(tag, index) in article.tags"
                 :key="index">{{ tag.name }} </label></p>
      </div>
      <div class="cover">
        <img :src="url + article.cover_image"
             v-if="article.cover_image"
             @click="articleDetail(article.id)" />
        <img src="static/images/article.jpg"
             v-else
             @click="articleDetail(article.id)" />
      </div>
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
      let newpage = this.$router.resolve({
        name: 'Article'
      })
      sessionStorage.setItem('id', JSON.stringify(id))
      window.open(newpage.href, '_blank')
    }
  }
}
</script>

<style scoped>
.main_wrap {
  margin: 2rem 30rem;
}
.article {
  font-size: 0;
  width: 100%;
  min-height: 10rem;
  background: #ffffff;
  margin-bottom: 0.2rem;
}
.article .intro {
  width: 50%;
  display: inline-block;
  padding-top: 4rem;
}
.article .intro p {
  color: gray;
  margin-bottom: 1rem;
  padding-left: 8rem;
  font-size: 1.3rem;
}
.article .intro .title {
  font-size: 2rem;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
.article .intro .title:hover {
  text-decoration: underline;
}
.article .cover {
  width: 50%;
  display: inline-block;
  vertical-align: top;
  height: 10rem;
  padding: 4rem 0;
}
.article .cover img {
  max-height: 100%;
  max-width: 40rem;
  padding-left: 4rem;
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    margin: 1.5rem 0;
  }
  .article .intro p {
    padding-left: 4rem;
  }
  article .cover img {
    width: 40rem;
    padding-left: 4rem;
  }
}
</style>
