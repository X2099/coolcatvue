<template>
  <div class="main_wrap">
    <div class="background">
      <!-- <img src="static/images/author.png" /> -->
    </div>
    <div class="body">
      <div class="profile">
        <p class="username">{{ profile.username }} <el-button type="primary"
                     icon="el-icon-edit"></el-button>
        </p>
        <p><label>性别 </label>{{ profile.gender?profile.gender:"未知" }}
          <el-button type="primary"
                     icon="el-icon-edit"></el-button>
        </p>
        <hr />
        <p><label>生日 </label>{{ profile.birthday?profile.birthday:"未知" }}
          <el-button type="primary"
                     icon="el-icon-edit"></el-button>
        </p>
        <hr />
        <p><label>手机 </label>{{ profile.mobile?profile.mobile:"未知" }}
          <el-button type="primary"
                     icon="el-icon-edit"></el-button>
        </p>
        <hr />
        <p><label>邮箱 </label>{{ profile.email?profile.email:"未知" }}
          <el-button type="primary"
                     icon="el-icon-edit"></el-button>
        </p>
        <hr />
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
      profile: [],
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
          this.profile = response.data
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
.body {
  height: 81%;
  margin: auto 20%;
  padding: auto 2%;
  background: #ffffff;
  font-family: "KaiTi";
}
.background {
  height: 15%;
  margin: 1% 20% auto 20%;
  background: url("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg");
  border-bottom: none;
}
.avatar img {
  height: 100%;
  /* width: 100%; */
  background: #c0c4cc;
  border-radius: 5px;
}
.body .profile {
  /* width: 80%; */
  font-size: 14px;
}
.profile .username {
  margin: auto 10%;
  padding-top: 2%;
  font-size: 25px;
  font-weight: bold;
}
.profile p {
  font-size: 15px;
  margin: 4% 10%;
}
.profile p label {
  margin-right: 100px;
  font-weight: 600;
}
.profile hr {
  margin: auto 10%;
  height: 1px;
  border: none;
  border-top: 1px solid #dee0e4;
}
.el-button {
  background: #ffffff;
  color: #e4e7ed;
  border: none;
}
.el-button:hover {
  color: dodgerblue;
}
</style>
