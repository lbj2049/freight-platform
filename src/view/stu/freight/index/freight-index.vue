<style lang="less">
  @import 'subsystem-guide.less';
</style>

<template>
  <div>
    <Row :gutter="20">
      <Col :xs="4" v-for="(item, i) in subsystemData" :key="`infor-${i}`" :offset="`${ i===0 ? 4 : 0}`" style="height: 120px;padding-bottom: 10px;">
        <guide-card shadow :color="item.color" :icon="item.icon" :icon-size="36" v-on:click.native="doRedirect(item.url)">
          <p>{{ item.title }}</p>
        </guide-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import GuideCard from '_c/guide-card'
export default {
  name: 'SubsystemGuide',
  components: {
    GuideCard
  },
  data () {
    return {

      subsystemData: [
        { title: '电子商务系统', icon: 'ios-cart-outline', url: '/business/home', color: '#2d8cf0' },
        { title: '货运站系统', icon: 'ios-compass-outline', url: '/freight/home', color: '#19be6b' },
        { title: '集装箱系统', icon: 'ios-cube-outline', url: '/box/home', color: '#ff9900' },
        { title: '制票系统', icon: 'ios-paper-outline', url: '/ticket/home', color: '#ed3f14' }
      ]
    }
  },
  methods: {
    doRedirect (url) {
      this.$router.push({
        name: url
      })
    }
  }
}
</script>

<style>

</style>
