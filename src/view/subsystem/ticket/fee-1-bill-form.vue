<template>
  <div>
    <Form ref="search" :model="search" :rules="rules" :label-width="92" :show-message="false" class="qib-form">
      <Row>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="号码" prop="transNo">
                <Input size="small" v-model="search.transNo"></Input>
              </FormItem>
              <FormItem label="需求单号码" prop="needNo">
                <Input size="small" v-model="search.needNo"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <div style="width: 100%; text-align: center; font-size: 24px; padding-top: 12px;">铁路局整车运单</div>
            </Col>
            <Col span="6">
              <FormItem label="工作日期" disabled>
                <Input size="small" disabled></Input>
              </FormItem>
              <FormItem label="运单号码" prop="waybillNo">
                <Input size="small" v-model="search.waybillNo"></Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="search.station"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="经由">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="运到期限" disabled :label-width="72">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="车种车号" prop="carVersionCard" :label-width="72">
                <Input size="small" v-model="search.carVersionCard"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="货区" prop="warehouse" :label-width="54">
                <Input size="small" v-model="search.warehouse"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="标重" prop="parWeight" :label-width="54">
                <Input size="small" v-model="search.parWeight"></Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="6">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="search.astation"></Input>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="运价里程">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="施封号码" disabled :label-width="72">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="货位" prop="door" :label-width="54">
                <Input size="small" v-model="search.door"></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="承运人装车">
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="15">
              <FormItem label="发站专用线" disabled>
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="集装箱型" prop="city" :label-width="72">
                <Select size="small" disabled v-model="search.city">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem label="">
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem :label-width="10">
                <Checkbox disabled>标准价率测算</Checkbox>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="12">
              <FormItem label="到站专用线">
                <Input size="small" disabled></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="服务内容" prop="city" :label-width="72">
                <Select size="small" value="1">
                  <Option value="1">站到站运输</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="">
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem label="">
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row>
            <Col span="18">
              <Row>
                <Col span="4">
                  <FormItem label="托运人" prop="sname" :label-width="72">
                    <Input size="small" v-model="search.sname"></Input>
                  </FormItem>
                </Col>
                <Col span="20">
                  <Row>
                    <Col span="18">
                      <FormItem label="名称" prop="sname" :label-width="60">
                        <Input size="small" v-model="search.sname"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="经办人" prop="sagent" :label-width="60">
                        <Input size="small" v-model="search.sagent"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem label="地址" prop="saddr" :label-width="60">
                        <Input size="small" v-model="search.saddr"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="邮编" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="stel" :label-width="60">
                        <Input size="small" v-model="search.stel"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="6">
                      <FormItem label="取货地址" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="里程" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="联系人" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span="4">
                  <FormItem label="收货人" prop="aname" :label-width="72">
                    <Input size="small" v-model="search.aname"></Input>
                  </FormItem>
                </Col>
                <Col span="20">
                  <Row>
                    <Col span="18">
                      <FormItem label="名称" prop="aname" :label-width="60">
                        <Input size="small" v-model="search.aname"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="经办人" prop="aagent" :label-width="60">
                        <Input size="small" v-model="search.aagent"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem label="地址" prop="aaddr" :label-width="60">
                        <Input size="small" v-model="search.aaddr"></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="邮编" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" prop="atel" :label-width="60">
                        <Input size="small" v-model="search.atel"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="6">
                      <FormItem label="取货地址" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="里程" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="联系人" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="电话" :label-width="60">
                        <Input size="small" disabled></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col span="24">
                  <div style="padding-left: 20px; padding-bottom: 10px;">
                    <Table size="small" height="98" stripe :columns="columns1" :data="list1"></Table>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span="12">
                  <FormItem label="" :label-width="20">
                    <Input disabled type="textarea" :autosize="{minRows: 1,maxRows: 5}"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="" :label-width="20">
                    <Input disabled type="textarea" :autosize="{minRows: 1,maxRows: 5}"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span="6">
              <Row>
                <Col span="24">
                  <FormItem label="付费方式">
                    <Select size="small" value="1" disabled>
                      <Option value="1">现金</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="领取方式" prop="city">
                    <CheckboxGroup v-model="search.interest" disabled>
                      <Checkbox label="电子领货"></Checkbox>
                      <Checkbox label="纸质领货"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <div style="padding-left: 20px; padding-bottom: 10px;">
                    <Table size="small" height="192" stripe :columns="columns2" :data="list2"></Table>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="发票合计" prop="totalMoney">
                    <Input disabled type="textarea" :autosize="{minRows: 1,maxRows: 5}" v-model="totalMoney"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align: center">
            <FormItem :label-width="0">
              <Button type="primary" disabled>物品清单</Button>
              <Button type="primary" :loading="loading" @click="handleWrite('search')" style="margin-left: 8px">记事</Button>
              <Button type="primary" :loading="loading" @click="handleFee('search')" style="margin-left: 8px">计费</Button>
              <Button type="default" :loading="loading" @click="handlePrint('search')" style="margin-left: 8px">打印</Button>
            </FormItem>
          </div>
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
      // this.list1.push({})
      // this.list1.push({})
      // this.list1.push({})
      // console.log(this.list1)
    },
    handleWrite (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleWrite', this.search)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
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
    handlePrint () {
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
