
<template>
    <div class="edit_container">
        <!-- <p>想说点什么？</p> -->
        <quill-editor
            class="editor" 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: '',
            editorOption: {
              placeholder: "您想说点什么？",
              modules: {
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ 'header': 1 }, { 'header': 2 }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
                  [{ 'indent': '-1' }, { 'indent': '+1' }],
                  [{ 'direction': 'rtl' }],
                  [{ 'size': ['small', false, 'large', 'huge'] }],
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  // [{ 'font': [] }],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'align': [] }],
                  ['clean'],
                  // ['link', 'image', 'video']
                ],
                history: {
                  delay: 1000,
                  maxStack: 50,
                  userOnly: false
                },
                imageDrop: true,
                imageResize: {
                  displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                  },
                  modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                }
              }
          }
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    }
}
</script>

<style scoped>
.edit_container {
  background: #ffffff;
  width: 60%;
  margin: auto 20%;
}
</style>