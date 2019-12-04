<template>
  <div class="main_wrap">
    <div class="editor_wrap">
      <quill-editor class="editor"
                    v-model="content"
                    :options="editorOption"></quill-editor>
    </div>
    <div class="button">
      <label class="submit"
             v-if="isSigned"
             @click="createMsg">留言</label>
      <div v-else><span @click="goLogin">登录</span>后可留言</div>
    </div>
    <MsgShow></MsgShow>
  </div>
</template>

<script>
// 工具栏配置
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import cons from '@/components/constent'
import MsgShow from '@/components/widget/MsgShow'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ['clean'] // 清除文本格式
]
let token = localStorage.token
let uid = localStorage.uid

export default {
  components: {
    quillEditor,
    MsgShow
  },

  data () {
    return {
      isSigned: false,
      content: '',
      editorOption: {
        theme: 'snow',
        placeholder: '想说点什么呢...',
        modules: {
          toolbar: { container: toolbarOptions }
        }
      }
    }
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    // 判断是否登录
    isLogin () {
      if (token && uid) {
        this.isSigned = true
      }
    },
    // 去登录
    goLogin () {
      this.$emit('goLogin', true)
    },
    // 创建留言
    createMsg () {
      if (this.content !== '' && uid && token) {
        let msgForm = new FormData()
        msgForm.append('body', this.content)
        msgForm.append('author', uid)
        this.axios.post(cons.apis + 'api/leavingmsgs/',
          msgForm,
          {
            headers: {
              'Authorization': 'JWT ' + token
            },
            responseType: 'json'
          })
          .then(response => {
            this.content = ''
            this.$router.go(0)
          })
          .catch(() => {
            alert('留言失败')
          })
      }
    }
  }
}
</script>

<style scoped>
.main_wrap {
  overflow-y: auto;
}
.editor_wrap {
  margin: auto 20%;
  padding: 2rem 10rem 0 10rem;
  background: #ffffff;
  /* font-size: 1.8rem; */
}
.main_wrap .button {
  margin: auto 20%;
  background: #ffffff;
  color: grey;
  padding: 1rem 10rem;
  text-align: right;
}
.button label {
  border: 1px solid #ccc;
  padding: 0.25rem 1rem;
  font-size: 1.4rem;
}
.button .submit {
  color: #4f4f4f;
  cursor: pointer;
  letter-spacing: 0.25rem;
  font-size: 1.4rem;
}
.button span {
  color: #4f4f4f;
  cursor: pointer;
  letter-spacing: 0.25rem;
  font-size: 1.4rem;
}
.button span:hover {
  color: dodgerblue;
}
.button .submit:hover {
  color: dodgerblue;
}
/* .editor_wrap >>> .ql-container {
  font-size: 3.4rem;
} */
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="small"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="large"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="huge"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="1"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="2"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="3"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="4"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="5"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="6"]::before,
.editor_wrap
  >>> .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}
@media screen and (max-width: 700px) {
  .editor_wrap {
    margin: 0;
    padding: 0;
  }
  .main_wrap .button {
    margin: 0;
    padding: 1rem 1rem 0 0;
  }
}
</style>
