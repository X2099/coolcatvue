<template>
    <div class="editor_wrap">
        <div style="clear:both">
        <p><br></p>
        </div>
        <quill-editor
            class="editor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @focus="onEditorFocus($event)">
        </quill-editor>
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
          this.content = val;
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
                theme: "bubble", 
                placeholder: "",
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
        },
        // onEditorReady(editor) { // 准备编辑器
        //     editor.enable(false);
        // },
        // onEditorBlur(){
        //     editor.enable(false);
        // }, // 失去焦点事件
        // // onEditorFocus(){}, // 获得焦点事件
        // onEditorChange(){
        //     editor.enable(false);
        // }, // 内容改变事件
    }
};
</script> 

<style scoped>
.editor {
    background: #ffffff;
    width: 60%;
    margin: auto 20%;
}
</style>