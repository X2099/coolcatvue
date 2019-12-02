<template>
  <div class="main_wrap"
       @click="hideMenu"
       ref="main_wrap">
    <Header :show.sync="showSwitch"></Header>
    <ArticleList></ArticleList>
  </div>
</template>

<script>
import Header from '@/components/widget/Header'
import ArticleList from '@/components/widget/ArticleList'
let { uid, token } = localStorage
export default {
  components: {
    Header,
    ArticleList
  },
  data () {
    return {
      showSwitch: { usermenuShow: false, listShow: false },
      heightStyle: {}
    }
  },
  mounted () {
    this.setHeight()
  },
  methods: {
    // 隐藏用户菜单
    hideMenu (event) {
      if (uid && token) {
        let elm1 = document.getElementById('userImg')
        let elm2 = document.getElementById('userMenu')
        let outElm1 = !elm1.contains(event.target)
        let outElm2 = !elm2.contains(event.target)
        if (elm1 && elm2 && outElm1 && outElm2) {
          this.showSwitch.usermenuShow = false
        }
      }
      let elm3 = document.getElementById('smallButton')
      let elm4 = document.getElementById('smallList')
      let outElm3 = !elm3.contains(event.target)
      let outElm4 = !elm4.contains(event.target)
      if (elm3 && elm4 && outElm3 && outElm4) {
        this.showSwitch.listShow = false
      }
    },
    // 设置页面高度
    setHeight () {
      let height = this.$refs.main_wrap.offsetHeight
      this.heightStyle = {
        'height': height - 45 + 'px'
      }
    }
  }
}
</script>

<style scoped>
.main_wrap {
  overflow-y: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
