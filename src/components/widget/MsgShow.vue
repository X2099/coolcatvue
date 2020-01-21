<template>
  <div class="main_wrap">
    <div class="ql-container ql-snow"
         v-for="(msg,index) in msgs"
         :key="index">
      <div class="avatar">
        <img :src="cons.apis + msg.author_info.avatar" />
        <div class="profile">
          <span class="username">{{ msg.author_info.name }}&nbsp;</span>
          <label class="datetime">{{ msg.create_time | FromNow }}</label>
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
  margin: 0 30rem 2rem 30rem;
}
.main_wrap >>> .ql-container {
  background: #ffffff;
  margin: 0 10rem 1rem 10rem;
  border: none;
  /* border: 1px solid #ccc; */
}
.main_wrap .avatar {
  /* background: tomato; */
  height: 30px;
}
.main_wrap .avatar img {
  height: 30px;
  width: 30px;
  background: #e4e2e2;
  border-radius: 50%;
  float: left;
  margin: auto 10px;
}
.main_wrap .avatar .profile {
  height: 30px;
  line-height: 30px;
  display: inline-block;
}
.profile .username {
  color: tan;
  font-size: 1.5rem;
}
.profile .datetime {
  color: gray;
  font-size: 1rem;
}
.avatar .profile label {
  font-size: 1.4rem;
}
.main_wrap .ql-editor {
  font-size: 1.4rem;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    width: 100%;
    margin: 0 0 1.5rem 0;
    padding: 0;
  }
  .main_wrap >>> .ql-container {
    margin: 0;
  }
}
</style>
