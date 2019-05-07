<template>
  <div>
    <Form ref="searchForm" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">
      <Row>
        <Col span="18">
          <Row>
            <Col span="6">
              <FormItem label="装车日期" prop="loadDate">
                <DatePicker size="small" type="daterange" placeholder="请选择装车日期" v-model="demand.loadDate" @on-change="handleChangeDate1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="到站" prop="astation">
                <Input size="small" v-model="demand.astation" placeholder="请输入到站"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运单状态" prop="states">
                <Select size="small" v-model="demand.states" placeholder="请选择运单状态">
                  <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="运输方式" prop="carType">
                <Select size="small" v-model="demand.carType" placeholder="请选择运输方式">
                  <Option v-for="item in carTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="提报日期" prop="resDate">
                <DatePicker size="small" v-model="demand.resDate" type="daterange" placeholder="请选择提报日期" @on-change="handleChangeDate2"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">

              <FormItem >
                <Checkbox disabled>整车/成组</Checkbox>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="需求号" prop="needNo">
                <Input size="small" v-model="demand.needNo" placeholder="请输入需求号"></Input>
              </FormItem>
            </Col>
            <Col span="6">
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem :label-width="10">
            <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
            <Button size="small" @click="handlePrint()" style="margin-left: 8px" disabled>运单打印</Button>
            <Button size="small" @click="handleOut()" style="margin-left: 8px" disabled>退出</Button>
          </FormItem>
        </Col>
      </Row>
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
      states: [{ value: 4, label: '已通过受理' }, { value: 5, label: '已装车' }, { value: 6, label: '已发车' }, { value: 12, label: '已作废' }, { value: 13, label: '已制票' }],
      carTypes: [{ value: 1, label: '整车' }, { value: 2, label: '集装箱' }, { value: 3, label: '零担' }, { value: 4, label: '其他' }],
      demand: {
        loadDate: '',
        loadDate_bg: '',
        loadDate_ed: '',
        resDate: '',
        resDate_bg: '',
        resDate_ed: '',
        astation: '',
        needNo: '',
        states: '',
        carType: ''
      },
      rules: {},
      defaultInfo: {

      }
    }
  },
  created () {
    // 保留初始值
    this.defaultInfo = { ...this.demand }
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
    handlePrint () {
      this.$emit('handleFormPrint')
    },
    handleOut () {
      this.$emit('handleFormOut')
    },
    handleChangeDate1 (dr) {
      this.demand.loadDate_bg = dr[0]
      this.demand.loadDate_ed = dr[1]
    },
    handleChangeDate2 (dr) {
      this.demand.resDate_bg = dr[0]
      this.demand.resDate_ed = dr[1]
    }
  }
}
</script>
