<template>
  <div class="main_wrap">
    <div class="title">
      <div :style="imgSytle"
           class="avatar">
        <img :style="imgSytle"
             src="static/images/author.png" />
      </div>
      <div class="profile"
           ref="profile">
        <p class="username">{{ author.username }}</p>
        <p class="info">{{ article.pub_time | formatDate }} 阅读 {{ article.views }}</p>
      </div>
    </div>
    <div class="article">
      <!-- <mavon-editor class="md"
                    v-model="body"
                    :subfield="false"
                    :boxShadow="false"
                    defaultOpen="preview"
                    :toolbarsFlag="false" /> -->
      <mavon-editor class="md"
                    :value='body'
                    :subfield='false'
                    :defaultOpen="'preview'"
                    :toolbarsFlag='false'
                    :editable='false'
                    :scrollStyle='false'
                    :ishljs='true'
                    codeStyle="agate"
                    style="height:100%"></mavon-editor>
    </div>
  </div>
</template>

<script>
import ArticleEdit from '@/components/pages/ArticleEdit'

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'
// import 'moment/locale/zh-cn'
import cons from '@/components/constent'

export default {
  components: {
    mavonEditor,
    ArticleEdit
  },
  data () {
    return {
      id: '',
      article: {},
      category: '',
      tags: [],
      author: [],
      body: '',
      height: null,
      imgSytle: {}
    }
  },
  filters: {
    formatDate: function (val) {
      return moment(val).format('YYYY年MM月DD日')
    }
  },
  created () {
    this.getArticleId()
    this.getArticle()
    // 在页面刷新时将文章id保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('id', JSON.stringify(this.id))
    })
  },
  updated () {
    if (this.height == null) {
      this.setStyle()
    }
  },
  methods: {
    // 设置样式
    setStyle () {
      this.height = window.getComputedStyle(this.$refs.profile).height
      this.imgSytle = {
        height: this.height
      }
    },
    // 接收参数
    getArticleId () {
      this.id = this.$route.params.id
      if (!this.id) {
        this.id = parseInt(sessionStorage.getItem('id'))
        sessionStorage.clear()
      }
    },
    // 获取文章
    getArticle () {
      this.axios
        .get(cons.apis + 'api/articles/' + this.id + '/', {
          responseType: 'json'
        })
        .then(response => {
          let res = response.data
          this.article = res
          this.body = '# ' + res.title + '\n\n' + res.body
          this.author = res.author
          this.category = res.category
          this.tags = res.tags
        })
        .catch(() => { alert('获取数据失败！') })
    }
  }
}
</script>

<style scoped>
.main_wrap {
  overflow-y: auto;
}
.title {
  margin: 2% 20% 0 20%;
  height: 15%;
  background: #fbfbfb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.title .avatar {
  float: left;
  margin-top: 5%;
  margin-left: 1.65em;
  /* background: greenyellow; */
}
.title .profile {
  float: left;
  margin: 5% 0 0 2%;
  /* background: lightcyan; */
}
.title .profile .username {
  font-weight: bold;
  margin-bottom: 2%;
  cursor: pointer;
}
.title .profile .info {
  font-size: 14px;
  font-weight: 100;
  letter-spacing: 1px;
}
.title .avatar img {
  cursor: pointer;
  background: #e4e2e2;
  border-radius: 50%;
  opacity: 0.9;
  filter: alpha=(opacity(100));
}
.article {
  height: 100%;
}
.main_wrap .article .md {
  margin: 0 20% 2% 20%;
}
</style>
