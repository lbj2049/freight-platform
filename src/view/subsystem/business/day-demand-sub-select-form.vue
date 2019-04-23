<template>
  <div>
      <Form ref="searchForm" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

          <Row>
            <Col span="8">
              <FormItem label="提交日期" prop="ctime">
                <DatePicker size="small" type="daterange" placeholder="请选择提交日期" v-model="demand.ctime" @on-change="handleChangeDate1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="装车日期" prop="restime">
                <DatePicker size="small" type="daterange" placeholder="请选择装车日期" v-model="demand.restime" @on-change="handleChangeDate2"></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="订车号" prop="roderNo">
                <Input size="small" v-model="demand.roderNo" placeholder="请输入订车号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="发站" prop="station">
                <Input size="small" v-model="demand.station" placeholder="请输入发站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="托运人" prop="sname">
                <Input size="small" v-model="demand.sname" placeholder="请输入托运人"></Input>
              </FormItem>
            </Col>
            <Col span="8">

              <Row>
                <Col span="12">
                  <FormItem label="物流" prop="logistics">
                    <Select size="small" v-model="demand.logistics" placeholder="请选择物流" disabled>
                      <Option v-for="item in logisticses" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="货物名称" prop="gname">
                    <Input size="small" v-model="demand.gname" placeholder="请输入货物名称"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="demand.astation" placeholder="请输入到站"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="收货人" prop="aname">
                <Input size="small" v-model="demand.aname" placeholder="请输入收货人"></Input>
              </FormItem>
            </Col>
            <Col span="8">

              <Row>
                <Col span="12">
                  <FormItem label="退订" prop="unsubscribe">
                    <Select size="small" v-model="demand.unsubscribe" placeholder="请选择退订方式">
                      <Option v-for="item in unsubscribes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem :label-width="45">
                    <Checkbox disabled>大宗交易需求</Checkbox>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>

        <Divider />
        <FormItem>
          <Button type="primary" size="small" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
          <Button size="small" @click="handleReset('searchForm')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
      <!--提交时加载动画-->
      <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      logisticses: [{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }],
      unsubscribes: [{ value: 400, label: '客户原因' }, { value: 41, label: '不可抗因素' }],
      demand: {
        ctime: '',
        restime: '',
        ctime_bg: '',
        ctime_ed: '',
        restime_bg: '',
        restime_ed: '',
        roderNo: '',
        station: '',
        astation: '',
        sname: '',
        aname: '',
        logistics: '',
        gname: '',
        cargo: '',
        unsubscribe: ''
      },
      rules: {
      },
      defaultInfo: {

      }
    }
  },
  created: function () {
    // 保留初始值
    this.defaultInfo = { ...this.demand }
  },
  mounted: function () {
    this.toHandleSearch()
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.handleSubmit('searchForm')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('handleFormSubmit', this.demand)
        }
      })
    },
    handleReset (name) {
      this.demand = { ...this.defaultInfo }
      this.$refs[name].resetFields()
    },
    handleChangeDate1 (dr) {
      this.demand.ctime_bg = dr[0]
      this.demand.ctime_ed = dr[1]
    },
    handleChangeDate2 (dr) {
      this.demand.restime_bg = dr[0]
      this.demand.restime_ed = dr[1]
    }
  }
}
</script>
