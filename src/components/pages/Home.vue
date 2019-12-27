<template>
  <div class="main_wrap"
       @click="hideMenu"
       ref="main_wrap">
    <Header :show.sync="usermenuShow"></Header>
    <UserProfile></UserProfile>
    <UserStatus></UserStatus>
  </div>
</template>

<script>
import Header from '@/components/widget/Header'
import UserProfile from '@/components/widget/UserProfile'
import UserStatus from '@/components/widget/UserStatus'

let { uid, token } = localStorage
export default {
  components: {
    Header,
    UserProfile,
    UserStatus
  },
  data () {
    return {
      usermenuShow: false,
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
            this.usermenuShow = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
