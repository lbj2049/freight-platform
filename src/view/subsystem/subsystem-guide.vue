<style lang="less">
  @import 'subsystem-guide.less';
</style>

<template>
  <div>
    <Row :gutter="20">
      <Col :xs="6" v-for="(item, i) in subsystemData" :key="`infor-${i}`" :offset="`${ i===0 ? 0 : 0}`" style="padding-bottom: 10px;">
        <guide-card shadow :color="item.color" :icon="item.icon" :img="item.img" v-on:click.native="doRedirect(item)">
          <p>{{ item.title }}</p>
        </guide-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import {
  isSubsystem
} from '@/api/student.data'
import GuideCard from '_c/guide-card'
export default {
  name: 'SubsystemGuide',
  components: {
    GuideCard
  },
  data () {
    return {
      gray: '#D3D3D3',
      subsystemMap: {},
      subsystemData: [
        { type: 'ec', title: '电子商务系统', icon: 'ios-cart-outline', url: '/business/home', color: '#2d8cf0', img: 'ec' },
        { type: 'freight', title: '货运站系统', icon: 'ios-compass-outline', url: '/freight/home', color: '#19be6b', img: 'freight' },
        { type: 'container', title: '集装箱系统', icon: 'ios-cube-outline', url: '/box/home', color: '#ff9900', img: 'container' },
        { type: 'bill', title: '制票系统', icon: 'ios-paper-outline', url: '/ticket/home', color: '#ed3f14', img: 'bill' }
      ]
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getExperimentId () {
      return this.$store.state.user.experimentId
    }
  },
  mounted: function () {
    this.getSubsystem()
  },
  methods: {
    getSubsystem () {
      const UUID = this.getUserId
      let params = { UUID }
      isSubsystem(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.subsystemMap = data
          this.subsystemData.forEach((item, i) => {
            if (this.subsystemMap[ item.type ] !== 1) {
              item.color = this.gray
            }
          })
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doRedirect (item) {
      const installed = this.subsystemMap[ item.type ] === 1

      if (item.type === 'container') {
        this.$Notice.warning({
          title: '[' + item.title + '] 开发中，期待下一个版本'
        })
      } else {
        if (!installed) {
          this.$Notice.warning({
            title: '[' + item.title + '] 暂未安装'
          })
        } else {
          this.$router.push({
            name: item.url
          })
        }
      }
    }
  }
}
</script>

<style>

</style>
