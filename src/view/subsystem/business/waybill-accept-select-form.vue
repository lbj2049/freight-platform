<template>
  <div>
      <Form ref="searchForm" :model="demand" :rules="rules" :label-width="88" :show-message="false" class="qib-form">

        <Row>
          <Col span="8">
            <FormItem label="提交日期" prop="ctime">
              <DatePicker size="small" v-model="demand.ctime" type="daterange" placeholder="请选择提交日期" @on-change="handleChangeDate1"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="订单受理号" prop="acceptNo">
              <Input size="small" v-model="demand.acceptNo" placeholder="请输入订单受理号"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="需求号" prop="needNo">
              <Input size="small" v-model="demand.needNo" placeholder="请输入订单需求号"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="装车日期" prop="loadDate">
              <DatePicker size="small" v-model="demand.loadDate" type="daterange" placeholder="请选择装车日期" @on-change="handleChangeDate2"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="发站" prop="station">
              <Input size="small" v-model="demand.station" placeholder="请输入发站"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="货运名称" prop="gname">
              <Input size="small" v-model="demand.gname" placeholder="请输入货运名称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="托运人" prop="sname">
              <Input size="small" v-model="demand.sname" placeholder="请输入托运人"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="到站" prop="astation">
              <Input size="small" v-model="demand.astation" placeholder="请输入到站"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="卸车地点" prop="carDownAddr">
              <Input size="small" v-model="demand.carDownAddr" placeholder="请输入卸车地点"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8">
            <FormItem label="收货人" prop="aname">
              <Input size="small" v-model="demand.aname" placeholder="请输入收货人"></Input>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem label="运单状态" prop="states">

              <CheckboxGroup v-model="demand.state" @on-change="handleChangeState">
                <Checkbox v-for="item in states" :label="item.value" :key="item.value">{{ item.label }}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>

        <Divider />
        <FormItem>
          <Button size="small" type="primary" :loading="loading" @click="handleSubmit('searchForm')" style="margin-left: 8px">查询</Button>
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
      states: [{ value: 1, label: '待用' }, { value: 2, label: '待上报' }, { value: 3, label: '待受理' }, { value: 4, label: '已通过受理' }, { value: 41, label: '未通过受理' }, { value: 5, label: '已装车' }, { value: 6, label: '已发车' }, { value: 7, label: '已到达' }, { value: 8, label: '已卸车' }, { value: 9, label: '已交付' }, { value: 10, label: '待理赔' }, { value: 11, label: '已理赔' }, { value: 12, label: '已作废' }, { value: 13, label: '已制票' }, { value: 14, label: '通知进货' }, { value: 400, label: '退订' }],
      admitCarStates: [{ value: 0, label: '未匹配' }, { value: 1, label: '已匹配' }],
      demand: {
        reservaNo: '',
        needNo: '',
        ctime: '',
        loadDate: '',
        ctime_bg: '',
        ctime_ed: '',
        loadDate_bg: '',
        loadDate_ed: '',
        station: '',
        astation: '',
        sname: '',
        aname: '',
        gname: '',
        state: [],
        admitCarState: '',
        carDownAddr: ''
      },
      rules: {
      },
      defaultInfo: {

      }
    }
  },
  created () {
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
      this.demand.loadDate_bg = dr[0]
      this.demand.loadDate_ed = dr[1]
    },
    handleChangeState () {
      if (this.demand.state) {
        this.demand.states = this.demand.state.join(',')
      }
    }
  }
}
</script>
