<template>
<div>
    <div class="remove" v-if="cover_url||preview_url">
        <div id="remove">
            <i class="el-icon-delete-solid" @click=removeFile></i>
        </div>
    </div>
    <div class="main_wrap" :style="heightStyle">
        <h1>添加文章封面</h1>
        <img ref="cover" :src="cover_url" v-show="cover_url" />
        <img ref="preview" :src="preview_url" v-show="preview_url" />
        <input class="dummy" type="button" value="点击此处添加图片" @click="addFile" v-show="!cover_url&&!preview_url" />
        <input id="hiddenFile" type="file" ref="image" style="display:none" @change="uploadFile()" accept="image/gif,image/jpeg,image/jpg,image/png" />
    </div>
</div>
</template>

<script>
import cons from '@/components/constent'
let token = localStorage.token;
let uid = localStorage.uid;

export default {
    props: ['cover_url', 'article_id'],
    data() {
        return{
            cover_image: null,
            preview_url: null,
            heightStyle : {},
            height: '',
            width: '',
            url: cons.apis,
        }
    },
    mounted() {
        this.showCover();
    },
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        uploadFile(){ 
            let file = this.$refs.image.files[0];
            let imgSrc = URL.createObjectURL(file);
            let img = new Image();
            img.src = imgSrc;
            let timer = setInterval(()=>{
                console.log("预览图片设置高度");
                img.onload = function(){
                sessionStorage.setItem('height', JSON.stringify(img.height));
                sessionStorage.setItem('width', JSON.stringify(img.width));
                }
                let height = sessionStorage.getItem('height');
                let width = sessionStorage.getItem('width');
                if(height!=null&&width!=null){
                    this.heightStyle = {'height': 250 * height / width + 70 + 'px'}
                    sessionStorage.clear();
                    clearInterval(timer); 
                }
            }, 1);
            this.preview_url = imgSrc;
            this.$emit('getCover', file);
            this.$emit('hasImage', true);
        },
        showCover(){
            let i = 0;
            let timer = setInterval(()=>{  
                console.log("封面图片设置高度");
                let img = new Image();
                img.src = this.cover_url;
                let height = sessionStorage.getItem('height');
                let width = sessionStorage.getItem('width');
                if(height==null||width==null){
                    img.onload = function(){
                    sessionStorage.setItem('height', JSON.stringify(img.height));
                    sessionStorage.setItem('width', JSON.stringify(img.width));
                    };
                }
                if(i>=3||height!=null&&width!=null){
                    this.heightStyle = {'height': 250 * height / width + 70 + 'px'};
                    sessionStorage.clear();
                    clearInterval(timer);
                }
                i++;
            }, 500);
        },
        removeFile(){
            this.preview_url = '';
            if(this.article_id&&this.cover_url!=''){
                this.axios.delete(cons.apis + 'api/articles/remove/?article_id=' + this.article_id,
                {
                    headers:{
                    'authorization': 'JWT ' + token,
                    'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'json'
                })
                .then(response=>{
                    this.$emit('removeCover', '');
                })
                .catch(error=>{
                    alert("删除图片失败！");
                    
                });
            }
            this.$emit('getCover', '');
            this.$emit('hasImage', false);
            this.heightStyle = {'height': '160px'};
            this.$refs.image.value = null;
        },
    }
}
</script>

<style scoped>
.main_wrap{
    position: fixed;
    z-index: 2;
    top: 6%;
    right: 21%;
    width: 300px;
    height: 160px;
    background: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.remove{
    position: absolute;
    position: fixed;
    z-index: 3;
    top: 6%;
    right: 21%; 
    /* background: yellowgreen; */
}
#remove{
    margin: 45px 25px 0 0;
}
#remove i{
    margin: 10px 10px 0 0;
    padding: 5px 3px;
    font-size: 18px;
    color: #ffffff;
    border-radius: 3px;
    opacity: 0.7;
    cursor: pointer;
}
#remove i:hover{
    opacity: 1;
}
.main_wrap img{
    width: 250px;
    background: #B5B5B5;
    margin: auto 25px;
}

.main_wrap h1{
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    margin: 10px auto;
    color: DarkGrey;
}
.main_wrap .dummy{
    width: 250px;
    height: 90px;
    margin: auto 25px;
    font-size: 16px;
    color: #B5B5B5;
    border: none;
    outline: medium;
}
</style>