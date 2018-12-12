<template>
  <div id="BusinessApp">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'BusinessApp'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#BusinessApp {
  .size;
}
</style>
