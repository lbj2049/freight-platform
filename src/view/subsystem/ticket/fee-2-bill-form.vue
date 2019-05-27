<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="92" :show-message="false" class="qib-form">
      <Row>
        <Col span="16">
          <Row>
            <Col span="6">
              <FormItem label="付款方式">
                <Select size="small" value="1" disabled>
                  <Option value="1">现金</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <div style="width: 100%; text-align: center; font-size: 24px; padding-top: 12px;">铁路局整车运单</div>
            </Col>
            <Col span="6">
              <FormItem label="票据号" >
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <FormItem label="付款单位姓名">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="票运输票据" prop="waybillNo">
                <Input size="small" v-model="search.waybillNo"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="办理种别" disabled>
                <Select size="small" value="1">
                  <Option value="1">整车</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="6">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="search.station"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="search.astation"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="专用线名称代码">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="6">
              <FormItem label="车种车号" prop="carVersionCard">
                <Input size="small" v-model="search.carVersionCard"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="标重" prop="parWeight">
                <Input size="small" v-model="search.parWeight"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="经由">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Row>
                <Col span="12">
                  <FormItem label="箱型" >
                    <Select size="small" disabled>
                      <Option value=""></Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="篷布或施封号">
                    <Input size="small" disabled></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Table size="small" height="120" stripe :columns="columns1" :data="list1"></Table>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <h5>费用</h5>
                  <Table size="small" height="120" stripe :columns="columns2" :data="list2"></Table>
                </Col>
              </Row>
            </Col>
            <Col span="12">
              <FormItem label="记事内容" prop="mail">
                <Input v-model="search.mail" type="textarea" :autosize="{minRows: 14,maxRows: 18}"></Input>
              </FormItem>

            </Col>
          </Row>

        </Col>
        <Col span="8">

          <Tabs value="name1" style="padding: 10px 20px;">
            <TabPane label="自由记事" name="name1">
              <Divider orientation="left">自由记事</Divider>
              <Row>
                <Col span="12">请输入自由记事</Col>
                <Col span="12" style="text-align: right"><Button size="small" disabled>确定</Button><Button size="small" disabled>清除</Button></Col>
                <Col span="24">
                  <FormItem label="选择记事">
                    <Select size="small" disabled>
                      <Option value=""></Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="记事内容">
                    <Input type="textarea" :autosize="{minRows: 12,maxRows: 16}"></Input>
                  </FormItem>
                </Col>
                <Col span="24" style="text-align: center">
                  <Button size="small" disabled>加入自由记事</Button><Button size="small" disabled>编辑自由记事</Button>
                </Col>
              </Row>
            </TabPane>
            <TabPane label="仓储设置" name="name2"></TabPane>
          </Tabs>
          <Row>
            <Col span="24">
              <div style="text-align: center">
                <FormItem :label-width="0">
                  <Button type="primary" :loading="loading" @click="handleFee('search')" style="margin-left: 8px">计费</Button>
                  <Button :loading="loading" @click="handlePrint('search')" style="margin-left: 8px">打印</Button>
                </FormItem>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </Form>
    <!--提交时加载动画-->
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
import {
  calculate,
  totleMoney,
  print
} from '@/api/ticket.data'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: {
      },
      rules: {
      },
      list1: [],
      columns1: [
        { key: 'gname', title: '货物名称', width: 120, fixed: 'left', tooltip: true },
        { key: 'gnameCode', title: '品名代码', width: 120, fixed: 'left', tooltip: true },
        { key: 'caseNum', title: '件数', width: 60, tooltip: true },
        { key: 'package', title: '包装', width: 60, tooltip: true },
        { key: 'tunnage', title: '货物重量', width: 120, tooltip: true },
        { key: 'ironHeavy', title: '铁重', width: 60, tooltip: true },
        { key: 'price', title: '价格', width: 60, tooltip: true },
        { key: 'disabled', title: '计重', width: 60, tooltip: true },
        { key: 'volume', title: '体积', width: 60, tooltip: true },
        { key: 'priceRate', title: '价号/价率', width: 120, tooltip: true },
        { key: 'disabled', title: '集装箱号码', width: 120, tooltip: true },
        { key: 'disabled', title: '封号', width: 60, tooltip: true },
        { key: 'carrierNote', title: '记事', width: 60, tooltip: true }
      ],
      list2: [],
      columns2: [
        { key: 'feeName', title: '费用名称', width: 120, fixed: 'left', tooltip: true },
        { key: 'accounts', title: '金额', width: 60, tooltip: true },
        { key: 'revenue', title: '税率', width: 60, tooltip: true }
      ],
      totalMoney: null
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    }
  },
  methods: {
    doSetData (item) {
      this.search = { ...item }
      this.list1 = []
      let dt = {
        gname: item.gname, // 货物名称
        gnameCode: item.gnameCode, // 品名代码
        caseNum: item.caseNum, // 件数
        package: item.package, // 包装
        tunnage: item.tunnage, // 货物重量
        ironHeavy: item.ironHeavy, // 铁重
        price: item.price, // 价格
        // 计重 只读框
        volume: item.volume, // 体积
        priceRate: item.priceRate, // 价号/价率/加减成数    只读框
        // 集装箱号码   只读框灰显
        // 封号 只读框灰显
        carrierNote: item.carrierNote // 记事
      }
      this.list1.push(dt)
      this.list1.push({})
      this.list1.push({})
      // console.log(this.list1)
    },
    handleFee () {
      if (Object.keys(this.search).length !== 0) {
        const UUID = this.getUserId
        const compyID = this.getCompyId
        const wbID = this.search.wbID
        const receptType = 1
        let params = { UUID, compyID, wbID, receptType }
        calculate(params).then(res => {
          const body = res.data
          const data = body.Data
          if (body.Status === 2000) {
            this.list2 = data || []
          } else {
            this.$Message.error(data.ErrorDes)
          }
        })
        totleMoney(params).then(res => {
          const body = res.data
          const data = body.Data
          if (body.Status === 2000) {
            this.totalMoney = data.totleMoney
          } else {
            this.$Message.error(data.ErrorDes)
          }
        })
      } else {
        this.$Message.error('请选择数据')
      }
    },
    handlePrint (name) {
      if (Object.keys(this.search).length !== 0) {
        const UUID = this.getUserId
        const compyID = this.getCompyId
        const wbID = this.search.wbID
        const receptType = 1
        let params = { UUID, compyID, wbID, receptType }
        print(params).then(res => {
          const body = res.data
          const data = body.Data
          if (body.Status === 2000) {
            this.$Message.success(data.info)
          } else {
            this.$Message.error(data.ErrorDes)
          }
        })
      } else {
        this.$Message.error('请选择数据')
      }
    }
  }
}
</script>
