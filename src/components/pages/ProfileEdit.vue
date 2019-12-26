<template>
  <div class="main_wrap" @click="hideMenu" ref="main_wrap">
    <Header :show.sync="usermenu_show"></Header>
    <UserEdit />
  </div>
</template>

<script>
import Header from '@/components/widget/Header';
import UserEdit from '@/components/widget/UserEdit';

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
    }
  }
}
</script>

<style scoped></style>
