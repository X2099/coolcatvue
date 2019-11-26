<template>
  <div class="main_wrap">
    <div class="background">
      <div class="avatar">
        <img src="static/images/author.png" />
        <i class="el-icon-camera"></i>
      </div>
    </div>

    <div class="body">
      <p class="back">
        <router-link to="/home">返回我的主页 <i class="el-icon-arrow-right" /></router-link>
      </p>
      <div class="profile">
        <div class="username">
          <p class="edit"
             v-if="editUsername"><label>用户名</label>
            <input type="text"
                   v-model="username"
                   :class="usernameInput?'input':'outside'"
                   @blur="usernameInput=!usernameInput"
                   @focus="usernameInput=!usernameInput" />
            <span class="save"
                  @click="updateProfile('username',username)">保存</span>
            <span class="cancel"
                  @click="editUsername=false">取消</span>
          </p>
          <p class="show"
             v-else>{{ profile.username }} <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editUsername=true"></el-button>
          </p>
        </div>
        <div class="gender">
          <p class="edit"
             v-if="editGender"><label>性别</label>
            <input type="radio"
                   value=0
                   v-model="gender" /><span class="radio">男</span>
            <input type="radio"
                   value=1
                   v-model="gender" /><span class="radio">女</span>
            <span class="save"
                  @click="updateProfile('gender',gender)">保存</span>
            <span class="cancel"
                  @click="editGender=false">取消</span>
          </p>
          <p class="show"
             v-else><label>性别</label>{{ profile.gender!=null?(profile.gender==0?'男':'女'):"未知" }}
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editGender=true"></el-button>
          </p>
        </div>
        <hr />
        <div class="birthday">
          <p class="edit"
             v-if="editBirthday"><label>生日</label>
            <el-date-picker v-model="birthday"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
            <span class="save"
                  @click="updateProfile('birthday',birthday)">保存</span>
            <span class="cancel"
                  @click="editBirthday=false">取消</span>
          </p>
          <p v-else><label>生日</label>{{ profile.birthday?profile.birthday:"未知" }}
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editBirthday=true"></el-button>
          </p>
        </div>
        <hr />
        <div class="mobile">
          <p class="edit"
             v-if="editMobile"><label>手机</label>
            <input type="text"
                   v-model="mobile"
                   :class="mobileInput?'input':'outside'"
                   @blur="mobileInput=!mobileInput"
                   @focus="mobileInput=!mobileInput" />
            <span class="save"
                  @click="updateProfile('mobile',mobile)">保存</span>
            <span class="cancel"
                  @click="editMobile=false">取消</span>
          </p>
          <p v-else><label>手机</label>{{ profile.mobile?profile.mobile:"未知" }}
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editMobile=true"></el-button>
          </p>
        </div>
        <hr />
        <div class="email">
          <p class="edit"
             v-if="editEmail"><label>邮箱</label>
            <input type="text"
                   v-model="email"
                   :class="emailInput?'input':'outside'"
                   @blur="emailInput=!emailInput"
                   @focus="emailInput=!emailInput" />
            <span class="save"
                  @click="updateProfile('email',email)">保存</span>
            <span class="cancel"
                  @click="editEmail=false">取消</span>
          </p>
          <p v-else><label>邮箱</label>{{ profile.email?profile.email:"未知" }}
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editEmail=true"></el-button>
          </p>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import cons from '@/components/constent'
let { uid, token } = localStorage

export default {
  components: {
  },
  data () {
    return {
      profile: [],
      look: false,
      editUsername: false,
      editGender: false,
      editBirthday: false,
      editMobile: false,
      editEmail: false,
      usernameInput: false,
      mobileInput: false,
      emailInput: false,
      username: '',
      gender: null,
      birthday: null,
      mobile: '',
      email: ''
    }
  },
  mounted () {
    this.getProfile()
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
          let profile = response.data
          this.profile = profile
          this.username = profile.username
          this.gender = profile.gender
          this.birthday = profile.birthday
          if (profile.birthday) {
            profile.birthday = moment(profile.birthday).format('YYYY年MM月DD日')
          }
          this.mobile = profile.mobile
          this.email = profile.email
        })
        .catch(() => { alert('获取用户资料失败！') })
    },
    // 更新用户资料
    updateProfile (key, value) {
      if (key === 'birthday') {
        value = moment(value).format('YYYY-MM-DD')
      }
      let Form = new FormData()
      Form.append(key, value)
      this.axios.patch(cons.apis + 'api/auth/' + uid + '/', Form, {
        headers: {
          'Authorization': 'JWT ' + token
        },
        responseType: 'json'
      }).then(response => { this.$router.go(0) })
        .catch(() => { alert('修改失败') })
    }
  }

}
</script>

<style  scoped>
.main_wrap {
  overflow-y: auto;
}
.body {
  height: 83%;
  margin: auto 20%;
  padding: auto 2%;
  background: #ffffff;
  /* font-family: "KaiTi"; */
}
.background {
  height: 15%;
  margin: 0.5% 20% auto 20%;
  background: url("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg");
  border-bottom: none;
}
.body .back {
  padding: 15px 10% 0 0;
  text-align: right;
  font-size: 14.5px;
  cursor: pointer;
}
.body .back a {
  color: #909399;
  text-decoration: none;
}
.body .back a:hover {
  color: #606266;
}
.avatar {
  position: absolute;
  top: 8%;
  left: 25.5%;
  height: 15%;
}
.avatar img {
  height: 100%;
  background: #c0c4cc;
  border-radius: 7.5px;
  border: 5px solid #ffffff;
}
.body .profile {
  /* width: 80%; */
  font-size: 14px;
}
.profile .username {
  margin: auto 10%;
  padding-top: 4.5%;
  font-size: 30px;
}
.profile .gender,
.birthday,
.mobile,
.email {
  margin: auto 10%;
  padding-top: 3.5%;
  font-size: 30px;
}
.profile label {
  width: 10%;
  display: inline-block;
}
.username .show {
  font-size: 30px;
  font-weight: 400;
}
.edit {
  margin-bottom: 3%;
}
.edit .outside {
  height: 35px;
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  text-indent: 10px;
  outline: none;
}
.edit .input {
  height: 35px;
  border-radius: 3px;
  text-indent: 10px;
  outline: none;
  border: 1px solid #409eff;
}
.edit .radio {
  margin: auto 5% auto 10px;
}
.edit .save {
  margin-left: 5%;
  padding: 5px 10px;
  background: #409eff;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
.edit .save:hover {
  background: dodgerblue;
}
.edit .cancel {
  margin-left: 5%;
  padding: 5px 10px;
  background: #c0c4cc;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
.edit .cancel:hover {
  background: #909399;
}
.profile p {
  font-size: 15px;
}
.profile p label {
  margin-right: 100px;
  font-weight: 550;
}
.profile hr {
  margin: auto 10%;
  height: 1px;
  border: none;
  border-top: 1px solid #dee0e4;
}
.el-icon-camera,
.el-button {
  background: #ffffff;
  color: #e4e7ed;
  border: none;
}
.el-icon-camera:hover,
.el-button:hover {
  color: dodgerblue;
  background: #ffffff;
}
.el-date-picker {
  height: 25px;
  border-radius: 3px;
  border: 1px solid #909399;
  text-indent: 10px;
  outline: none;
}
</style>
