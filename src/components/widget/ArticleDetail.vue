<template>
  <div class="main_wrap"
       v-show="show">
    <div class="title">
      <div class="avatar">
        <img :style="imgSytle"
             :src="cons.apis + author.avatar" />
      </div>
      <div class="profile">
        <p class="username">{{ author.username }}</p>
        <p class="info">{{ article.pub_time | formatDate }} 阅读 {{ article.views }}</p>
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
                    fontSize="24px"
                    style="position:inherit"
                    codeStyle="agate"></mavon-editor>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import cons from '@/components/constent'
export default {
  components: {
    mavonEditor
  },
  data () {
    return {
      id: '',
      article: {},
      category: '',
      tags: [],
      author: [],
      body: '',
      imgSytle: {},
      show: false,
      cons,
      fontSize: '24px'
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
  methods: {
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
      this.axios.get(cons.apis + 'api/articles/' + this.id + '/', {
        responseType: 'json'
      }).then(response => {
        let res = response.data
        this.article = res
        this.body = '# ' + res.title + '\n\n' + res.body
        this.author = res.author
        this.category = res.category
        this.tags = res.tags
        this.show = true
      }).catch(() => { alert('获取数据失败！') })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 2rem 20% 0 20%;
  padding-top: 3rem;
  height: 4.5rem;
  background: #fbfbfb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* background: tan; */
  font-size: 0;
}
.title .avatar {
  height: 4.5rem;
  width: 7.5rem;
  display: inline-block;
  /* background: purple; */
}
.title .profile {
  height: 6rem;
  display: inline-block;
  /* background: teal; */
  vertical-align: top;
}
.title .profile .username {
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1.6rem;
  font-weight: 550;
  margin-bottom: 2%;
  cursor: pointer;
  /* background: yellowgreen; */
}
.title .profile .info {
  height: 2rem;
  line-height: 2rem;
  font-size: 1.3rem;
  font-weight: 100;
  letter-spacing: 1px;
  vertical-align: bottom;
}
.title .avatar img {
  height: 4.5rem;
  width: 4.5rem;
  margin: 0 1rem 0 2rem;
  cursor: pointer;
  background: #e4e2e2;
  border-radius: 50%;
  opacity: 0.9;
  filter: alpha=(opacity(100));
}
.article {
  overflow-y: auto;
  clear: both;
}
.main_wrap .article .md {
  margin: 0 20% 2rem 20%;
  background: #f2f6fc;
}
@media screen and (max-width: 700px) {
  .title {
    margin: 1.5rem 0 0 0;
    padding-top: 2rem;
  }
  .main_wrap .article .md {
    margin: 0 0 1.5rem 0;
    /* font-size: 1.4rem; */
  }
}
</style>
