<template>
    <div class="main_wrap">
        <h1>添加文章封面</h1>
        <!-- <input type="file" class="input_image" value="上传" accept="image/gif,image/jpeg,image/jpg,image/png"> -->
        <input class="aload" type='button' value='上传附件' @click="openfile" />
        <input id='showFileName' type='text' readonly style="border: none;"/>
        <input id='hiddenFile' type='file' style="display:none" @change="getName" />
    </div>
</template>

<script>
export default {
    methods: {
        openfile(){
            document.getElementById("hiddenFile").click();
        },
        getName(){
            alert("change");
            let name = document.getElementById("hiddenFile").value.split("\\");
            // alert(name);
            document.getElementById('showFileName').value = name[name.length - 1];
            // alert(name);
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
    width: 600px;
    height: 300px;
    background: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.input_image{
    width: 300px;
    height: 200px;
    background: yellowgreen;
}
.aload{
    width: 500px;
    height: 200px;
    line-height: 200px;
}
</style>