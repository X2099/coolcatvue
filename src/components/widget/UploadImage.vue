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
    watch: {
        'cover_url':function(new_val, old_val){
            if(old_val==''&&new_val!=''){
                alert("change");
                this.setHeight();
            }        
        }
    },
    methods: {
        addFile(){
            document.getElementById("hiddenFile").click();
        },
        uploadFile(){
            let file = this.$refs.image.files[0];
            alert(file.getWidth);
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
                this.cover_url = response.data.cover_url;
                this.setHeight();
            })
            .catch(error=>{
                this.error_list.push("上传图片失败");
                this.clearErrmsg();
            })
        },
        setHeight(){
            let height = this.$refs.cover.offsetHeight;
            alert(height);
            this.heightStyle = {
                'height': '400px',
            }
            // if(this.cover_url!=""){
            //     // alert(height);
            //     this.heightStyle = {
            //     'height': height + 45 + 'px',
            //     }
            // }else{
            //     this.heightStyle = {
            //         'height': '',
            //     }
            // }
            
        },
    }
}
</script>

<style scoped>
.main_wrap{
    /* position:fixed; */
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
    /* width: 250px; */
    background: #B5B5B5;
    /* margin: 10% 10%; */
    margin: auto 25px;
    width: 250px;
    height: 320px;
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