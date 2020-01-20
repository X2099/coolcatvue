<template>
  <div class="main_wrap"
       @click="hideMenu">
    <div class="title">
      <input type="text"
             name="title"
             placeholder="此处输入文章标题..."
             autocomplete="off"
             class="input_txt"
             v-model="title">
    </div>
    <div class="sub_menu">
      <div class="button">
        <label id="upload_button"
               :style="has_image?'color:dodgerblue;font-weight:bold':''"
               @click="upload_show=!upload_show">
          <p><i class="el-icon-picture"
               style="font-size:20px"></i></p>
        </label>
      </div>
      <div class="button">
        <label>
          <p>•••</p>
        </label>
      </div>
      <div class="button">
        <label>
          <p id="pub_button"
             @click="menu_show=!menu_show">{{ menu_show?'▴ ':'▾ ' }}发布</p>
        </label>
      </div>
      <div class="user"
           v-if="username">
        <img :src="avatar"
             ref="avatar"
             id="user_img"
             @click="usermenu_show=!usermenu_show" />
      </div>
    </div>
    <div class="body"
         ref="body">
      <mavon-editor placeholder="此处输入正文..."
                    codeStyle="agate"
                    v-model="body"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
                    @change="change"
                    style="height:100%" />
    </div>
    <PubMenu id="pub_menu"
             :article_id='id'
             :title=title
             :body='body'
             :edited_category='category'
             :edited_tags='tags'
             :cover_image='cover_image'
             v-show="menu_show"></PubMenu>
    <UserMenu id="user_menu"
              v-show="usermenu_show"></UserMenu>
    <UploadImage id="upload_menu"
                 :cover_url=cover_url
                 :article_id=id
                 v-show="upload_show"
                 @getCover="getCover"
                 @hasImage="hasImage"
                 @removeCover="removeCover"></UploadImage>
  </div>
</template>

<script>
import PubMenu from '@/components/widget/PubMenu'
import UserMenu from '@/components/widget/UserMenu'
import UploadImage from '@/components/widget/UploadImage'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import cons from '@/components/constent'
// import { error } from 'util'
let token = localStorage.token
let uid = localStorage.uid
export default {
  name: '',
  props: [],
  components: {
    mavonEditor,
    PubMenu,
    UserMenu,
    UploadImage
  },
  mounted () {
    this.setHeight()
    this.getArticle()
    this.getProfile()
    this.setAvatar()
  },
  data () {
    return {
      username: localStorage.username, // 登录用户
      avatar: null, // 用户头像
      id: '', // 文章id
      title: '', // 文章标题
      body: '', // 文章正文
      category: '', // 文章分类
      tags: [], // 文章标签
      has_image: false,
      cover_url: '', // 封面url
      cover_image: '', // 文章封面
      html: '', // ？
      configs: {}, // ？
      usermenu_show: false, // 是否显示用户菜单
      menu_show: false, // 是否显示发布菜单
      upload_show: false // 是否显示添加封面菜单
    }
  },
  methods: {
    // 设置头像宽高
    setAvatar () {
      let avatar = this.$refs.avatar
      let height = avatar.height
      avatar.width = height
    },
    // 上传图片
    getCover (file) {
      this.cover_image = file
    },
    // 设置是否有图片
    hasImage (value) {
      this.has_image = value
    },
    // 删除图片
    removeCover (value) {
      this.cover_url = value
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
          this.avatar = cons.apis + response.data.avatar
        })
        .catch(() => { alert('获取用户资料失败！') })
    },
    // 获取被编辑文章数据
    getArticle () {
      this.id = this.$route.params.id
      if (this.id) {
        this.axios.get(cons.apis + 'api/articles/' + this.id + '/', {
          responseType: 'json'
        }).then(response => {
          this.title = response.data.title
          this.body = response.data.body
          this.category = response.data.category.id
          this.cover_url = response.data.cover_image
          if (this.cover_url !== '' && this.cover_url != null) {
            this.cover_url = cons.apis + this.cover_url
            this.has_image = true
          }
          let tags = response.data.tags
          for (let i = 0; i < tags.length; i++) {
            this.tags.push(tags[i].id)
          };
        }).catch(() => { console.log('获取被编辑文章数据失败！') })
      }
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      let formdata = new FormData()
      formdata.append('image', $file)
      this.axios.post(cons.apis + 'api/articles/upload/', formdata,
        {
          headers: {
            'authorization': 'JWT ' + token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data)
          this.$refs.md.$img2Url(pos, res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    $imgDel (pos) {
      this.axios.delete(cons.apis + 'api/articles/remove/?url=' + pos[0],
        {
          headers: {
            'authorization': 'JWT ' + token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {

        })
        .catch(() => { alert('删除图片失败！') })
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
      // this.test = marked(this.content);
    },
    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
      this.$message.success('提交成功，已打印至控制台！')
    },
    // 点击外部区域隐藏发布菜单和用户菜单
    hideMenu (event) {
      let elm1 = document.getElementById('pub_button')
      let elm2 = document.getElementById('pub_menu')
      let elm3 = document.getElementById('user_img')
      let elm4 = document.getElementById('user_menu')
      let elm5 = document.getElementById('upload_button')
      let elm6 = document.getElementById('upload_menu')
      if (elm1 && elm2) {
        let outElm1 = !elm1.contains(event.target)
        let outElm2 = !elm2.contains(event.target)
        if (outElm1 && outElm2) {
          this.menu_show = false
        }
      }
      if (elm3 && elm4) {
        let outElm3 = !elm3.contains(event.target)
        let outElm4 = !elm4.contains(event.target)
        if (outElm3 && outElm4) {
          this.usermenu_show = false
        }
      }
      if (elm5 && elm6) {
        let outElm5 = !elm5.contains(event.target)
        let outElm6 = !elm6.contains(event.target)
        if (outElm5 && outElm6) {
          this.upload_show = false
        }
      }
    },
    // 动态设置编辑区高度
    setHeight () {
      let ch = document.body.clientHeight || document.documentElement.clientHeight
      let cw = document.body.clientWidth || document.documentElement.clientWidth
      this.$refs.body.style.height = ch * 150 / cw - 5 + 'rem'
    }
  }
}
</script>

<style scoped>
.main_wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.title {
  width: 75%;
  height: 5rem;
  float: left;
  background: #ffffff;
  /* background: teal; */
}
.title .input_txt {
  float: left;
  width: 90%;
  height: 100%;
  margin-left: 2%;
  font-size: 2.4rem;
  line-height: 100%;
  font-weight: bold;
  border: none;
  outline: none;
  /* background: thistle; */
}
.sub_menu {
  float: left;
  width: 25%;
  height: 5rem;
  background: #ffffff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.sub_menu .button {
  display: table;
  overflow: hidden;
  float: left;
  margin-left: 5%;
  width: 20%;
  height: 100%;
  font-size: 1.4rem;
  color: rgb(138, 144, 145);
  text-align: center;
}
.sub_menu .button label {
  vertical-align: middle;
  display: table-cell;
}
.sub_menu .button p {
  cursor: pointer;
}
#pub_button {
  color: dodgerblue;
  font-size: 16px;
}
.sub_menu .user img {
  position: fixed;
  top: 1rem;
  right: 1.1%;
  float: left;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  background: #ccc;
  opacity: 1;
  filter: alpha=(opacity(100));
}
.sub_menu img:hover {
  opacity: 0.8;
  filter: alpha=(opacity(80));
}
.body {
  float: right;
  position: relative;
  z-index: 1;
  width: 100%;
}
</style>
