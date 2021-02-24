<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">

      <Col span="24" style="text-align: center">
        <h2 style="margin-top: 170px;margin-bottom: 20px;font-size: 28px;color: #91ADDC;" v-show="hasTitle">欢迎使用{{title}} !</h2>
        <!--<img src="../../../assets/images/welcome.png"/>-->
        <img :src="welcome_src"/>
      </Col>
      <!--
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="需求单数量"/>
        </Card>
      </i-col>
      -->
    </Row>
    <!--
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
    -->
  </div>
</template>

<script>
import config from '@/config'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      welcome_src: require('../../../assets/images/welcome.png'),
      hasTitle: true,
      title: '',
      pieData: [
        { value: 335, name: '需求单' },
        { value: 310, name: '收货单' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  created () {
    // console.log(this.$route, this.$route.name)
    let na = this.$route.name.split('/')
    /*
    */
    this.title = config.title
    if (na.length > 1) {
      if (na[1] === config.businessHomeName) {
        this.hasTitle = false
        this.welcome_src = require('../../../assets/images/home/business.png')
      } else if (na[1] === config.freightHomeName) {
        this.hasTitle = false
        this.welcome_src = require('../../../assets/images/home/freight.png')
      } else if (na[1] === config.containerHomeName) {
        this.hasTitle = false
        this.welcome_src = require('../../../assets/images/home/box.png')
      } else if (na[1] === config.ticketHomeName) {
        this.hasTitle = false
        this.welcome_src = require('../../../assets/images/home/ticket.png')
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
