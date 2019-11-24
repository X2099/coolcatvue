<template>
  <div class="main_wrap">
    <div class="title">
      <div :style="imgSytle"
           class="avatar">
        <img :style="imgSytle"
             src="static/images/author.png" />
      </div>
      <div class="profile"
           ref="profile">
        <p class="username">王国强</p>
        <p class="details">查看详细资料</p>
      </div>
    </div>
  </div>
</template>
<script>
import cons from '@/components/constent'
// let { uid, token } = localStorage

export default {
  components: {
  },
  data () {
    return {
      // username: '王国强',
    }
  },
  mounted () {

  },
  // filters: {
  //   formatDate: function (val) {
  //     return moment(val).format('YYYY年MM月DD日')
  //   }
  // },
  updated () {
    if (this.height == null) {
      this.setStyle()
    }
  },
  methods: {
    // 设置样式
    setStyle () {
      this.height = window.getComputedStyle(this.$refs.profile).height
      this.imgSytle = {
        'height': this.height
      }
    },
    // 获取用户资料
    getProfile () {
      this.axios.get(cons.apis + 'api/articles/' + this.id + '/', {
        responseType: 'json'
      })
        .then(response => {
          let res = response.data
          this.article = res
          this.body = '# ' + res.title + '\n\n' + res.body
          this.author = res.author
          this.category = res.category
          this.tags = res.tags
        })
        .catch(() => { alert('获取数据失败！') })
    }
  }
}
</script>

<style scoped>
.main_wrap {
  overflow-y: auto;
}
.title {
  margin: 2% 20% 0 20%;
  height: 25%;

  background: url("https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png");
  background: #f2f6fc;
}
.title .avatar {
  float: left;
  margin-top: 5%;
  margin-left: 1.65em;
}
.title .profile {
  float: left;
  margin: 5% 0 0 2%;
}
.title .profile .username {
  font-weight: bold;
  margin-bottom: 10%;
  font-size: 30px;
  cursor: pointer;
}
.title .profile .details {
  margin-top: 15%;
}
.title .profile .info {
  font-size: 14px;
  font-weight: 100;
  letter-spacing: 1px;
}
.title .avatar img {
  cursor: pointer;
  background: #e4e2e2;
  border-radius: 5%;
  opacity: 0.9;
  filter: alpha=(opacity(100));
}
.article {
  overflow-y: auto;
  clear: both;
}
.main_wrap .article .md {
  margin: 0 20% 2% 20%;
}
</style>
