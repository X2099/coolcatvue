<template>
<div class="main_wrap">
    <h1>添加文章封面</h1>
    <input class="dummy" type="button" value="点击此处添加图片" @click="addFile" />
    <input id="hiddenFile" type="file" ref="image" style="display:none" @change="uploadFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png" />
</div>
</template>

<script>
import cons from '@/components/constent'
let token = localStorage.token;
let uid = localStorage.uid;

export default {
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        uploadFile(data){
            let files = this.$refs.image.files[0];
            let datas = new FormData()
            alert(datas);
	        datas.append("cover",files)
            this.axios.post(cons.apis + 'api/articles/upload/',
                datas,
                {
                headers:{
                    'authorization': 'JWT ' + token,
                },
                responseType: 'json'
            })
            .then(response=>{
                alert(response.data.msg);
            })
            .catch(error=>{
                this.error_list.push("上传图片失败");
                this.clearErrmsg();
            })
        }
    }
}
</script>

<style scoped>
.main_wrap{
    z-index: 2;
    float: left;
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