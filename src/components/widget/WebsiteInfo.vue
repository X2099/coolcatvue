<template>
  <div class="main_wrap">
    <hr />
    <div class="info">
      <span>
        <a href="https://tsm.miit.gov.cn/dxxzsp/">京ICP备19020719号</a>&emsp;联系作者：moonpython@163.com
      </span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.main_wrap {
  margin: 0 30rem;
  text-align: center;
}
.main_wrap hr {
  background-color: #c0c0c0;
  height: 0.1rem;
  border: 0 solid darkgrey;
}
.main_wrap .info {
  margin: 1rem auto;
  color: #4f4f4f;
}
.info a {
  text-decoration: none;
  color: #4f4f4f;
}
@media screen and (max-width: 700px) {
  .main_wrap {
    margin: 0;
  }
}
</style>
