<template>
  <div class="main_wrap">
    <div class="background">
      <div class="avatar">
        <img ref="avatar"
             :src="avatar" />
        <div class="dummy"
             @click="addFile"><i class="el-icon-camera"></i></div>
        <input id="hiddenFile"
               type="file"
               ref="image"
               style="display:none"
               @change="upload()"
               accept="image/gif,image/jpeg,image/jpg,image/png" />
      </div>
    </div>

    <div class="body">
      <p class="back">
        <router-link to="/home">返回我的主页 <i class="el-icon-arrow-right" /></router-link>
      </p>
      <div class="profile">
        <div class="username">
          <div class="edit"
               v-if="editUsername">
            <label>用户名</label>
            <input type="text"
                   v-model="username"
                   :class="usernameInput ? 'input' : 'outside'"
                   @blur="usernameInput = !usernameInput"
                   @focus="usernameInput = !usernameInput" />
            <span class="save"
                  @click="updateProfile('username', username)">保存</span>
            <span class="cancel"
                  @click="editUsername = false">取消</span>
          </div>
          <div class="show"
               v-else>
            {{ profile.username }}
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editUsername = true"></el-button>
          </div>
        </div>
        <div class="gender">
          <div class="edit"
               v-if="editGender">
            <label>性别</label>
            <!-- <div class="genderEdit"> -->
            <input type="radio"
                   value="0"
                   v-model="gender" /><span class="radio">男</span>
            <input type="radio"
                   value="1"
                   v-model="gender" /><span class="radio">女</span>
            <span class="save"
                  @click="updateProfile('gender', gender)">保存</span>
            <span class="cancel"
                  @click="editGender = false">取消</span>
            <!-- </div> -->
          </div>
          <div class="show"
               v-else>
            <label>性别</label><span>{{
              profile.gender != null
                ? profile.gender == 0
                  ? "男"
                  : "女"
                : "未知"
            }}</span>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editGender = true"></el-button>
          </div>
        </div>
        <hr />
        <div class="birthday">
          <div class="edit"
               v-if="editBirthday">
            <label>生日</label>
            <el-date-picker style="padding:0;width:18rem"
                            v-model="birthday"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
            <span class="save"
                  @click="updateProfile('birthday', birthday)">保存</span>
            <span class="cancel"
                  @click="editBirthday = false">取消</span>
          </div>
          <div v-else>
            <label>生日</label><span>{{ profile.birthday ? profile.birthday : "未知" }}</span>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editBirthday = true"></el-button>
          </div>
        </div>
        <hr />
        <div class="mobile">
          <div class="edit"
               v-if="editMobile">
            <label>手机</label>
            <input type="text"
                   v-model="mobile"
                   :class="mobileInput ? 'input' : 'outside'"
                   @blur="mobileInput = !mobileInput"
                   @focus="mobileInput = !mobileInput" />
            <span class="save"
                  @click="updateProfile('mobile', mobile)">保存</span>
            <span class="cancel"
                  @click="editMobile = false">取消</span>
          </div>
          <div v-else>
            <label>手机</label><span>{{ profile.mobile ? profile.mobile : "未知" }}</span>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editMobile = true"></el-button>
          </div>
        </div>
        <hr />
        <div class="email">
          <div class="edit"
               v-if="editEmail">
            <label>邮箱</label>
            <input type="text"
                   v-model="email"
                   :class="emailInput ? 'input' : 'outside'"
                   @blur="emailInput = !emailInput"
                   @focus="emailInput = !emailInput" />
            <span class="save"
                  @click="updateProfile('email', email)">保存</span>
            <span class="cancel"
                  @click="editEmail = false">取消</span>
          </div>
          <div v-else>
            <label>邮箱</label><span>{{ profile.email ? profile.email : "未知" }}</span>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="editEmail = true"></el-button>
          </div>
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
  components: {},
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
      avatar: null,
      username: '',
      gender: null,
      birthday: null,
      mobile: '',
      email: ''
    }
  },
  mounted () {
    this.getProfile()
    this.setAvatar()
  },
  methods: {
    // 设置头像宽高
    setAvatar () {
      let avatar = this.$refs.avatar
      let width = avatar.width
      avatar.height = width
    },
    // 添加图片
    addFile () {
      document.getElementById('hiddenFile').click()
    },
    // 上传头像
    upload () {
      let file = this.$refs.image.files[0]
      let imgSrc = URL.createObjectURL(file)
      let img = new Image()
      img.src = imgSrc
      let Form = new FormData()
      Form.append('avatar', file)
      this.axios
        .patch(cons.apis + 'api/auth/avatar/', Form, {
          headers: {
            Authorization: 'JWT ' + token
          },
          responseType: 'json'
        })
        .then(response => {
          this.$router.go(0)
        })
        .catch(() => {
          alert('失败')
        })
    },
    // 获取用户资料
    getProfile () {
      this.axios
        .get(cons.apis + 'api/auth/' + uid + '/', {
          headers: {
            Authorization: 'JWT ' + token
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
            profile.birthday = moment(profile.birthday).format(
              'YYYY年MM月DD日'
            )
          }
          this.mobile = profile.mobile
          this.email = profile.email
          this.avatar = cons.apis + profile.avatar
        })
        .catch(error => {
          if (error.response.status === 401) {
            alert('登录状态已经失效，请重新登录！')
            location.reload()
          } else {
            alert('获取用户资料失败！')
          }
        })
    },
    // 更新用户资料
    updateProfile (key, value) {
      if (key === 'birthday') {
        value = moment(value).format('YYYY-MM-DD')
      }
      let Form = new FormData()
      Form.append(key, value)
      this.axios
        .patch(cons.apis + 'api/auth/' + uid + '/', Form, {
          headers: {
            Authorization: 'JWT ' + token
          },
          responseType: 'json'
        })
        .then(response => {
          this.$router.go(0)
        })
        .catch(() => {
          alert('修改失败')
        })
    }
  }
}
</script>

<style scoped>
.main_wrap {
  margin: 1rem auto;
}
.body {
  margin: auto 30rem;
  padding: 0 10rem 10rem 10rem;
  background: #ffffff;
}
.background {
  height: 10rem;
  margin: 0 20%;
  background: url("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg");
  border-bottom: none;
}
.body .back {
  height: 4rem;
  padding: 1rem 0;
  text-align: right;
  font-size: 1.4rem;
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
  margin-left: 10rem;
}
.avatar img {
  width: 12rem;
  height: 12rem;
  margin-top: 3.5rem;
  background: #c0c4cc;
  border-radius: 0.75rem;
  border: 0.5rem solid #ffffff;
  border-bottom: none;
}
.avatar .dummy {
  height: 2rem;
  margin-left: 12.5rem;
}
.profile .username {
  margin: 2rem 0 0 0.5rem;
  font-size: 3rem;
  width: 100%;
}
.profile .gender,
.birthday,
.mobile,
.email {
  margin: auto 0.5rem;
  padding-top: 2rem;
  font-size: 3rem;
}
.profile label {
  width: 15%;
  display: inline-block;
  font-size: 2rem;
  font-weight: 550;
}
.profile span {
  font-size: 2rem;
}
.username .show {
  font-size: 3rem;
  font-weight: 400;
}
.edit {
  margin-bottom: 3%;
  font-size: 1.5rem;
}
.edit .outside {
  height: 3.5rem;
  border-radius: 0.3rem;
  border: 1px solid #dcdfe6;
  text-indent: 1rem;
  outline: none;
}
.edit .input {
  height: 3.5rem;
  border-radius: 0.3rem;
  text-indent: 1rem;
  outline: none;
  border: 1px solid #409eff;
}
.edit .radio {
  margin: auto 5% auto 1rem;
}
.edit .save {
  margin-left: 5%;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background: #409eff;
  color: white;
  border-radius: 0.3rem;
  cursor: pointer;
}
.edit .save:hover {
  background: dodgerblue;
}
.edit .cancel {
  margin-left: 5%;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background: #c0c4cc;
  color: white;
  border-radius: 0.3rem;
  cursor: pointer;
}
.edit .cancel:hover {
  background: #909399;
}
.profile label {
  margin-right: 10rem;
  font-weight: 550;
  font-size: 2rem;
}
.profile hr {
  margin: auto 0.5rem;
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
@media screen and (max-width: 700px) {
  .body {
    margin: auto 0;
    padding: 0 2rem 10rem 2rem;
  }
  .avatar {
    margin-left: 2.5rem;
  }
  .background {
    margin: 0.5% 0 auto 0;
  }
  .profile label {
    margin-right: 2rem;
  }
  .username input {
    width: 15rem;
  }
  .mobile input {
    width: 15rem;
  }
  .email input {
    width: 15rem;
  }
}
</style>
