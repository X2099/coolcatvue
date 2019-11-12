<template>
<div class="main_wrap">
    <h1>发布文章</h1>
    <div class="category">
        <h2>分类</h2>
        <div class="empty" v-if="category_list.length<=0">
            <p>您还未添加任何分类!</p>
        </div>
        <div v-else class="nonempty">
            <div v-for="(cat,index) in category_list" :key="index">
                <label :style="category==cat.id?'color:dodgerblue':''" class="parent">
                <input type="radio" v-model="category" :value="cat.id" style="visibility:hidden;width:0">{{ cat.name }}
                </label>
                <label v-for="(sub_cat,index) in cat.subs" :key="index" :style="category==sub_cat.id?'color:dodgerblue':''" class="sub">
                <input type="radio" v-model="category" :value="sub_cat.id" style="visibility:hidden;width:0">{{ sub_cat.name }}
                </label>
            </div>
        </div>
        <!-- 去除以上浮动 -->
        <div style="clear: both;"></div>
        <div class="add_category">
            <select v-model="parent" :style="parent?'color:dodgerblue':''">
                <option seleted ="seleted" value=''>所属分类</option>
                <option :value="cat.id" v-for="(cat,index) in category_list" :key="index">{{ cat.name }}</option>
            </select>
            <input type="text" placeholder="添加1个分类..." autocomplete="off" class="add_input" v-model="cat">
            <input type="submit" value="☑" class="add_submit" @click="addCategory">
        </div>
    </div>
    <div class="tag">
        <h2>标签</h2>
        <div class="empty" v-if="tag_list.length<=0">
            <p>您还未添加任何标签!</p>
        </div>
        <div v-else>
            <div v-for="(tag,index) in tag_list" :key="index" >
            <label :style="tags.indexOf(tag.id)>=0?'color:dodgerblue':''">
            <input type="checkbox" v-model="tags" :value="tag.id" style="visibility:hidden;width:0">
            {{ tag.name }}
            </label>
            </div>
        </div>
        <div class="add_tag">
            <input type="text" placeholder="添加1个标签..." autocomplete="off" class="add_input" v-model="tag">
            <input type="submit" value="☑" class="add_submit" @click="addTag">
        </div>
    </div>
    <div class="submit">
        <button class="draft" @click="status='d';createArticle()">保存为草稿</button>
        <button @click="createArticle">确认并发布</button>
    </div>

    <div class="error">
        <p v-for="(errmsg,index) in error_list" :key="index">{{ errmsg }}</p>
    </div>
</div>
</template>

<script>
import cons from '@/components/constent'
let token = localStorage.token
let uid = localStorage.uid

export default {
  name: '',
  props: ['article_id', 'title', 'body', 'edited_category', 'edited_tags', 'cover_image'],
  data () {
    return {
      category: '', // 文章分类
      tags: this.edited_tags, // 文章标签
      status: 'p', // 文章类型（p：发布，d：草稿）
      category_list: [], // 分类数据
      tag_list: [], // 标签数据
      parent: '', // 添加分类的父级分类
      cat: '', // 添加分类名称
      tag: '', // 添加标签的名称
      error_list: [], // 错误信息
      timer: null // 清除错误信息定时器
    }
  },
  watch: {
    'edited_category': function (newValue) {
      this.category = newValue
    }
  },
  mounted () {
    this.authenticate()
    this.getTags()
    this.getCategories()
  },
  methods: {
    // 验证是否登录
    authenticate () {
      if (!(uid && token)) {
        alert('请先确认您已登录！')
        this.$router.push({path: '/'})
      }
    },
    // 获取文章分类
    getCategories () {
      if (!token) {
        return
      }
      this.axios.get(cons.apis + 'api/categories/', {
        headers: {
          'Authorization': 'JWT ' + token
        },
        responseType: 'json'
      })
        .then(response => {
          this.category_list = response.data
        })
        .catch(() => {
          this.error_list.push('获取分类数据失败，请刷新重试')
          this.clearErrmsg()
        })
    },
    // 获取文章标签
    getTags () {
      if (!token) {
        return
      }
      this.axios.get(cons.apis + 'api/tags/', {
        headers: {
          'Authorization': 'JWT ' + token
        },
        responseType: 'json'
      })
        .then(response => {
          this.tag_list = response.data
        })
        .catch(() => {
          this.error_list.push('获取标签数据失败，请刷新重试')
          this.clearErrmsg()
        })
    },

    // 创建分类
    addCategory () {
      if (this.cat === '') {
        return
      }
      if (this.cat.length > 40) {
        this.error_list.push('分类名称最大长度为40个字符，请重新输入')
        this.clearErrmsg()
        return
      }
      let categoryForm = {
        name: this.cat,
        owner: uid
      }
      if (this.parent !== '') {
        categoryForm.parent = this.parent
      }
      this.axios.post(cons.apis + 'api/categories/',
        categoryForm,
        {
          headers: {
            'authorization': 'JWT ' + token
          },
          responseType: 'json'
        })
        .then(response => {
          this.cat = ''
          this.parent = ''
          this.getCategories()
        })
        .catch(() => {
          this.error_list.push('添加分类失败')
          this.clearErrmsg()
        })
    },
    // 创建标签
    addTag () {
      if (this.tag === '') {
        return
      }
      if (this.tag.length > 40) {
        this.error_list.push('标签名称最大长度为40个字符，请重新输入')
        this.clearErrmsg()
        return
      }
      let tagForm = {
        name: this.tag,
        owner: uid
      }
      this.axios.post(cons.apis + 'api/tags/',
        tagForm,
        {
          headers: {
            'authorization': 'JWT ' + token
          },
          responseType: 'json'
        })
        .then(response => {
          this.tag = ''
          this.getTags()
        })
        .catch(() => {
          this.error_list.push('添加标签失败')
          this.clearErrmsg()
        })
    },
    // 创建文章
    createArticle () {
      if (this.title === '') {
        this.error_list.push('文章标题不能为空')
        this.clearErrmsg()
        return
      }
      if (this.body === '') {
        this.error_list.push('文章内容不能为空')
        this.clearErrmsg()
        return
      }
      if (this.category === '') {
        this.error_list.push('必须选择一个分类')
        this.clearErrmsg()
        return
      }
      let articleForm = new FormData()
      articleForm.append('title', this.title)
      articleForm.append('body', this.body)
      articleForm.append('category', this.category)
      for (let i = 0; i < this.tags.length; i++) {
        articleForm.append('tags', this.tags[i])
      }
      articleForm.append('author', uid)
      articleForm.append('status', this.status)
      articleForm.append('cover_image', this.cover_image)
      if (this.article_id) {
        this.axios.put(cons.apis + 'api/articles/' + this.article_id + '/',
          articleForm,
          {
            headers: {
              'authorization': 'JWT ' + token,
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
          })
          .then(response => {
            if (this.status === 'p') {
              this.$router.push({path: '/articles'})
            } else {
              this.$router.push({path: '/drafts'})
            }
          })
          .catch(() => {
            this.error_list.push('修改文章失败')
            this.clearErrmsg()
          })
      } else {
        this.axios.post(cons.apis + 'api/articles/',
          articleForm,
          {
            headers: {
              'authorization': 'JWT ' + token
            },
            responseType: 'json'
          })
          .then(response => {
            if (this.status === 'p') {
              this.$router.push({path: '/articles'})
            } else {
              this.$router.push({path: '/drafts'})
            }
          })
          .catch(() => {
            this.clearErrmsg()
          })
      }
    },
    // 实时清理错误信息
    clearErrmsg () {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.error_list.shift()
          console.log('定时删除错误信息...')
          if (this.error_list.length <= 0) {
            // 清除定时器
            clearInterval(this.timer)
          }
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.main_wrap{
  z-index: 2;
  top: 6%;
  right: 6.25%;
  width: 300px;
  height: 550px;
  color: slategray;
  background: #fbfbfb;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
h1{
  margin: 6% auto auto 10%;
  font-size: 18px;
}
.category, .tag{
  clear: both;
  margin: 5% 10% auto 10%;
  font-size: 13px;
}
h2{
  margin: 2.5% auto;
  font-size: 16px;
  font-weight: 500;
}
.empty{
  margin: 5% auto;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
color: rgb(173, 171, 171);
font-size: 12px;
}
.add_category, .add_tag{
  width: 100%;
}
.add_category select{
  margin-bottom: 1%;
  outline: none;
  font-size: 12px;
  font-family: 'simsun';
  height: 22px;
  color: slategray;
}
.add_category option{
  color: slategray;
}
.add_input{
  width: 90%;
  font-size: 12px;
  padding-bottom: 2%;
  border: none;
  outline: none;
  color: slategray;
  background: #fbfbfb;
  border-bottom: 1px solid slategray;
}
.add_submit{
  font-size: 14px;
  border: none;
  outline: none;
  color: dodgerblue;
  background: #fbfbfb;
  cursor: pointer;
}
.nonempty{
  margin-bottom: 3%;
  float: left;
}
.category .parent{
  float: left;
  margin-right: 5%;
  margin-bottom: 1%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.category .sub{
  float: left;
  margin-right: 5%;
  margin-bottom: 1%;
  font-size: 12px;
  cursor: pointer;
}
.category .parent:hover{
  color: dodgerblue;
}
.category .sub:hover{
  color: dodgerblue;
}
.tag label{
  font-size: 12px;
  min-width: 26%;
  float: left;
  margin: auto 5% 1% auto;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgb(202, 195, 195);
}
.tag label:hover{
  color: dodgerblue;
}
.submit{
  margin: 6% 10% 8% 10%;
  font-size: 16px;
  text-align: center;
}
.submit button{
  text-align: center;
  padding: 1% 8%;
  color: dodgerblue;
  font-size: 14px;
  background: none;
  border: 1px solid dodgerblue;
  outline: none;
  cursor: pointer;
}
.submit .draft{
  color: LightGray;
  border: 1px solid LightGray;
  padding: 1% 8%;
}
.submit .draft:hover{
  color: Grey;
  border: 1px solid Grey;
}
.error{
  z-index: 3;
  top: 0%;
  right: 0%;
  width: 50%;
  position: absolute;
}
.error p{
  margin: 5%;
  padding: 2.5% 5%;
  font-size:12px;
  color:#f00;
  border: 0.5px solid red;
  background: LavenderBlush;
}
</style>
