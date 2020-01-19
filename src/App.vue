<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.setRem()
  },
  methods: {
    // 设置rem
    setRem () {
      let html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / 150 + 'px'
    }
  }
}
</script>

<style>
html {
  background: #f6f6f6;
}
* {
  margin: 0;
  padding: 0;
}
</style>
