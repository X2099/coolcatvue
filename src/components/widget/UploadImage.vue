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
let token = localStorage.token;
let uid = localStorage.uid;

export default {
    data() {
        return{
            cover_url: '',
            heightStyle : {},
        }
    },
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        uploadFile(){
            let file = this.$refs.image.files[0];
            let cover_form = new FormData()
	        cover_form.append("cover",file)
            this.axios.post(cons.apis + 'api/articles/upload/',
                cover_form,
                {
                headers:{
                    'authorization': 'JWT ' + token,
                },
                responseType: 'json'
            })
            .then(response=>{
                this.cover_url = cons.apis + 'static/' + response.data.cover;
                let height = response.data.height;
                let width = response.data.width;
                this.heightStyle = {
                    'height': 250 * height / width + 70 + 'px',
                }
            })
            .catch(error=>{
                this.error_list.push("上传图片失败");
                this.clearErrmsg();
            })
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