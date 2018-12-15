<style lang="less">
  @import './index.less';
</style>

<template>
  <div class="stu-index">
    <Row :gutter="16" class-name="stu-index-content">
      <Col class-name="menu shangwu" span="6">
      <div @click="handleClickShanghu" value="shanghu">电子商务系统</div>
      </Col>
      <Col class-name="menu huoyunzhan" span="6">
      <div @click="handleClickhuoyun" value="huoyun">货运站系统</div>
      </Col>
      <Col class-name="menu jizhuangxiang" span="6">
      <div @click="handleClickjizhuangxiang" value="jizhuangxiang">集装箱系统</div>
      </Col>
      <Col class-name="menu zhipiaoxitong" span="6">
      <div @click="handleClickzhipiao" value="zhipiao">制票系统</div>
      </Col>
    </Row>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  methods: {
    handleClickShanghu (pressed) {
      alert('电子商务系统')
    },
    handleClickhuoyun (pressed) {
      alert('货运站系统')
    },
    handleClickjizhuangxiang (pressed) {
      alert('集装箱系统')
    },
    handleClickzhipiao (pressed) {
      alert('制票系统')
    }
  }
}
</script>

<style>

</style>
