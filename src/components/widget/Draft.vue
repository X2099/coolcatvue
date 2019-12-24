<template>
  <div class="main_wrap"
       v-show="show">
    <div class="theme">
      <h4 class="draft">草稿专栏（{{ article_list.length }}）</h4>
      <div v-for="(article,index) in article_list"
           :key="index"
           class="article">
        <div class="cover">
          <img :src="url + article.cover_image"
               v-if="article.cover_image" />
          <img src="static/images/logo.jpg"
               v-else />
        </div>
        <div class="intro">
          <p><label class="title"
                   @click="articleEdit(article.id)">{{ article.title }}</label></p>
          <p>
            分类：<label class="category">{{ article.category.name }}</label></p>
          <p>
            标签：<label class="tag"
                   v-for="(tag,index) in article.tags"
                   :key="index">{{ tag.name }} </label>
          </p>
          <p class="update_time">{{ article.update_time | FromNow }} ···</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cons from '@/components/constent'
import moment from 'moment'
import 'moment/locale/zh-cn'
let uid = localStorage.uid
let token = localStorage.token

export default {
  components: {
  },
  created () {
    this.authenticate()
    this.getArticles()
  },
  data () {
    return {
      article_list: [],
      url: cons.apis,
      show: false
    }
  },
  filters: {
    FromNow: function (val) {
      return moment(val).format('YYYY年MM月DD日 A h:mm:ss')
      // return moment(val).fromNow();
    }
  },
  methods: {
    // 验证是否登录
    authenticate () {
      if (!(uid && token)) {
        alert('请先确认您已登录！')
        this.$router.push({ path: '/' })
      }
    },
    getArticles () {
      this.axios.get(cons.apis + 'api/articles/', {
        params: {
          'author': uid,
          'status': 'd'
        }
      }).then(response => {
        this.article_list = response.data
        this.show = true
      }).catch(() => {
        alert('获取文章数据失败！')
      })
    },
    // 去编辑页传参
    articleEdit (id) {
      this.$router.push({
        name: 'ArticleEdit',
        params: { id: id }
      })
    }
  }
}
</script>

<style scoped>
html {
  font-size: 10px;
}
.theme {
  margin: 2rem 20%;
}
.theme .draft {
  margin: 0;
  padding: 3rem 0 2rem 8rem;
  background: #ffffff;
  font-size: 1.8rem;
}
.article {
  font-size: 0;
}
.article .intro {
  display: inline-block;
  width: 50%;
  height: 10rem;
  background: #ffffff;
  padding: 2% 0;
}
.article .intro p {
  color: gray;
  margin: 1% auto;
  font-size: 1.3rem;
  cursor: default;
}
.article .intro .title {
  font-size: 2rem;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
.article .intro .update_time {
  letter-spacing: 1px;
}
.article .intro .title:hover {
  color: dodgerblue;
}
.article .intro .category {
  font-weight: 600;
}
.article .intro .edit {
  font-weight: 100;
  cursor: pointer;
  text-decoration: underline;
  color: dodgerblue;
}
.article .cover {
  display: inline-block;
  vertical-align: top;
  width: 25%;
  height: 10rem;
  padding: 2% 0 2% 25%;
  background: #ffffff;
}
.article .cover img {
  height: 10rem;
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  .theme {
    margin: 1.5rem 0;
  }
  .theme .draft {
    padding: 1.5rem 1rem;
    /* background: yellowgreen; */
    margin-bottom: 0.1rem;
  }
  .article .intro {
    width: 90%;
    min-height: 10rem;
    height: auto;
    /* background: #140f0f; */
    padding: 0 5%;
  }
  .article .cover {
    display: none;
  }
}
</style>
