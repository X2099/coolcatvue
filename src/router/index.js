import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import ArticleEdit from '@/components/pages/ArticleEdit'
import Article from '@/components/pages/Article'
import MyArticles from '@/components/pages/MyArticles'
import Drafts from '@/components/pages/Drafts'
import Message from '@/components/pages/Message'
import Home from '@/components/pages/Home'
import ProfileEdit from '@/components/pages/ProfileEdit'

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
      path: '/home',
      name: 'home',
      component: Home
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
    },
    {
      path: '/leavingmsg',
      name: 'Message',
      component: Message
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    }
  ]
})
