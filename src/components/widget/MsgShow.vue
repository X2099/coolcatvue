 <template>
    <div class="editor_wrap">
      <quill-editor
        class="editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @focus="onEditorFocus($event)"
      ></quill-editor>
   </div>
 </template>
 
 <script>
 // 工具栏配置
 const toolbarOptions = [];
 
 import { quillEditor } from "vue-quill-editor";
 import "quill/dist/quill.core.css";
 import "quill/dist/quill.snow.css";
 import "quill/dist/quill.bubble.css";
 
export default {
    props: {
    /*编辑器的内容*/
    value: null
    },
components: {
     quillEditor
},
   watch: {
     value(val) {
       this.content = '<p>这是展示的内容</p>';
     }
   },
   computed: {
     editor() {
       return this.$refs.myQuillEditor.quill;
     }
   },
   data() {
    return {
       content: this.value,
       editorOption: {
        theme: "bubble", // or 'bubble'
        placeholder: "您想说点什么？",
         modules: {
           toolbar: {
             container: toolbarOptions,
             handlers: {}
           }
         }
       }
     };
   },
   methods: {
     onEditorFocus(editor) {
       // 富文本获得焦点时的事件
       editor.enable(false); // 在获取焦点的时候禁用
     }
   }
 };
 </script> 
 
 <style scoped>
 .editor_wrap /deep/ .editor img {
   max-width: 720px;
  margin:10px;
  background: forestgreen;
   }
 .editor_wrap /deep/ .editor .ql-bubble .ql-editor a {
  color: #136ec2;
  background: forestgreen;
}
 </style>