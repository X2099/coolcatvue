<template>
    <div class="main_wrap">
        <Header></Header>
        <div class="edit_article">        
            <div class="title">
                <input type="text" name="title" placeholder="此处输入文章标题..." autocomplete="off" class="input_txt">
            </div>
            <div class="body">           
                <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 700px"/>           
            </div>
            <div class="input_sub">
                <button class="input_sub" @click="submit">保存为草稿</button>|<button class="input_sub" @click="submit">发表</button>
            </div>
        </div>
        
    </div>   
</template>

<script>
    import Header from '@/components/widget/Header'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "",
        props: [],
        components: {
            Header,
            mavonEditor,
        },
        data() {
            return {
                content:'',
                html:'',
                configs: {},
                test: ''
            }
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                let formdata = new FormData();

                this.$upload.post('/上传接口地址', formdata).then(res => {
                    console.log(res.data);
                    this.$refs.md.$img2Url(pos, res.data);
                }).catch(err => {
                    console.log(err)
                })
            },
            // 所有操作都会被解析重新渲染
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
                this.test = marked(this.content);
            },
            // 提交
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('提交成功，已打印至控制台！');
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
.main_wrap{
    overflow-y: scroll;
    position:absolute;
    width:100%;
    height:100%;
    background: #f5f5f5;
}
.edit_article .title{
    width: 98.5%;
    margin-left: 1.5%; 
}
.edit_article .title .input_txt{
    width: 97%;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    font-weight: bold;
    border:none;
    outline:none;
    background: #f5f5f5;
}
.edit_article .input_sub{
display:block;
margin:20px auto 0;
width:298px;
height:32px;
border:0px;
border-radius:4px;
background: rgb(63, 67, 68);
color:#fff;
cursor:pointer;
outline:none;
}
</style>