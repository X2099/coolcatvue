<template>
<div class="main_wrap">
  <div style="clear:both">
      <p><br></p>
  </div>
  <div class="editor_wrap">
    <quill-editor class="editor" v-model="content" :options="editorOption"></quill-editor>
  </div>
  <div class="button">
    <label class="submit" v-if="isSigned" @click="createMsg">留言</label>
    <label v-else><span @click="goLogin">登录</span>后可留言</label>
  </div>
  <MsgShow></MsgShow> 
  <div style="clear:both">
      <p><br></p>
  </div>
</div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
    ["blockquote", "code-block"], // 引用  代码块
    [{ header: 1 }, { header: 2 }], // 1、2 级标题
    [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
    [{ script: "sub" }, { script: "super" }], // 上标/下标
    [{ indent: "-1" }, { indent: "+1" }], // 缩进
    [{ size: ["small", false, "large", "huge"] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    [{ align: [] }], // 对齐方式
    ["clean"], // 清除文本格式
];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import cons from '@/components/constent';
import MsgShow from '@/components/widget/MsgShow';
let token = localStorage.token;
let uid = localStorage.uid;

export default {
  components: {
    quillEditor,
    MsgShow,
  },

  data() {
    return {
      isSigned: false,
      content: '',
      editorOption: {
        theme: "snow",
        placeholder: "想说点什么呢...",
        modules: {
          toolbar: { container: toolbarOptions, }
        }
      },
    };
  },
  mounted() {
    this.isLogin();
  },
  methods: {
    // 判断是否登录
    isLogin(){
      if(token&&uid){
      this.isSigned = true;
      }
    },
    // 去登录
    goLogin() {
      this.$emit('goLogin', true);
    },
    // 创建留言
    createMsg() {
      if(uid&&token){
        let msgForm = new FormData();
        msgForm.append('body', this.content);
        msgForm.append('author', uid);
        this.axios.post(cons.apis + 'api/leavingmsgs/', 
            msgForm,
            {
            headers:{
                'Authorization': 'JWT ' + token
            },
            responseType: 'json'
        })
        .then(response=>{
          this.content = '';
          alert("留言成功");
        })
        .catch(error=>{
          alert("留言失败");
        })
      }
    },
  }
};
</script> 

<style scoped>
.main_wrap {
  overflow-y: auto;
}
.editor_wrap {
  margin: auto 20%;
  padding: 20px 100px 0px 100px;
  background: #ffffff;
}
.main_wrap .button {
  margin: auto 20% 1.5px 20%;
  background: #ffffff;
  font-size: 12px;
  color: grey;
  padding: 10px 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: right;
}
.button label {
  border: 1px solid #ccc;
  padding: 2.5px 10px;
}
.button .submit {
  color: #4f4f4f;
  cursor: pointer;
  letter-spacing: 2.5px;
}
.button span{
  color: #4f4f4f;
  cursor: pointer;
  letter-spacing: 2.5px;
}
.button span:hover{
  color: dodgerblue;
}
.button .submit:hover{
  color: dodgerblue;
}
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.editor_wrap >>> .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}
</style>