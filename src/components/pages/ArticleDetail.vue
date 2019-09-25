<template>
<div class="main_wrap">
    <Header></Header>
    <div class="article">
        <mavon-editor class="md"
                    :value="content"
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs = "true" style="box-shadow: none"></mavon-editor>
    </div>
</div>
</template>

<script>
import Header from '@/components/widget/Header'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    components:{
        Header,
        mavonEditor
    },
    data(){
        return {
            content: "```python1233```"
        }
        
    },
}
</script>

<style scoped>
.main_wrap{
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
.main_wrap .article .md{
    /* width: 90%; */
    /* position: absolute; */
    min-height: 1000px;
    margin: 2% 25%;
}
</style>