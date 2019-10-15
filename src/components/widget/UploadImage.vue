<template>
<div>
    <div class="remove">
        <div id="remove">
            <i class="el-icon-delete-solid"></i>
        </div>
    </div>
    <div class="main_wrap" :style="heightStyle">
        <h1>添加文章封面</h1>
        <img ref="upload_cover" :src="upload_cover_url" v-show="upload_cover_url" />
        <input class="dummy" type="button" value="点击此处添加图片" @click="addFile" v-show="!upload_cover_url" />
        <input id="hiddenFile" type="file" ref="image" style="display:none" @change="uploadFile()" accept="image/gif,image/jpeg,image/jpg,image/png" />
    </div>
</div>
</template>

<script>
import cons from '@/components/constent'
import { clearTimeout } from 'timers';
let token = localStorage.token;
let uid = localStorage.uid;

export default {
    props: ['cover_url'],
    data() {
        return{
            cover_image: null,
            upload_cover_url: '',
            heightStyle : {},
            height: '',
            width: '',
            timer: null,
        }
    },
    mounted() {
        // this.uploadFile();
        // this.setHeight();
    },
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        setHeight(){         
            this.timer = setInterval(()=>{
                console.log("预览图片设置高度");
                let height = sessionStorage.getItem('height');
                let width = sessionStorage.getItem('width');
                this.heightStyle = {
                    'height': 250 * height / width + 70 + 'px',
                    }
                if(height!=undefined||width!=undefined){
                    sessionStorage.clear();
                    clearInterval(this.timer); 
                }
            }, 1);
        },
        uploadFile(){
            let file = this.$refs.image.files[0];
            let files = this.$refs.image.files;
            let imgSrc = URL.createObjectURL(file);
            let img = new Image();
            img.src = imgSrc;
            img.onload = function(){
                sessionStorage.setItem('height', JSON.stringify(img.height));
                sessionStorage.setItem('width', JSON.stringify(img.width));
            }
            this.upload_cover_url = imgSrc;
            this.setHeight();
            this.$emit('getCover', this.upload_cover_url);  
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
    /* background: red; */
    /* width: 5px;
    height: 5px; */
}
#remove i{
    margin: 5px 5px 0 0;
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