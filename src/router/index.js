import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import ArticleEdit from '@/components/pages/ArticleEdit'
import ArticleDetail from '@/components/pages/ArticleDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/edit',
      name: 'ArticleEdit',
      component: ArticleEdit
    },
    {
      path: '/articles',
      name: 'ArticleDetail',
      component: ArticleDetail
    }
  ]
})
