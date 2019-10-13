<template>
<div class="main_wrap" :style="heightStyle">
    <h1>添加文章封面</h1>
    <img ref="cover" :src="cover_url" v-show="cover_url" />
    <input class="dummy" type="button" value="点击此处添加图片" @click="addFile" v-show="!cover_url" />
    <input id="hiddenFile" type="file" ref="image" style="display:none" @change="uploadFile()" accept="image/gif,image/jpeg,image/jpg,image/png" />
</div>
</template>

<script>
import cons from '@/components/constent'
import { clearTimeout } from 'timers';
let token = localStorage.token;
let uid = localStorage.uid;

export default {
    data() {
        return{
            cover_image: null,
            cover_url: '',
            heightStyle : {},
            height: '',
            width: '',
            timer: null,
        }
    },
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        startTimer(){         
            this.timer = setInterval(()=>{
                this.setHeight();
            }, 0.1);  
        },
        setHeight(){
            let height = null;
            let width = null;
            height = sessionStorage.getItem('height');
            width = sessionStorage.getItem('width');
            this.heightStyle = {
                'height': 250 * height / width + 70 + 'px',
                }
            if(height!=undefined||width!=undefined){
                sessionStorage.clear();
                clearInterval(this.timer); 
            }
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
            this.startTimer();
            this.cover_url = imgSrc;
            this.$emit('getCover', this.cover_url);
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

img{
    width: 250px;
    background: #B5B5B5;
    margin: auto 25px;
}
h1{
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    margin: 10px auto;
    color: DarkGrey;
}
.dummy{
    width: 250px;
    height: 90px;
    margin: auto 25px;
    font-size: 16px;
    color: #B5B5B5;
    border: none;
    outline: medium;
}
</style>