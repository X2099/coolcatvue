<template>
  <div class="main_wrap"
       @click="hideMenu"
       ref="main_wrap">
    <Header :show.sync="usermenu_show"></Header>
    <UserEdit :style="this.heightStyle" />
  </div>
</template>

<script>
import Header from '@/components/widget/Header'
import UserEdit from '@/components/widget/UserEdit'

let { uid, token } = localStorage
export default {
  components: {
    Header,
    UserEdit
  },
  data () {
    return {
      usermenu_show: false,
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
        let elm1 = document.getElementById('user_img')
        let elm2 = document.getElementById('user_menu')
        let outElm1 = !elm1.contains(event.target)
        let outElm2 = !elm2.contains(event.target)
        if (elm1 && elm2) {
          if (outElm1 && outElm2) {
            this.usermenu_show = false
          }
        }
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
  /* background: url("https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png"); */
}
</style>
