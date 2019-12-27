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
  background: yellowgreen;
}
.background {
  height: 10rem;
  margin: 1rem 20% 0 20%;
  display: block;
  background: #c0c4cc;
  background: thistle;
}
.profile {
  margin: auto 20%;
  background: #ffffff;
  font-size: 0; /* 消除div之间的间隙 */
  background: teal;
}
.profile .avatar {
  width: 20%;
  display: inline-block;
  vertical-align: bottom;
  background: purple;
}
.avatar img {
  height: 15rem;
  width: 15rem;
  margin: -8rem 0 0 2rem;
  border-radius: 5px;
  border: 0.5rem solid #ffffff;
}
.look {
  width: 40%;
  display: inline-block;
  background: forestgreen;
}
.look .username {
  padding: 0 0 0 0;
  font-size: 30px;
  font-weight: solid;
  /* background: tan; */
}
.look .detail {
  height: 30px;
  line-height: 30px;
  font-size: 1.2rem;
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
  background: tomato;
}
.edit a {
  padding: 5px 10px;
  color: dodgerblue;
  border: 1px solid dodgerblue;
  font-size: 14px;
  cursor: pointer;
  color: dodgerblue;
  text-decoration: none;
}
@media screen and (max-width: 700px) {
  .background {
    margin: auto 0;
  }
  .profile {
    margin: auto 0;
  }
}
</style>
