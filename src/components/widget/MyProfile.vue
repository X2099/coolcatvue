<template>
  <div class="main_wrap">
    <div class="background"></div>
    <div class="profile">
      <div class="avatar">
        <img ref="avatar"
             :src="avatar" />
      </div>
      <div class="look">
        <p class="username">{{ username }}</p>
        <p class="detail"
           @click="look=!look"><span>{{ look?'∧':'∨' }}</span>查看详细资料</p>
      </div>
      <div class="edit">
        <router-link to='/profile'>编辑个人资料</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import cons from '@/components/constent'
let { uid, token } = localStorage

export default {
  components: {
  },
  data () {
    return {
      avatar: null,
      username: '',
      look: false
    }
  },
  mounted () {
    this.getProfile()
    this.setAvatar()
  },
  updated () {

  },
  methods: {
    // 设置头像宽高
    setAvatar () {
      let avatar = this.$refs.avatar
      let height = avatar.height
      avatar.width = height
    },
    // 获取用户资料
    getProfile () {
      this.axios.get(cons.apis + 'api/auth/' + uid + '/', {
        headers: {
          'Authorization': 'JWT ' + token
        },
        responseType: 'json'
      })
        .then(response => {
          let profile = response.data
          this.username = profile.username
          this.avatar = cons.apis + profile.avatar
        })
        .catch(() => { alert('获取用户资料失败！') })
    }
  }
}
</script>

<style  scoped>
.main_wrap {
  overflow-y: auto;
  margin-top: 10px;
}
.background {
  height: 15%;
  margin: auto 20%;
  display: block;
  background: #c0c4cc;
}
.profile {
  height: 15%;
  margin: auto 20%;
  padding: auto 2%;
  background: #ffffff;
  font-size: 0; /* 消除div之间的间隙 */
}
.profile .avatar {
  height: 15%;
  top: 7.5%;
  left: 22%;
  position: absolute;
  display: inline-block;
  vertical-align: bottom;
}
.avatar img {
  height: 100%;
  border-radius: 5px;
  border: 5px solid #ffffff;
}
.look {
  width: 45%;
  margin-left: 15%;
  display: inline-block;
}
.look .username {
  padding: 1% 0 0 5%;
  font-size: 30px;
  font-weight: solid;
}
.look .detail {
  height: 30px;
  line-height: 30px;
  padding-left: 5%;
  font-size: 12px;
  color: #909399;
  cursor: pointer;
}
.look .detail span {
  margin-right: 10px;
}
.edit {
  width: 40%;
  display: inline-block;
  text-align: right;
}
.edit a {
  margin-right: 10%;
  padding: 5px 10px;
  color: dodgerblue;
  border: 1px solid dodgerblue;
  font-size: 14px;
  cursor: pointer;
  color: dodgerblue;
  text-decoration: none;
}
</style>
