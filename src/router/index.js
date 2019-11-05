import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import ArticleEdit from '@/components/pages/ArticleEdit'
import Article from '@/components/pages/Article'
import MyArticles from '@/components/pages/MyArticles'
import Drafts from '@/components/pages/Drafts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit',
      name: 'ArticleEdit',
      component: ArticleEdit
    },
    {
      path: '/articles',
      name: 'MyArticles',
      component: MyArticles
    },
    {
      path: '/detail',
      name: 'Article',
      component: Article
    },
    {
      path: '/drafts',
      name: 'Drafts',
      component: Drafts
    }
  ]
})
