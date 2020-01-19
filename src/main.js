// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill' // 兼容IE浏览器
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = true
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 捕获401
// // http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token')
//     if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       // console.log(token)
//       config.headers.Authorization = 'JWT ' + token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.clear()
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error) // 返回接口返回的错误对象
  })
