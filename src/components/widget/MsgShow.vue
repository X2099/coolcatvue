<template>
    <div class="main_wrap">
        <div class="ql-container ql-snow" style="border: none;">
            <div class="ql-editor" v-html="content"></div>
        </div>
    </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [];

// import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
    props: {
        /*编辑器的内容*/
        value: null
    },
    components: {
        // quillEditor
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
            // content: this.value,
            content: `<p class="ql-indent-1"><u style="color: rgb(194, 133, 255);">这是我的留言，好好学习，天天向上！</u></p>`,
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
            editor.enable(false); // 在获取焦点的时候禁用
        },
    }
};
</script> 

<style scoped>
.main_wrap {   
    /* background: yellowgreen; */
    background: #ffffff;
    width: 60%;
    margin: 2.5px 20%;
    max-height: 50px;
    border: none;
}
</style>