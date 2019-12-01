<template>
  <div class="main_wrap">
    <div class="ql-container ql-snow"
         v-for="(msg,index) in msgs"
         :key="index">
      <div class="avatar">
        <img :src="cons.apis + msg.author_info.avatar" />
        <div class="profile">
          <label>{{ msg.author_info.name }}&nbsp;</label>
          <label>{{ msg.create_time | FromNow }}</label>
        </div>
      </div>
      <div class="ql-editor"
           v-html="msg.body"></div>
    </div>
  </div>
</template>

<script>
import cons from '@/components/constent'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  props: {
    /* 编辑器的内容 */
    value: null
  },
  watch: {
    value (val) {
      this.content = val
    }
  },
  data () {
    return {
      content: '',
      msgs: [],
      cons
    }
  },
  filters: {
    FromNow: function (val) {
      // return moment(val).format("YYYY年MM月DD日 A h:mm:ss");
      return moment(val).fromNow()
    }
  },
  mounted () {
    this.getLeavingMsgs()
  },
  methods: {
    getLeavingMsgs () {
      this.axios.get(cons.apis + 'api/leavingmsgs/')
        .then(response => {
          this.msgs = response.data
        })
        .catch(() => {
          alert('获取留言失败')
        })
    }
  }
}
</script>

<style scoped>
.main_wrap {
  background: #ffffff;
  width: 60%;
  margin: auto 20%;
}
.main_wrap >>> .ql-container {
  background: #ffffff;
  margin: 20px 100px;
  border: none;
  /* border: 1px solid #ccc; */
}
.main_wrap .avatar {
  /* background: yellowgreen; */
  height: 35px;
}
.main_wrap .avatar img {
  height: 35px;
  width: 35px;
  background: #e4e2e2;
  border-radius: 50%;
  float: left;
  margin: auto 10px;
}
.main_wrap .avatar .profile {
  height: 30px;
  line-height: 30px;
  float: left;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .main_wrap >>> .ql-container {
    margin: 2rem 0;
  }
}
</style>
