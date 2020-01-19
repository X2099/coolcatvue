 <template>
  <div class="main_wrap"
       @click="hideMenu"
       ref="main_wrap">
    <Header :show.sync="showSwitch"></Header>
    <ArticleDetail></ArticleDetail>
  </div>
</template>

<script>
import Header from '@/components/widget/Header'
import ArticleDetail from '@/components/widget/ArticleDetail'
let { uid, token } = localStorage

export default {
  components: {
    Header,
    ArticleDetail
  },
  data () {
    return {
      showSwitch: { usermenuShow: false, listShow: false }
    }
  },
  methods: {
    // 隐藏用户菜单
    hideMenu (event) {
      if (uid && token) {
        let elm1 = document.getElementById('userImg')
        let elm2 = document.getElementById('userMenu')
        if (elm1 && elm2) {
          let outElm1 = !elm1.contains(event.target)
          let outElm2 = !elm2.contains(event.target)
          if (elm1 && elm2 && outElm1 && outElm2) {
            this.showSwitch.usermenuShow = false
          }
        }
      }
      let elm3 = document.getElementById('smallButton')
      let elm4 = document.getElementById('smallList')
      if (elm3 && elm4) {
        let outElm3 = !elm3.contains(event.target)
        let outElm4 = !elm4.contains(event.target)
        if (elm3 && elm4 && outElm3 && outElm4) {
          this.showSwitch.listShow = false
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
