<template>
  <div class="main_wrap">
    <div class="title">
      <div class="avatar">
        <img src="static/images/author.png" />
      </div>
      <div class="profile">
        <div class="look">
          <p class="username">{{ username }}</p>
          <p class="detail"><span @click="look=!look">{{ look?'∧':'∨' }}</span>查看详细资料</p>
        </div>
        <div class="edit">
          <router-link to='/profile'>编辑个人资料</router-link>
        </div>
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
      username: '',
      look: false
    }
  },
  mounted () {
    this.getProfile()
  },
  updated () {

  },
  methods: {
    // 获取用户资料
    getProfile () {
      this.axios.get(cons.apis + 'api/auth/' + uid + '/', {
        headers: {
          'Authorization': 'JWT ' + token
        },
        responseType: 'json'
      })
        .then(response => {
          this.username = response.data.username
        })
        .catch(() => { alert('获取用户资料失败！') })
    }
  }
}
</script>

<style  scoped>
.main_wrap {
  overflow-y: auto;
}
.title {
  margin: 2% 20% 0 20%;
  padding: 2%;
  background: #ffffff;
  font-size: 0; /* 消除div之间的间隙 */
  /* background: url("https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png"); */
}
.title .avatar {
  width: 10%;
  display: inline-block;
  vertical-align: bottom;
}
.avatar img {
  width: 100%;
  background: #c0c4cc;
  border-radius: 5px;
}
.title .profile {
  width: 80%;
  display: inline-block;
  font-size: 14px;
}
.profile .look {
  width: 80%;
  padding-left: 20px;
  display: inline-block;
}
.profile .look .username {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: solid;
}
.profile .look .detail {
  color: #909399;
  cursor: pointer;
}
.profile .look .detail span {
  margin-right: 10px;
}
.profile .edit {
  height: 20%;
  display: inline-block;
  font-size: 14px;
}
.profile .edit .editButton {
  color: dodgerblue;
  border: 1px solid dodgerblue;
  padding: 5px 10px;
  cursor: pointer;
}
.profile .edit a {
  color: dodgerblue;
  border: 1px solid dodgerblue;
  padding: 5px 10px;
  cursor: pointer;
  color: dodgerblue;
  text-decoration: none;
}
</style>
